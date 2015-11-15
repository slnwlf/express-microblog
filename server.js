var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

	// bodyParser gets data out of forms

app.use(bodyParser.urlencoded({ extended: true }));

// set hbs as server engine. 

// use public forlder for static files

// app.use(express.static(__dirname + '/public'));

app.use(express.static('public'));

app.set('view engine','hbs');

	// Homepage route (temp)

app.get('/', function (req, res) {
	res.send('hello world');
});


// starting server on localhost: 3000
app.listen(3000, function () {
	console.log('server started');
});
