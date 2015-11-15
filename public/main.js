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
	console.log("GET route is working");

	/////////////////
	// POST route ///
	/////////////////

	// form to create a new blogpost, ie POST

	var $createBlogpost = $('#create-blogposts');
	console.log("the POST route has started.");

	$createBlogpost.on('submit', function(event) {
		console.log("submit was clicked.");
		event.preventDefault();

		// serialze form data
		var newBlogpost = $(this).serialize();
		console.log("passing by newBlogpost var");

		// POST request to create new blogpost
		$.post('/api/blogposts', newBlogpost, function(data) {
			console.log(data);

			// add new book to allBlogposts
			$('#blogposts-list').append(blogpostsHtml);
			allBlogposts.push(data);

			// render all blogposts to view
			render();
		});

		// reset the form
		$createBlogpost[0].reset();
		$createBlogpost.find('input').first().focus();
	});


	///////////////////
	/// DELETE route///
	///////////////////



		// DELETE request to delete blogpost

		$.ajax({
			type: 'DELETE',
			url: '/api/blogposts' + '/' + blogpostId,
			success: function(data) {

				// remove deleted blogpost from all todos
				allBlogposts.splice(allBlogposts.indexOf(blogPostDelete), 1);

				// render all blogposts to view
				render();
			}
	// 	});
	});

});