let storage = window.localStorage;
storage.clear();

let filmInfo = {
    name: "Super film",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus ut massa at pretium. Etiam nec quam erat. Aliquam tempor tellus sodales urna fermentum interdum."
};

let movies = generateMovies(13*6, new Date(new Date().setDate(new Date().getDate() - 6)), filmInfo);

movies.forEach(movie => {
    storage.setItem(movie.date, JSON.stringify( movie.filmInfo ));
});
