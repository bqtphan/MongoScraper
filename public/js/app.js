init();

// List out scraped articles
function init() {
  $.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
      $("#articleList").append("<div><p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + '"</p> <button class="btn btn-outline-success save" type = "button" id="' + data[i]._id + '">Save Article</div><br>');
    };
    saveClick();
  });
};

// List out saved scraped articles
$.getJSON("/savedarticles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#savedList").append("<div><p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + '</p> <button class="btn btn-outline-success note" type = "button" id="' + data[i]._id + '">Add Note</button> <button class="btn btn-outline-success delete" type = "button" id="' + data[i]._id + '">Delete Article</button></div><br>');
  };
  noteClick();
  // saveNoteClick();
  deleteClick();
});

// SCRAPE BUTTON
$(".scrape").on("click", function () {
  $.get("/scrape").
  then(function (data) {
    console.log(data);
  })
  init()
});

// Save articles
function saveClick() {
  $(".save").on("click", function (event) {
    event.preventDefault();
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("id");
    console.log(thisId)
    // Run a POST request to save
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          saved: true
        }
      })
      .then(function (data) {
        console.log(data);
      });
  });
}

// Delete articles
function deleteClick() {
  $(".delete").on("click", function (event) {
    event.preventDefault();
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("id");
    console.log(thisId)
    // Run a POST request to delete
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          saved: false
        }
      })
      .then(function (data) {
        console.log(data);
      });
  });
}

// Add note
function noteClick() {
  $(".note").on("click", function (event) {
    event.preventDefault();
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("id");
    console.log(thisId)
    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      })
      // With that done, add the note information to the page
      .then(function (data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h3>" + data.title + "</h3>");
        // A textarea to add a new note 
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' class='btn saveNote'>Save Note</button>");
        saveNoteClick();
        // If there's a note in the article
        if (data.note) {
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
}

// When you click the savenote button
function saveNoteClick() {
  $(".saveNote").on("click", function (event) {
    event.preventDefault();

    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          body: $("#bodyinput").val()
        }
      })
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#bodyinput").val("");
  });
};