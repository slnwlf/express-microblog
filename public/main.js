$(document).ready(function() {
	console.log("Javascript is working!");

	// compile handlebars template

	var source = $('#blogposts-template').html();
	var template = Handlebars.compile(source);


	// API routes

	// AJAX call to GET all blogposts

	$.get('/api/blogposts', function(data) {
		allBlogposts = data.blogposts;

		var blogpostsHtml = template({
			blogposts: allBlogposts
		});
		$('#blogposts-list').append(blogpostsHtml);
	});

	// POST route 

	// form to create a new blogpost

	var $createBlogpost = $('#create-blogposts');

	$createBlogpost.on('submit', function(event) {
		event.preventDefault();

		// serialze form data
		var newBlogpost = $(this).serialize();

		// POST request to create new blogpost
		$.post('/api/blogposts', newBlogpost, function(data) {
			console.log(data);

			// add new book to allBlogposts
			$('#blogposts-list').append(todoHtml);
			allTodos.push(data);

			// render all blogposts to view
			render();
		});

		// reset the form
		$createBlogpost[0].reset();
		$createBlogpost.find('input').first().focus();
	});

	// $('#create-blogpost').on('submit', function (event) {
	// 	event.preventDefault();
	// });

});