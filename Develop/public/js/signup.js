$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("#email-input");
  var cityInput =  $("#city-input");
  var passwordInput = $("#password-input");
  var nameInput = $("#name-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: nameInput.val().trim(),
      email: emailInput.val().trim(),
      city: cityInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.firstName || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    console.log("password1:" + userData.password)
    signUpUser(userData.firstName, userData.email, userData.city, userData.password);

    nameInput.val("");
    emailInput.val("");
    cityInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, email, city, password) {
    $.post("/api/signup", {
      firstName: firstName,
      email: email,
      city: city, 
      password: password
      
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text("User already exists");
    console.log(err);
    $("#alert").fadeIn(500);
  }
});
