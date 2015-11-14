$(function() {
	console.log("Javascript is working!");

	// compile handlebars template
	var source = $('#microblog-template').html();
	var template = Handlebars.compile(source);

	// array of test data
	var allBlogposts = [
	{ title: "The sun goes up, the sun goes down", story: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel neque recusandae doloribus qui dolorum. Molestiae inventore, corporis aut, impedit excepturi quidem temporibus! Consequuntur nobis labore eaque recusandae molestias illo maiores?"},
	{ title: "Once upon a time in a galaxy far, far way", story: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel neque recusandae doloribus qui dolorum. Molestiae inventore, corporis aut, impedit excepturi quidem temporibus! Consequuntur nobis labore eaque recusandae molestias illo maiores?"},
	];

	var blogpostsHtml = template({ blogPosts: allBlogposts });
	$('#blogposts-list').append(blogpostsHtml);
});
