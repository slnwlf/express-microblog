var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

// bodyParser gets data out of forms

app.use(bodyParser.urlencoded({
	extended: true
}));

// set hbs as server view engine. 

// use public forlder for static files

app.use(express.static(__dirname + '/public'));

// app.use(express.static('public'));

app.set('view engine', 'hbs');

// Homepage route (temp - pre Mongo)

app.get('/', function(req, res) {
	res.render('index');
});

// API routes

// test data

// array of test data
var allBlogposts = [{
	title: "The sun goes up, the sun goes down",
	story: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel neque recusandae doloribus qui dolorum. Molestiae inventore, corporis aut, impedit excepturi quidem temporibus! Consequuntur nobis labore eaque recusandae molestias illo maiores?"
}, {
	title: "Once upon a time in a galaxy far, far way",
	story: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel neque recusandae doloribus qui dolorum. Molestiae inventore, corporis aut, impedit excepturi quidem temporibus! Consequuntur nobis labore eaque recusandae molestias illo maiores?"
}, ];

app.get('/api/blogposts', function (req, res) {
	res.json({
		blogPosts: allBlogposts
	});
});


// starting server on localhost: 3000
app.listen(3000, function() {
	console.log('server started');
});