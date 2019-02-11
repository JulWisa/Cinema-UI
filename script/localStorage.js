import {hall} from "./common"
import {generateMovies} from "./generator";

function initStorage() {
    localStorage.clear();

    let sessionInfo = {
        name: "Super film",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus ut massa at pretium. Etiam nec quam erat. Aliquam tempor tellus sodales urna fermentum interdum.",
        booked: hall
    };

    let movies = generateMovies(13 * 6, new Date(new Date().setDate(new Date().getDate() - 6)), sessionInfo, 10, 16);

    movies.forEach(movie => {
        localStorage.setItem(movie.date, JSON.stringify(movie.sessionInfo));
    });
}

function reduceStorage(){
    let oldestDate = new Date();
    oldestDate.setDate(new Date().getDate() - 6);
    oldestDate = oldestDate.getTime();

    for(let date in localStorage){
        if (new Date(date).getTime() < oldestDate)
            localStorage.removeItem(date);
    }
}

export {reduceStorage, initStorage}

