const start = 10;
const step = 2;
const count = 6;

function generateMovies(number, startDate, sessionInfo){
    let movies = [];
    let date = zeroizeTime(startDate);

    for(let i = 1; i <= number; i++){
        let newDate = new Date(date);
        movies.push({
            date: newDate,
            sessionInfo: sessionInfo
        });
        if (! (i % count) && i > 0){
            date.setHours(date.getHours() + step * (count + 1));
        }else{
            date.setHours(date.getHours() + step);
        }

    }
    return movies;
}

function zeroizeTime(dateTime) {
    let zeroDate = new Date(dateTime);
    zeroDate.setHours(start);
    zeroDate.setMinutes(0);
    zeroDate.setSeconds(0);
    return zeroDate;
}
