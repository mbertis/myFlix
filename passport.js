const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

//Defines basic HTTP authentication for login requests
passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    (username, password, callback) => {
      console.log(username + "    " + password);
      Users.findOne({ Username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }

        if (!user) {
          console.log("incorrect username");
          return callback(null, false, {
            message: "Incorrect username or password",
          }); //Error message is passed to the callback if username cannot be found within DB
        }

        if (!user.validatePassword(password)) {
          //Hashes any password entered by user when loggin in before comparing it to the stored password in DB
          console.log("incorrect password");
          return callback(null, false, { message: "Incorrect password" });
        }

        console.log("finished");
        return callback(null, user);
      });
    }
  )
);

//Allows for authentication of users based on the JWT submitted alongside their request
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret", //Verifies the signature of the JWT - makes sure the client is who they say they are
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
