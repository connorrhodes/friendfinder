// Pull in required dependencies
var path = require('path');
// Export HTML routes
module.exports = function(app) {	
	// Home page
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/home.html'));//https://www.npmjs.com/package/path.join
	});
	// Survey page
	app.get('/survey', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});
};