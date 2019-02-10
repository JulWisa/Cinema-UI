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
            <button onclick="save()">save</button>
            <button onclick="cancel()">cancel</button>
            </footer>
        </div>
    `;
}

function getHall(booked) {
    return `<div id="hall"
                 onclick="handleBooking(event)"> 
            ${booked.map(getRow).join('')}
            </div>`;
}

function getRow(row, i) {
    return `<div class="row"
                 data-row=${i + 1}>
            ${i + 1}
            ${row.map(getPlace).join('')}
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
    if (event.target.className === "place"){
        let place = event.target;
        if (place.dataset.state === placeState.free)
            place.dataset.state = placeState.chosen;
        else if (place.dataset.state === placeState.chosen)
            place.dataset.state = placeState.free;
    }
}

function cancel() {
    $("#booking").remove();
}

function save() {
    let hall = [];
    let rows = $("#hall").children(".row");
    for(let i = 0; i < rows.length; i++){
        hall[i] = [];
        let placesCollection = rows[i].children;
        for(let j = 0; j < placesCollection.length; j++){
            hall[i][j] = placesCollection[j].dataset.state;
        }
    }
    let booked = mapToBookedArray(hall);
    let key = document.getElementById("booking").dataset.date;
    let value = storage.getItem(key);
    let sessionInfo = JSON.parse(value);
    sessionInfo.booked = booked;
    value = JSON.stringify(sessionInfo);
    storage.setItem(key, value);
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

