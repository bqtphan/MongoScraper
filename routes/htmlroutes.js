var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("index");
  });

  // Route for getting all Articles from the db
  app.get("/saved", function (req, res) {
    res.render("saved");
  });

}