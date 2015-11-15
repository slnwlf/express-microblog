$(function() {
	console.log("Javascript is working!");

	// compile handlebars template
	var source = $('#microblog-template').html();
	var template = Handlebars.compile(source);


	// API routes

	// AJAX call to GET all blogposts

	$.get('/api/blogposts', function(data) {
		allBlogposts = data.blogPosts;
		var blogpostsHtml = template({ blogPosts: data.blogPosts
		});
		$('#blogPosts-list').append(blogpostsHtml);
	});

	var blogpostsHtml = template({
		blogPosts: allBlogposts
	});
	$('#blogposts-list').append(blogpostsHtml);
});