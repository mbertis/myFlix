const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

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
    title: "A Quiet Place",
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

// Gets the list of data about all movies
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// Gets the data about a single movie, by title
app.get("/movies/:title", (req, res) => {
  res.send("Successful GET request returning data on " + req.params.title);
});

//Gets information about a genre by name
app.get("/movies/:genre", (req, res) => {
  res.send("Successful GET request returning data on " + req.params.genre);
});

//Gets information about a director by name
app.get("/movies/:director", (req, res) => {
  res.send("Successful GET request returning data on " + req.params.director);
});

//Allows new users to register
app.post("/users", (req, res) => {
  res.send("Successful POST request creating user");
});

//Allows user to update username
app.put("/users/:email/:username", (req, res) => {
  res.send(
    "Successful PUT request updating username with email: " +
      req.params.email +
      " to username: " +
      req.params.username
  );
});

//Add a movie to list of favorites
app.post("/movies", (req, res) => {
  res.send("Successful POST request adding move to list of favorites");
});

//Remove a movie from list of favorites
app.delete("/movies/:title", (req, res) => {
  res.send(
    "Successful DELETE request removing " +
      req.params.title +
      " from list of favorites"
  );
});

//Allow users to deregister
app.delete("/users/:email", (req, res) => {
  res.send(
    "Successful DELETE request deregistering user with email: " +
      req.params.email
  );
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
