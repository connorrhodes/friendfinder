// Pull in required dependencies
var path = require('path');
// Import the list of friend entries
var friends = require('../data/friends.js');
// Export API routes
module.exports = function(app) {    //https://nodejs.org/api/modules.html#modules_module_exports
	// Total list of friend entries
	app.get('/api/friends', function(req, res) {   //http://expressjs.com/en/guide/routing.html
		res.json(friends);
	});
	// Add new friend entry
	app.post('/api/friends', function(req, res) {  //http://expressjs.com/en/guide/routing.html
		// Capture the user input object
		var userInput = req.body;
		var userResponses = userInput.scores;

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 40000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {	
			// Compute differenes for each question, hence the new var variable for the For loop
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// If lowest difference, record the friend match
			if (diff < totalDifference) {	
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}
		// Add new user
		friends.push(userInput);
		// Send response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage}); //https://www.npmjs.com/package/res-json
	});
};