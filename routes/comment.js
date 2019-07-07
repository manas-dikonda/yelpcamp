var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comments = require("../models/comments");
var middleware = require("../middleware");

//NEW COMMENT FORM
router.get("/new", middleware.isLoggedIn,  function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Sorry...Cannot add a comment to this campground");
			console.log(err);
		} else {
			res.render("comments/new", {campgrounds: foundCampground});
		}
	});
});

//ADD A NEW COMMENT
router.post("/", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Sorry...Cannot add a comment to this campground");
			res.redirect("/campground");
		} else {
			Comments.create(req.body.comments, function(err, newComment) {
				if(err || !newComment) {
					console.log(err);
				} else {
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					foundCampground.comments.push(newComment);
					foundCampground.save();
					req.flash("succes", "Successfully added a new comment");
					res.redirect("/campground/" + foundCampground._id);
				}
			});
		}
	});
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Comments.findById(req.params.comment_id, function(err, foundComment) {
		if(err || !foundComment) {
			req.flash("error", "Sorry...Cannot edit this campground");
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});


router.put("/:comment_id" , middleware.checkCommentOwnership, function(req, res) {
	Comments.findByIdAndUpdate(req.params.comment_id, req.body.comments, function(err, updatedComment) {
		if(err || !updatedComment) {
		req.flash("error", "Sorry...Cannot find the comment to edit");
			res.redirect("back");
		} else {
		req.flash("success", "Comment edited successfully!!!");
			res.redirect("/campground/" +req.params.id);
		}
	});
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comments.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			req.flash("error", "Sorry...Cannot delete this comment");
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted successfully!!");
			res.redirect("/campground/" +req.params.id);
		}
	});
});

module.exports = router;