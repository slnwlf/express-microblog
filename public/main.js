$(function() {
	console.log("Javascript is working!");

	// compile handlebars template

	var source = $('#blogposts-template').html();
	var template = Handlebars.compile(source);


	// API routes

	// AJAX call to GET all blogposts

	$.get('/api/blogposts', function(data) {
		allBlogposts = data.blogposts;
		
		var blogpostsHtml = template({
			blogposts: data.blogposts
		});
		$('#blogposts-list').append(blogpostsHtml);

	});
});