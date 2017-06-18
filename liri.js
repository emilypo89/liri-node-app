var fs = require("fs");
var action = process.argv[2];
var userInput = process.argv[3];

// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    readTweets();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    whatItSays();
    break;

  default:
    console.log("Invalid Input");
}

// * `my-tweets`
function readTweets(){
// var twitterKeys =;
  var Twitter = require('twitter');
  var twitterKeys = require("./keys.js");
 
  var client = new Twitter({
  consumer_key: twitterKeys.twitterKeys.consumer_key,
  consumer_secret: twitterKeys.twitterKeys.consumer_secret,
  access_token_key: twitterKeys.twitterKeys.access_token_key,
  access_token_secret: twitterKeys.twitterKeys.access_token_secret,
  });
 
  var params = {screen_name: 'anthroDev'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }
      
    }
    else {
      console.log(error);
    }
  });
}

var songSearch = "";
//* `spotify-this-song`
function spotifySong () {
  var Spotify = require('node-spotify-api');
  var spotifyKeys = require("./keys.js");
 
  var spotify = new Spotify({
    id: spotifyKeys.spotifyKeys.id,
    secret: spotifyKeys.spotifyKeys.secret
  });
  var nodeArgs = process.argv;
  

  // pulls the user input and adds a + between the words
  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      songSearch = songSearch + " " + nodeArgs[i];
    }

    else {
      songSearch += nodeArgs[i];
    }
  }
  // song search if there is no user input
  if (songSearch == ""){
    spotify.search({ type: 'track', query: 'I Saw the Sign', limit: 1}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Song Title: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
    });
  }
  // song search of user input
  else {
    spotify.search({ type: 'track', query: songSearch, limit: 1}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Song Title: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
    });
  }
}

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
        console.log(JSON.parse(body).Ratings[1]);
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
        console.log(JSON.parse(body).Ratings[1]);
      }
    });
  }
}
//    * `do-what-it-says`
function whatItSays () {
  fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // console.log(data);

  var dataArr = data.split(", ");
  // console.log(dataArr);
  if (dataArr[0] == "spotify-this-song") {
    songSearch = dataArr[1];
    spotifySong();
  } 
});
}