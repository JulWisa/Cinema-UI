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