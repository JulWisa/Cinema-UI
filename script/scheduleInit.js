import {dayOptions, getFormattedDate, timeOptions} from "./common";
import {count} from "./generator";

let dateInput = document.getElementById("dateInput");
let currentDateParagraph = document.getElementById("currentDate");
let schedule = document.getElementById("schedule");
let today = new Date();
let currentDate = new Date();

function updateCurrentDate(date) {
    currentDate = date;
    currentDateParagraph.innerText = date.toLocaleString("en", dayOptions);
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

function getSessions(date) {
    let sessions = [];
    for (let key in localStorage) {
        if (new Date(key).getDate() === date.getDate())
            sessions.push({
                date: new Date(key),
                filmInfo: JSON.parse(localStorage.getItem(key))
            });
    }
    return sessions;
}

function updateSchedule() {
    let movies = getSessions(currentDate);
    schedule.innerHTML = "";
    for (let i = 0; i < count; i++) {
        let card = document.createElement("div");
        let name = document.createElement("h4");
        let time = document.createElement("p");
        let bookButton = document.createElement("button");

        card.className = "card";

        name.innerText = movies[i].filmInfo.name;
        time.innerText = "Time: " + movies[i].date.toLocaleString("en", timeOptions);

        bookButton.innerText = "book";
        bookButton.className = "bookButton";

        bookButton.setAttribute("data-date", movies[i].date);

        card.appendChild(name);
        card.appendChild(time);
        card.appendChild(bookButton);

        schedule.appendChild(card);
    }
}

export {initDateInput, updateSchedule, updateCurrentDate}