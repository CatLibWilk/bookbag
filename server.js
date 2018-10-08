const express = require("express");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
