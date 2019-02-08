let storage = window.localStorage;
storage.clear();

let today = new Date();
let filmInfo = {
    name: "Super film",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus ut massa at pretium. Etiam nec quam erat. Aliquam tempor tellus sodales urna fermentum interdum."
};

let movies = generateMovies(13*6, new Date(today.setDate(today.getDate() - 6)), filmInfo);

movies.forEach(movie => {
    storage.setItem(movie.date, JSON.stringify( movie.filmInfo ));
});
