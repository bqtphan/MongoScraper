var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
// var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");


// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraperdb";
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});