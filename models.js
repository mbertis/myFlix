const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Defines database schema for all movie objects to follow
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  ImagePath: String,
  Featured: Boolean,
});

/**
 * Defines database schema for all user objects to follow
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Hashes password so actual password is never stored
 * @param {string} password 
 * @returns {string}
 */
userSchema.statics.hashPassword = (password) => {
  /**
   * Actually does the hashing of submitted passwords
  */
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  /**
   * Compares submitted hashed passwords with the hashed passwords stored in database
   */
  return bcrypt.compareSync(password, this.Password);
};

/**
 * Defines database schema for all director objects to follow
 */
let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birth: { type: String },
  Death: { type: String },
});

/**
 * Defines database schema for all genre objects to follow
 */
let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Director = mongoose.model("Director", directorSchema);
let Genre = mongoose.model("Genre", genreSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
