var Campground = require("../models/campgrounds");
var Comments = require("../models/comments");

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Sorry! You need to Login first!");
	res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
	// if logged in
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err || !foundCampground) {
				req.flash("error", "Sorry...Could not find the Campground!");
				res.redirect("back");
			} else {
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				}
				else {
					req.flash("error", "Sorry...You do not have the permission to do that!!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Sorry...You need to be logged in first!!");
		res.redirect("/login");
	}
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
	// if logged in
	if(req.isAuthenticated()) {
		Comments.findById(req.params.comment_id, function(err, foundComment) {
			if(err || !foundComment) {
				req.flash("error", "Sorry...Could not find the Campground!");
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				}
				else {
					req.flash("error", "Sorry...You do not have the permission to do that!!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Sorry...You need to be logged in first!!");
		res.redirect("/login");
	}
};

module.exports = middlewareObj;