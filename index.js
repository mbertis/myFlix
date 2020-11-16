const express = require("express"),
  morgan = require("morgan");

const app = express();

let topMovies = [
  {
    title: "The Grand Budapest Hotel",
    director: "Wes Anderson",
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
  },
  {
    title: "Toy Story",
    director: "John Lasseter",
  },
  {
    title: "Us",
    director: "Jordan Peele",
  },
  {
    title: "A Quet Place",
    director: "John Krasinski",
  },
  {
    title: "Jurassic Park",
    director: "Steven Speilberg",
  },
  {
    title: "Blade Runner 2049",
    director: "Denis Villeneuve",
  },
  {
    title: "Howl's Moving Castle",
    director: "Hayao Miyazaki",
  },
  {
    title: "Donnie Darko",
    director: "Richard Kelly",
  },
  {
    title: "The Aristocats",
    director: "Wolfgang Reitherman",
  },
];

app.use(morgan("common"));

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.use(express.static("public"));

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
