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
      password: req.body.password,
      // city: req.body.city
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
        id: req.user.id
      });
    }
  });


  // GET route for getting all of the todos
  app.get("/api/progresses/:id", function(req, res) {
    // Write code here to retrieve all of the todos from the database and res.json them
    // back to the user
    db.Progress.findAll({
      where: {
        userId: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // POST route for saving a new todo. We can create todo with the data in req.body
  app.post("/api/progresses", function(req, res) {
    // Write code here to create a new todo and save it to the database
    // and then res.json back the new todo to the user

    //console.log("userID" . req.body.userId);
    db.Progress.create({
      water_goal: req.body.water_goal,
      water_intake: req.body.water_intake,
      UserId: req.body.userId
      // water_intake: req.body.water_intake,
    }).then(function(result) {
      res.json(result);
    }).catch(function (err) {
      res.json(err);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/progresses/:id", function(req, res) {
    db.Progress.destroy({
      where: {
        id: req.params.id,
      }
    }).then(function(result) {
      res.json(result);
    })
  });

  // PUT route for updating todos. We can get the updated todo data from req.body
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
