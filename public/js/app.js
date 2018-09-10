// List out scraped articles
$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#articleList").append("<div><p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + '"</p> <button class="btn btn-outline-success save" type = "button" id="' + data[i]._id + '">Save Article</div><br>');
  };
  click()
});

// List out saved scraped articles
$.getJSON("/savedarticles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#savedList").append("<div><p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + '</p> <button class="btn btn-outline-success note" type = "button" id="' + data[i]._id + '">Add Note <button class="btn btn-outline-success delete" type = "button" id="' + data[i]._id + '">Delete Article</div><br>');
  };
});


// Save articles
function click() {
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
        // Log the response
        console.log(data);

      });
  });
}



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