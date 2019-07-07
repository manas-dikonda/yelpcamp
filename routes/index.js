var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


//HOME PAGE
router.get('/', function(req, res) {
    res.render('landing');
});

// AUTHENTICATION ROUTES
router.get('/register', function(req, res) {
    res.render('register', {page: 'register'});
});

//RESGISTER USER AND REDIRECT TO CAMPGROUND
router.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if(err){
			console.log(err);
			return res.render("register", {error: err.message});
		}
        passport.authenticate('local')(req, res, function() {
			req.flash("success", "Welcome to YelpCamp" +user.username);
            res.redirect('/campground');
        });
    });
});

// lOGIN FORM
router.get('/login', function(req, res) {
    res.render('login', {page: 'login'});
});

//RESGISTER USER AND REDIRECT TO CAMPGROUND
router.post('/login', function(req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/campground',
		failureRedirect: '/login',
		successFlash:"Welcome back, " + req.body.username + "!",
		failureFlash: true
	})(req, res);
});
// LOGOUT LOGIC
router.get('/logout', function(req, res) {
    req.logout();
	req.flash("success", "Successfully logged out!");
    res.redirect('/campground');
});

module.exports = router;