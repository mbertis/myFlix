# Objective
To build the server-side component of a “movies” web application. The web
application will provide users with access to information about different
movies, directors, and genres. Users will be able to sign up, update their
personal information, and create a list of their favorite movies.

# Features
- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

# Technical Features
- API is a Node.js and Express application
- API uses REST architecture, with URL endpoints corresponding to the data operations listed in `Features` section
- Database is built using MongoDB
- Business logic is modeled with Mongoose
- Movie information is provided in JSON format
- API has been tested in Postman
- Includes user authentication and authorization
- API is deployed to Heroku

# Documentation
Addtional documentation can be found [here](http://madison-myflix.herokuapp.com/documentation.html).
