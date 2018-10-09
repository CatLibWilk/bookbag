const models = require("../../models");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = models.User;

module.exports = function(){
    console.log('passport function running')

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
          console.log('passport.js local-signup runngin')
            User.findOne({ where: { username: username } }).then(function(user) {
                if (user) {
                  return done(null, false, {
                    message: "That email is already taken"
                  });
                } else {
                    console.log('not in database')
                  var data = {
                    username: username,
                    password: password,
                    
                  };
      
                  User.create(data).then(function(newUser) {
                    if (!newUser) {
                      return done(null, false);
                    }
      
                    if (newUser) {
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
  
          User.findOne({ where: { username: username } })
            .then(function(user) {
              console.log(user)
              if (!user) {
                return done(null, false, { message: "Email does not exist" });
              }
  
              // var userinfo = user.get();

              return done(null, userinfo);
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