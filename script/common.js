const rowCounter = 10;
const placeCounter = 16;

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