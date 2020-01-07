// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      email: req.body.email,
      city: req.body.city,
      password: req.body.password,
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's first name, email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstName: req.user.firstName,
        email: req.user.email,
        city: req.user.city,
        id: req.user.id
      });
    }
  });


  //WATER TRACKER API ROUTES
  //================================================
  // GET route for getting all of the water progress
  app.get("/api/progresses/:id", function(req, res) {
    db.Progress.findAll({
      where: {
        userId: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // POST route for saving a new progress point. We can create progress point with the data in req.body
  app.post("/api/progresses", function(req, res) {
    db.Progress.create({
      water_goal: req.body.water_goal,
      water_intake: req.body.water_intake,
      UserId: req.body.userId
    }).then(function(result) {
      res.json(result);
    }).catch(function (err) {
      res.json(err);
    });
  });

  // DELETE route for deleting progress points. We can get the id of the todo to be deleted from req.params.id
  app.delete("/api/progresses/:id", function(req, res) {
    db.Progress.destroy({
      where: {
        id: req.params.id,
      }
    }).then(function(result) {
      res.json(result);
    })
  });

  // PUT route for updating progress points. We can get the updated todo data from req.body
  app.put("/api/progresses", function(req, res) {
    db.Progress.update({
      water_goal: req.body.water_goal,
      water_intake: req.body.water_intake,
    }, 
    {
      where: {
        id: req.body.id
      }
    }).then(function(result) {
      res.json(result);
    }).catch(function (err) {
      res.json(err);
    });
  });
};
//================================================
