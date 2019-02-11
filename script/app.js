import {initStorage, reduceStorage} from "./localStorage";
import {initDateInput, updateCurrentDate, updateSchedule} from "./scheduleInit";
import $ from "jquery";
import {cancel, getBookingDiv, handleBooking, save} from "./booking";

let today = new Date();

initStorage();
reduceStorage();

initDateInput();
updateCurrentDate(today);
updateSchedule();

schedule.addEventListener("click", (event) => {
    if (event.target.className === "bookButton") {
        let date = new Date(event.target.dataset.date);
        let storageItem = localStorage.getItem(date);
        let sessionInfo = JSON.parse(storageItem);

        $("body").append(getBookingDiv(date, sessionInfo));

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

export {today}