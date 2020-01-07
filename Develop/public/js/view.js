$(document).ready(function () {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  var $newItemInput2 = $("input.new-item2");
  // Our new progress points will go inside the progressContainer
  var $progressContainer = $(".progress-container");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deleteProgress);
  $(document).on("click", ".progress-item", editProgress);
  $(document).on("keyup", ".progress-item", finishEdit);
  $(document).on("blur", ".progress-item", cancelEdit);
  $(document).on("submit", "#progress-form", insertProgress);

  // Our initial progress points array
  var progress = [];

  // Getting progress points from database when page loads
  getProgress();

  // This function resets the progress points displayed with new progress points from the database
  function initializeRows() {
    $progressContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < progress.length; i++) {
      rowsToAdd.push(createNewRow(progress[i]));
    }
    $progressContainer.prepend(rowsToAdd);
  }

  // This function grabs progress points from the database and updates the view
  function getProgress() {
    $.get("/api/user_data").then(function (data) {
      var id = data.id;
      $.get("/api/progresses/" + id, function (data) {
        progress = data;
        initializeRows();
        progressBar();
      });
    });
  }

  // This function deletes a progress point when the user clicks the delete button
  function deleteProgress(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/progresses/" + id
    }).then(getProgress);
  }

  // This function handles showing the input box for a user to edit a progress point
  function editProgress() {
    var currentProgress = $(this).data("progress");
    $(this).children().hide();
    $(this).children("input.edit").val(currentProgress.water_intake);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // This function starts updating a progress point in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedProgress = $(this).data("progress");
    if (event.which === 13) {
      updatedProgress.water_intake = $(this).children("input").val().trim();
      $(this).blur();
      updateProgress(updatedProgress);
    }
  }

  // This function updates a progress point in our database
  function updateProgress(progress) {
    $.ajax({
      method: "PUT",
      url: "/api/progresses",
      data: progress
    }).then(getProgress);
  }

  // This function is called whenever a progress point item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentProgress = $(this).data("progress");
    if (currentProgress) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentProgress.water_intake);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a water intake-item row
  function createNewRow(progress) {
    var $newInputRow = $(
      [
        "<li class='list-group-item progress-item'>",
        "<span>",
        "<class='G'> Goal: " + progress.water_goal + " " + "Actual: " + progress.water_intake,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn clear'>Clear</button>",
        "</li>"
      ].join("")
    );
    $newInputRow.find("button.delete").data("id", progress.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("progress", progress);
    if (progress.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new progress point into our database and then updates the view
  function insertProgress(event) {
    console.log("insertProgress");
    event.preventDefault();
    var progress = {
      water_goal: $newItemInput.val().trim(),
      water_intake: $newItemInput2.val().trim(),
      userId: $("#userId").val().trim()
    };


    $.ajax({
      url: "/api/progresses",
      type: "POST",
      data: progress,
      async: false,
      success: function (data, textStatus, jqXHR) {


        if (data.errors) {
          //if errors returned use first in message
          $(".errors").css("border", "1px solid red");
          $(".error").html(data.errors[0].message);
        }
        else {
          getProgress();
          $newItemInput.val("");
          $newItemInput2.val("");
          $(".errors").css("border", "1px solid #555");
          $(".error").html("");
          console.log(progress);
        }
      }

    });
  }

  function progressBar() {
    $.get("/api/user_data").then(function (data) {
      var id = data.id;
      $.get("/api/progresses/" + id, function (data) {
        progress = data;
        for (var i = 0; i < data.length; i++) {
          var goal = data[i].water_goal;
          var actual = data[i].water_intake;
          console.log(data);
        }


        $("#progressbar").css("width", Math.round(100 * actual / goal) + "%");
        console.log(100 * actual / goal)
        if (Math.round(100 * actual / goal) >= 100) {
          $("#progressbar").css("background-color", "green");
          $(".message").css("color", "green");
          $(".message").html("GOAL MET!");
        }
        else {
          $("#progressbar").css("background-color", "#158CBA");
          $(".message").html("");
        }
      });
    });
  };
});
