const models = require("../../models");
const bCrypt = require("bcrypt-nodejs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = models.User;

module.exports = function(){


    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if (user) {
          done(null, user.get());
        } else {

          done(user.errors, null);
        }
      });
    });

    passport.use(
      "local-signup",
        new LocalStrategy(
          
        function(username, password, done) {
          const generateHash = function(password) {

            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
          };
          console.log('passport.js local-signup runngin')
            User.findOne({ where: { username: username } }).then(function(user) {
                if (user) {

                  return done(null, false, {
              
                    message: "That email is already taken"
                  });
                } else {

                    const genPass = generateHash(password)
                  var data = {
                    username: username,
                    password: genPass,
                    
                  };
      
                  User.create(data).then(function(newUser) {
                    if (!newUser) {
                      return done(null, false);
                    }
      
                    if (newUser) {
                      console.log(newUser);
                      return done(null, newUser);

                    }
                  });
                }
              });
        }
    ))
    passport.use(
      "local-signin",
      new LocalStrategy(
        {passReqToCallback: true},
        
        function(req, username, password, done) {

          const isValidPassword = function(userpass, password) {
            return bCrypt.compareSync(password, userpass);
          };

          User.findOne({ where: { username: username } })
            .then(function(user) {

              if (!user) {

                return done(null, false, { message: "Email does not exist" });
              }

              if (!isValidPassword(user.password, password)) {

                return done(null, false, { message: "Incorrect password." });
              }



              return done(null, user);
            })
            .catch(function(err) {
              console.log("Error:", err);
  
              return done(null, false, {
                message: "Something went wrong with your Signin"
              });
            });
        }
      )
    );
}