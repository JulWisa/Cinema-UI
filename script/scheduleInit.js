import {dayOptions, getFormattedDate, timeOptions} from "./common";
import {cancel, getBookingDiv, handleBooking, save} from "./booking";
import {count} from "./generator";
import $ from "jquery";
import applyCssans from "./cssansInit";

let dateInput = document.getElementById("dateInput");
let today = new Date();
let currentDate = new Date();

function initMain() {
    initDateInput();
    updateCurrentDate(today);
    updateSchedule();
    addListener();
}

function initDateInput() {
    let minDate = new Date();
    minDate.setDate(today.getDate() - 6);
    dateInput.min = getFormattedDate(minDate);

    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 6);
    dateInput.max = getFormattedDate(maxDate);

    dateInput.valueAsDate = new Date();
    dateInput.onchange = function (event) {
        updateCurrentDate(new Date(event.target.valueAsDate));
        updateSchedule();
    }
}

function updateCurrentDate(date) {
    currentDate = date;
    $("#currentDate").text(`${date.toLocaleString("en", dayOptions)}`);
}

function updateSchedule() {
    let sessions = getSessions(currentDate);
    $("#schedule").empty();
    for (let i = 0; i < count; i++) {
        let card = `
                   <div class="card">
                        <h4>${sessions[i].sessionInfo.name}</h4>
                        <p>Time: ${sessions[i].date.toLocaleString("en", timeOptions)}</p>
                        <button class="bookButton" data-date="${sessions[i].date}">book</button>
                   </div>
        `;
        $("#schedule").append(card);
    }
}

function getSessions(date) {
    let sessions = [];
    for (let key in localStorage) {
        if (new Date(key).getDate() === date.getDate())
            sessions.push({
                date: new Date(key),
                sessionInfo: JSON.parse(localStorage.getItem(key))
            });
    }
    return sessions;
}

function addListener() {
    document.getElementById("schedule").addEventListener("click", (event) => {
        if (event.target.className === "bookButton") {
            let date = new Date(event.target.dataset.date);
            let storageItem = localStorage.getItem(date);
            let sessionInfo = JSON.parse(storageItem);

            $("body").append(getBookingDiv(date, sessionInfo));

            applyCssans();

            if (document.getElementById("saveButton")) {
                document.getElementById("saveButton").addEventListener("click", () => {
                    save();
                });
            }

            document.getElementById("cancelButton").addEventListener("click", () => {
                cancel();
            });
            document.getElementById("hall").addEventListener("click", (event) => {
                handleBooking(event);
            })
        }
    });
}

export {initMain}