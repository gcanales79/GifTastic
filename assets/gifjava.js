var gifArrays = ["NBA", "MLB", "Lebron", "Ronaldo", "Playoffs", "Messi", "Dodgers", "Yankees", "Home Run", "Michael Jordan", "Curry", "Goal"]


//function to create the pre define buttons
for (var i = 0; i < gifArrays.length; i++) {
    var gifButton = $("<button>");
    gifButton.addClass("sports");
    gifButton.addClass("btn btn-info");
    gifButton.text(gifArrays[i]);
    gifButton.attr("name", gifArrays[i]);
    $("#sportButtons").append(gifButton);
    gifButton.attr("offSet",0);

}

var gifkey = "bH1wVfBgLzvBZlR6FKJ73r78cLMoDdTL";
limitOfgifs = 3;


//Function to display the gifs on the showSports div
function displayGIF() {
    $(document).on("click",".sports", function () {
        var searchFor = $(this).attr("name");
        console.log("This is search For " + searchFor);
        var offSet=parseInt($(this).attr("offSet"));
        var newOffset=offSet+limitOfgifs;
        console.log("NewOffset: " + newOffset);
        $(this).attr("offSet",newOffset);
        var queryURL = "https://api.giphy.com/v1/gifs/search";
        queryURL += "?" + $.param({
            "api_key": gifkey,
            "q": searchFor,
            "limit": limitOfgifs,
            "offset":offSet

        })

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response;
            console.log(results);
            for (var i = 0; i < results.data.length; i++) {
                var displayDiv = $("<div>");
                displayDiv.addClass("sportImages");
                var rating = $("<p>");
                rating.text("Rating: " + results.data[i].rating);
                var image = $("<img>");
                image.attr("src", results.data[i].images.fixed_height_still.url);
                image.attr("data-still",results.data[i].images.fixed_height_still.url);
                image.attr("data-animate",results.data[i].images.fixed_height.url);
                image.attr("data-state","still");
                image.addClass("sportGif");
                displayDiv.append(rating);
                displayDiv.append(image);
                $("#showSports").prepend(displayDiv);
            }
        });
    })

};

//Create new buttons

$("#addSport").on("click", function (event) {
    event.preventDefault();
    var newGIF = $("#sport-input").val();
    var gifButton = $("<button>");
    gifButton.addClass("sports");
    gifButton.addClass("btn btn-info");
    gifButton.text(newGIF);
    gifButton.attr("name", newGIF);
    $("#sportButtons").append(gifButton);
    $("#sport-input").val("");
    gifButton.attr("offSet",0);
})



displayGIF();

//Animation and pausing GIFs
$(document).on("click",".sportGif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });