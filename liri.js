// Includes the FS package for reading and writing files 
function liriBot() {

	var files = require('fs');

//In part of a larger function, we have the switch case statement
//along with the appropriate functions to be called for each case below. 

// Using splice method to appropriately include all cases for
//input length

 liri(process.argv[2], process.argv.splice(3, process.argv.length - 3));

    function liri(liriName, liriString){

	switch(liriName){
		case "my-tweets":
			if (liriString.length > 0) {
				usage();
				break;
			}
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThis(liriString);
			break;
		case "movie-this":
			movieThis(liriString);
			break;
		case "do-what-it-says":
			if (liriString.length > 0) {
				usage(liriName, liriString);
				break;
			}
			doIt();
			break;
		default:
			usage(liriName, liriString);
	}
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

		 var printf = require('printf');  //Note: Download the printf package!!
		 // This was done to create a nicer format for spotify output.

        var song = songName.length ? songName: "Whats my age again";

        spotify.search({ type: 'track', query: song }, function(err, data) {
			if ( err ) {
				console.log('Error occurred: ' + err);
				return;
			}

			//console.log(JSON.stringify(data.tracks, null, 2);

			var items = data.tracks.items;

			var col1 = "";
			var col2 = "";
			var col3 = "";
			var col4 = "";
			var col5 = "";

			console.log("\tArtist\t\t\tSong Name\t\t\t\t\tSpotify Link\t\t\tAlbum\t\t\t\tTrack Number");

   			 for (var i=0; i<items.length; i++) {
   			 	col1 = JSON.stringify(data.tracks.items[i].artists[0].name, null, 2);
   			 	col2 = JSON.stringify(data.tracks.items[i].name, null, 2);
				col3 = JSON.stringify(data.tracks.items[i].uri, null, 2);
				col4 = JSON.stringify(data.tracks.items[i].album.name, null, 2);
				col5 = JSON.stringify(data.tracks.items[i].track_number, null, 2);

				console.log(printf("%-25s %-40s %-40s %-30s\t    %-3d", //padding from printf package
		// Maximize your command line to see the Artist, Song name, spotify link, album and track number the best
					(col1.replace(/"/g, ' ')).substr(0,25), 
					(col2.replace(/"/g, ' ')).substr(0,40), 
					(col3.replace(/"/g, ' ')).substr(0,40), 
					(col4.replace(/"/g, ' ')).substr(0,30), 
					(col5.replace(/"/g, ' ')).substr(0,3)));
   			 }
		});
    }
    
	// This function takes an array of words making the movie name
	function movieThis(movieName){

		var request = require('request');

		// Running a request to OMDB with Mr. Nobody as the default movie
		// To get each word together in the movie name (since it is seperated)
		// it needs to be joined together with "+" between each word.
		var movie = movieName.length ? movieName: "Mr. Nobody";

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
		// This block of code will read from the "movies.txt" file.
		// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
		// The code will store the contents of the reading inside the variable "data" 
		files.readFile("random.txt", "utf8", function(error, data) {

    
     //Then split it by commas (to make it more readable)
    var dataArr = data.split('\n');

    // This executes the command from the text file
        	// There are issues with multiple APIs so the loop is done once for now
    for(var i = 0; i <1; i++)
    {
    	var args = dataArr[i].split(','); // split the line into an array of args
        		console.log("============== " + args[0] + " " + args[1] + " ==============");
        		liri(args[0], args[1]);
    }
    
	});

	}


	function usage(liriName, liriString){
		console.log("Usage: node liri.js <command>");
		console.log("Where: command is one of the following:");
		console.log("    my-tweets");
		console.log("    spotify-this-song <song name here>");
		console.log("    movie-this <movie name here>");
		console.log("    do-what-it-says");
	}
}

liriBot();