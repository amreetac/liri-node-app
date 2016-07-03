// Includes the FS package for reading and writing files 
function liriBot() {

	var files = require('fs');

// Using splice method to appropriately include all cases for
//input length

//In part of a larger function, we have the switch case statement
//along with the appropriate functions to be called for each case below. 

	switch(process.argv[2]){
		case "my-tweets":
			if (process.argv.length != 3) {
				usage();
				break;
			}
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThis(process.argv.splice(3, process.argv.length - 3));
			break;
		case "movie-this":
			movieThis(process.argv.splice(3, process.argv.length - 3));
			break;
		case "do-what-it-says":
			if (process.argv.length != 3) {
				usage();
				break;
			}
			doIt();
			break;
		default:
			usage();
	}

	function myTweets(){
		var Twitter = require('twitter');
		var keys = require('./keys.js');
		 
		var twitterKeys = keys.twitterKeys;

		var client = new Twitter({
			consumer_key: twitterKeys.consumer_key,
			consumer_secret: twitterKeys.consumer_secret,
			access_token_key: twitterKeys.access_token_key,
			access_token_secret: twitterKeys.access_token_secret
		});

		var params = {screen_name: 'amreetac'};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
			if (!error) {
				for (var i=0; i<tweets.length && i < 20; i++) {
					console.log("==========================");
					console.log("Tweet " + (i+1) + " Created At: " + tweets[i].created_at);
					console.log(tweets[i].text);
				}
				console.log("==========================");
			}
			else
			{
				console.log("Error accessing Twitter");
				console.log(error);
			}
		});
	}

	function spotifyThis(songName){

		var spotify = require('spotify');

		var song = songName.lenth ? songName.join('+'): "Whats+my+age+again";

		spotify('https://api.spotify.com/v1/search?q=' + song + '&type=artist');
 
		spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(error, data) {
    	if (!error && 
					response.statusCode == 200 &&
					JSON.parse(body)["Response"] == "True") {
					console.log("Artist: " + JSON.parse(body)["Artist"]);
    	}
				else if (!error && response.statusCode == 200) {
					console.log(JSON.parse(body)["Error"]);
				}
				else {
					console.log(error);
				}
 
});
	}

	// This function takes an array of words making the movie name
	function movieThis(movieName){

		var request = require('request');

		// Running a request to OMDB with Mr. Nobody as the default movie
		// To get each word together in the movie name (since it is seperated)
		// of the movie name is separated in the movieName array, it
		// needs to be joined together with "+" between each word.
		var movie = movieName.length ? movieName.join('+') : "Mr.+Nobody";

		request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json', 
			function (error, response, body) {
				if (!error && 
					response.statusCode == 200 &&
					JSON.parse(body)["Response"] == "True") {
					console.log("Title: " + JSON.parse(body)["Title"]);
					console.log("Year: " + JSON.parse(body)["Year"]);
					console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
					console.log("Country: " + JSON.parse(body)["Country"]);
					console.log("Language: " + JSON.parse(body)["Language"]);
					console.log("Plot: " + JSON.parse(body)["Plot"]);
					console.log("Actors: " + JSON.parse(body)["Actors"]);
					console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
					console.log("Rotton Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
				}
				else if (!error && response.statusCode == 200) {
					console.log(JSON.parse(body)["Error"]);
				}
				else {
					console.log(error);
				}
			});
	}

	function doIt(){
		// fs is an NPM package defined from above for reading and writing files 

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data" 
files.readFile("random.txt", "utf8", function(error, data) {

    
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(',');

    for(var i = 0; i <dataArr.length; i++)
    {
    	console.log(dataArr[i]);
    }
    
});
	}

	function usage(){
		console.log("Usage: node liri.js <command>");
		console.log("Where: command is one of the following:");
		console.log("    my-tweets");
		console.log("    spotify-this-song <song name here>");
		console.log("    movie-this <movie name here>");
		console.log("    do-what-it-says");
	}
}

liriBot();
