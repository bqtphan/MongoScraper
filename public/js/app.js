// List out scraped articles
$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#articleList").append("<div><p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + '"</p> <button class="btn btn-outline-success save" type = "button" id="' + data[i]._id + '">Save Article</div><br>');
  };
  saveClick();
});

// List out saved scraped articles
$.getJSON("/savedarticles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#savedList").append("<div><p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + '</p> <button class="btn btn-outline-success note" type = "button" id="' + data[i]._id + '">Add Note</button> <button class="btn btn-outline-success delete" type = "button" id="' + data[i]._id + '">Delete Article</button></div><br>');
  };
  noteClick();
  deleteClick();
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
        $("#notes").append("<h2>" + data.title + "</h2>");
        // A textarea to add a new note 
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
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

// $(".btn").on("click", function (event) {
//   event.preventDefault();
//   // app.get("/scrape", function (req, res) {
//     // First, we grab the body of the html with request
//     request("https://old.reddit.com/r/news/", function (error, response, html) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(html);

//       // An empty array to save the data that we'll scrape
//       var results = [];

//       // With cheerio, find each p-tag with the "title" class
//       // (i: iterator. element: the current element)
//       alert("dfjsdfj")
//     $("p.title").each(function (i, element) {

//       // Save the text of the element in a "title" variable
//       var title = $(element).text();

//       // In the currently selected element, look at its child elements (i.e., its a-tags),
//       // then save the values for any "href" attributes that the child elements may have
//       var link = $(element).children().attr("href");

//       // Save these results in an object that we'll push into the results array we defined earlier
//       results.push({
//         title: title,
//         link: link
//       });
//       db.article.create(results)
//         .then(function (dbarticle) {
//           // View the added result in the console
//           console.log(dbarticle);
//         })
//         .catch(function (err) {
//           // If an error occurred, send it to the client
//           return res.json(err);
//         });
//     });
//     console.log(results)
//   });
// });