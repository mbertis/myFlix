const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models.js");

const app = express(),
  Movies = Models.Movie,
  Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", { useNewUrlParser: true, useUnifiedTopology: true });

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
/* We expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({Username: req.body.Username})
  .then((user) => {
    if(user) {
      return res.status(400).send(req.body.Username + " already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user) => {res.status(201).json(user)})
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//Get information about ALL users
app.get("/users", (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Get a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({Username: req.params.Username})
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
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

//Add a movie to list of favorites or remove a move from list of favorites
app.put("/users/:username/movies/:title", (req, res) => {
  res.send("Successful PUT request updating list of favorite movies");
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
