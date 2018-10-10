const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");
const passport = require("passport");
const session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//(passport needs to be on end to recognize local strategy, idk why but is so)
require("./config/passport/passport.js")(passport)
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


//true drops tables, false creates if not extant
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true!
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


// Start the API server
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
