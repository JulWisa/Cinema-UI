import $ from "jquery";
import {getLocaleDateTime, placeState} from "./common";

function cancel() {
    $("#booking").remove();
}

function getBookingDiv(date, sessionInfo) {
    return `
        <div id="booking" data-date="${date}">
            <h3>Booking</h3>
            <p>${sessionInfo.name}</p>
            <p>${getLocaleDateTime(date)}</p>
            <hr>
            <span>screen</span>
            <hr>
            ${getHall(sessionInfo.booked)}
            <footer>
            ${isActual(date) ? `<button id="saveButton">book</button>` : ''  }
            <button id="cancelButton">cancel</button>
            </footer>
        </div>
    `;
}

function isActual(date) {
    return (new Date( date ).getTime() > new Date().getTime());
}

function getCurrentDateTime() {
    return new Date( document.getElementById("booking").dataset.date);
}

function getHall(booked) {
    return `<div id="hall">
            ${booked.map(getRow).join('')}
            </div>`;
}

function getRow(row, i) {
    return `<div class="row"
                 data-row=${i + 1}>
            ${row.map(getPlace).join('')}
            ${i + 1}
            </div>`;
}

function getPlace(isBooked, i) {
    return `<div class="place"
                 data-place=${i + 1}
                 data-state=${isBooked ? placeState.booked : placeState.free}>
            ${i + 1}
            </div>`;
}

function handleBooking(event) {
    let date = getCurrentDateTime();
    if (event.target.className === "place" && isActual(date)){
        let place = event.target;
        if (place.dataset.state === placeState.free)
            place.dataset.state = placeState.chosen;
        else if (place.dataset.state === placeState.chosen)
            place.dataset.state = placeState.free;
    }
}

function save() {
    let date = getCurrentDateTime();
    if ( !isActual(date) )
        alert("You can't book tickets for this session anymore. Movie has already started");
    else{
        let hall = getHallArray();
        let booked = mapToBookedArray(hall);
        let date = document.getElementById("booking").dataset.date;
        updateStorage(date, booked);
    }
    cancel();
}

function getHallArray(){
    let hall = [];
    let rows = $("#hall").children(".row");
    for(let i = 0; i < rows.length; i++){
        hall[i] = [];
        let placesCollection = rows[i].children;
        for(let j = 0; j < placesCollection.length; j++){
            hall[i][j] = placesCollection[j].dataset.state;
        }
    }
    return hall;
}

function updateStorage(date, booked) {
    let value = localStorage.getItem(date);
    let sessionInfo = JSON.parse(value);
    sessionInfo.booked = booked;
    value = JSON.stringify(sessionInfo);
    localStorage.setItem(date, value);
}

function mapToBookedArray(hall) {
    let booked = [];
    hall.forEach((row, i) => {
        booked[i] = [];
        row.forEach((state, j) => {
            booked[i][j] = !(state === placeState.free)
        });
    });
    return booked;
}

export {getBookingDiv, save, cancel, handleBooking}