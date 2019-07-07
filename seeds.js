var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comments = require("./models/comments");

var seedData = [
	{
		name: "Yosemite Park", 
		image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-			      			1.2.1&auto=format&fit=crop&w=1500&q=80", 
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
	},
 	{
		name: "Granite Hill", 
		image:"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-		1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80", 
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
	},
	{
		name: "Baratunga Camp", 
		image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80", 
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
	}
];

function seedDB() {
	Campground.deleteMany({}, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("Campgrounds were removed");
		}
	});
	seedData.forEach(function(seed) {
		Campground.create(seed, function(err, newCampground) {
			if(err) {
				console.log(err);
			} else {
				console.log("Campground was created");
				Comments.create({
					text: "This is a great place! I want to go here again.",
					author: "Home Boy"
				}, function(err, newComment) {
					if(err) {
						console.log(err);
					} else {
						newCampground.comments.push(newComment);
						newCampground.save();
						console.log("Comment created");
					}
				});
			}
		});
	});
}
module.exports = seedDB;