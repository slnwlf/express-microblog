$(function() {
	console.log("Javascript is working!");

	// compile handlebars template

	var source = $('#blogposts-template').html();
	var template = Handlebars.compile(source);


	// API routes

	// AJAX call to GET all blogposts

	$.get('/api/blogposts', function(data) {
		allBlogposts = data.blogposts;

		var blogpostsHtml = template({ blogposts: allBlogposts });
		$('#blogposts-list').append(blogpostsHtml);
	});

	$('#create-blogpost').on('submit', function (event) {
		event.preventDefault();
	});
});