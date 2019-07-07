var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// GET ALL THE CAMPGROUNDS
router.get("/", function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/campground", {campgrounds: allCampgrounds, page: 'campgrounds'});
		}
	});
});

//ADD NEW CAMPGROUND FORM
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

//CAMPGROUND SHOW PAGE
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Sorry...Could not find the Campground!");
			res.redirect("/campground");
		} else {
			res.render("campgrounds/show", {campgrounds: foundCampground});
		}
	});
});

// EDIT CAMPGROUND FORM
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Sorry...Could not find the Campground!");
			res.redirect("/campground");
		} else {
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
		  req.flash('error', 'Invalid address');
		  return res.redirect('back');
		}
		req.body.campground.lat = data[0].latitude;
		req.body.campground.lng = data[0].longitude;
		req.body.campground.location = data[0].formattedAddress;
		Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
			if(err || !updatedCampground) {
				req.flash("error", "Sorry...Could not find the Campground!");
				res.redirect("back");
			} else {
				req.flash("success", "Campground updated successfully!!");
				res.redirect("/campground/" +req.params.id);
			}
		});
	});
});

// DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			req.flash("error", "Sorry...Could not delete the Campground!");
			res.redirect("back");
		} else {
			req.flash("success", "Campground deleted successfully!!");
			res.redirect("/campground");
		}
	});
});

//ADD A NEW CAMPGROUND 
router.post("/", middleware.isLoggedIn, function(req, res) {
	var name = req.body.name,
		image = req.body.image,
 		desc = req.body.description,
		cost = req.body.cost,
		author = {
			id: req.user.id,
			username: req.user.username
		};
	// geocoder.geocode(req.body.location, function(err, data) {
	// 	console.log(req.body.location);
	// 	console.log(data);
	// 	if (err || !data.length) {
	// 		req.flash('error', 'Invalid address');
	// 		return res.redirect('back');
	// 	}
	// 	var lat = data[0].latitude;
	// 	var lng = data[0].longitude;
	// 	var location = data[0].formattedAddress;
		var newCampground = {name: name, image: image, description: desc, cost: cost, author: author};
		Campground.create(newCampground, function(err, newCamp) {
			if(err || !newCamp) {
				req.flash("error", "Sorry...Could not create a new Campground!");
				res.redirect("/campground");
			} else {
				req.flash("success", "New Campground created successfully!!!");
				res.redirect("/campground");
			}
		});
	//});
});

module.exports = router;