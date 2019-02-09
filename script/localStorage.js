let storage = window.localStorage;
storage.clear();


let sessionInfo = {
    name: "Super film",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus ut massa at pretium. Etiam nec quam erat. Aliquam tempor tellus sodales urna fermentum interdum.",
    booked: hall
};

let movies = generateMovies(13*6, new Date(new Date().setDate(new Date().getDate() - 6)), sessionInfo, 10, 16);

movies.forEach(movie => {
    storage.setItem(movie.date, JSON.stringify( movie.sessionInfo ));
});
