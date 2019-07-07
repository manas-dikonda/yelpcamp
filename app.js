require('dotenv').config();

var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	flash = require("connect-flash");
	app.locals.moment = require('moment');
var	passport = require("passport"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	expressSession = require("express-session"),
	mongoose = require("mongoose"),
	Campground = require("./models/campgrounds"),
	Comments = require("./models/comments"),
	User = require("./models/user"),
	seedDB = require("./seeds");

var indexRoute = require("./routes/index");
var campgroundRoute = require("./routes/campground");
var commentRoute = require("./routes/comment");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useFindAndModify: false});
mongoose.set();

//seedDB();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(expressSession({
	secret: "RIP FIFA 19. Welcome FIFA 20!!!",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoute);
app.use("/campground", campgroundRoute);
app.use("/campground/:id/comments", commentRoute);


app.listen("3000", function() {
	   console.log("YelpCamp Server started!!!");
});