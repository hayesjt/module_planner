$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.firstName);
    $("#userId").val(data.id);
    console.log("val:");  
    console.log(data.id);
  });
});
