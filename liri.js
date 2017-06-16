// 7. Make it so liri.js can take in one of the following commands:
var fs = require("fs");
var action = process.argv[2];
var userInput = process.argv[3];

// The switch-case will direct which function gets run.
switch (action) {
  // case "my-tweets":
  //   readTweets();
  //   break;

  // case "spotify-this-song":
  //   spotifySong();
  //   break;

  case "movie-this":
    movie();
    break;

  // case "do-what-it-says":
  //   whatItSays();
  //   break;
  default:
    console.log("Invalid Input");
}

//    * `my-tweets`

//    * `spotify-this-song`

// * `movie-this`
function movie(){
	var request = require("request");
	var nodeArgs = process.argv;
	var movieName = "";

  // pulls the user input and adds a + between the words
  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }

    else {
      movieName += nodeArgs[i];
    }
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

  // if the user does not input a movie
  if (movieName == ""){
    request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response,body){
      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country Produced In: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors Featured: " + JSON.parse(body).Actors);
        // console.log("Link to Rotten Tomatoes: " + JSON.parse(body).Ratings[1]);
      }
    });
  }
  // if the user enters in a movie
  else {
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
      	console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country Produced In: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors Featured: " + JSON.parse(body).Actors);
        // console.log("Link to Rotten Tomatoes: " + JSON.parse(body).Ratings[1]);
      }
    });
  }
}
//    * `do-what-it-says`

