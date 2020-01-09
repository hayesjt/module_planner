$(document).ready(function() {
   //Current Date//
   var newDate = moment().format('LL');
   $("#currentDay").html(newDate);

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.firstName);
    $("#userId").val(data.id);
    $("#userIdTodo").val(data.id);
    $(".city-name").val(data.city);
    console.log("val:");  
    console.log(data.id);
  });
});
