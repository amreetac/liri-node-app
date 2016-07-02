//(function () {

	function liriBot () {

	var fs = require('fs');

	if(process.argv.length != 3) {
			usage();
	}

	switch(process.argv[2]) {
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThis();
			break;
		case "movie-this":
			movieThis();
			break;
		case "do-what-it-says":
		doThis();
			break;
		default:
				usage();
	}


// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data" 
//fs.readFile("keys.js", "utf8", function(error, data) {

    
    // Then split it by commas (to make it more readable)
    //var dataArr = data.split(',');

    //for(var i = 0; i <dataArr.length; i++)
    //{
    	//console.log(dataArr[i]);
    //}
    
//});

function myTweets() {

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
  	for(var i=0; i<tweets.length && i < 20; i++) {
  		//console.log(tweets);
  		//console.log("------------");
    	console.log("Tweet" + (i + 1) + "Created At:" + tweets[i].created_at);
    	console.log(tweets[i].text);
    	//console.log("------------");
  }
}
});
}

function spotifyThis() {
	
}

function movieThis() {
	
}

function doThis() {
	
}

function usage () {
		console.log("Usage: node liri.js <command>");
			console.log("Where: command my-tweets, spotify-this-song, movie-this, do-what-it-says");
	}

}

liriBot();
//});