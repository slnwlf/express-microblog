// require express and other modules
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
  // template = Handlebars.compile(source);

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// require Post and User models
var Post = require('./models/post'),
    User = require('./models/user');

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({
  extended: true
}));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect('mongodb://localhost/microblog-app');

// require Post model
var Post = require('./models/post');


// HOMEPAGE ROUTE

app.get('/', function(req, res) {
  res.render('index');
});


// API ROUTES

// get all posts
app.get('/api/posts', function(req, res) {
  // find all posts in db
  Post.find(function(err, allPosts) {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    } else {
      res.json({
        posts: allPosts
      });
    }
  });
});

// create new post
app.post('/api/posts', function(req, res) {
  // create new post with form data (`req.body`)
  var newPost = new Post(req.body);

  // save new post in db
  newPost.save(function(err, savedPost) {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    } else {
      res.json(savedPost);
    }
  });
});

// get one post
app.get('/api/posts/:id', function(req, res) {
  // get post id from url params (`req.params`)
  var postId = req.params.id;

  // find post in db by id
  Post.findOne({
    _id: postId
  }, function(err, foundPost) {
    if (err) {
      if (err.name === "CastError") {
        this.status(404).json({
          error: "Nothing found by this ID."
        });
      } else {
        this.status(500).json({
          error: err.message
        });
      }
    } else {
      res.json(foundPost);
    }
  });
});

// update post
app.put('/api/posts/:id', function(req, res) {
  // get post id from url params (`req.params`)
  var postId = req.params.id;

  // find post in db by id
  Post.findOne({
    _id: postId
  }, function(err, foundPost) {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    } else {
      // update the posts's attributes
      foundPost.title = req.body.title;
      foundPost.description = req.body.description;

      // save updated post in db
      foundPost.save(function(err, savedPost) {
        if (err) {
          res.status(500).json({
            error: err.message
          });
        } else {
          res.json(savedPost);
        }
      });
    }
  });
});

// delete post
app.delete('/api/posts/:id', function(req, res) {
  // get post id from url params (`req.params`)
  var postId = req.params.id;

  // find post in db by id and remove
  Post.findOneAndRemove({
    _id: postId
  }, function(err, deletedPost) {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    } else {
      res.json(deletedPost);
    }
  });
});

/// Auth routes ////

// show signup view
app.get('/signup', function (req, res) {
  res.render('signup');
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
// app.post('/signup', function (req, res) {
//   User.register(new User({ username: req.body.username }), req.body.password,
//     function (err, newUser) {
//       passport.authenticate('local')(req, res, function() {
//         res.send('signed up!!!');
//       });
//     }
//   );
// });

// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// show user profile page
app.get('/profile', function (req, res) {
  res.render('profile', { user: req.user });
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        // res.send('signed up!!!');
        res.redirect('/profile');
      });
    }
  );
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  // res.send('logged in!!!');
  res.redirect('/profile');
});


// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});