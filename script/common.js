const rowCounter = 10;
const placeCounter = 16;

const placeState = {
    booked: "booked",
    free: "free",
    chosen: "chosen"
};

const hall = [];
for(let i = 0; i < rowCounter; i++){
    hall[i] = [];
    for(let j = 0; j < placeCounter; j++){
        hall[i][j] = false;
    }
}

const dayOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
};

const timeOptions = {
    hour: 'numeric',
    minute: 'numeric'
};

//Converts date to string like "yyyy-mm-dd"
function getFormattedDate(date) {
    let result = date.toISOString().substr(0, 10);
    return result;
}

//Converts date to string like "hh:mm, day, month date, year"
function getLocaleDateTime(date) {
    let result = date.toLocaleString().substr(12, 5) + ", " +date.toLocaleDateString("en", dayOptions);
    return result;
}

export { placeState, hall, dayOptions, timeOptions, getFormattedDate, getLocaleDateTime }