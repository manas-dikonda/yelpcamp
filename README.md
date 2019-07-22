#YelpCamp
________________________________________

YelpCamp is a NodeJS application where users can post a campground, view other campgrounds, comment about their experience and go and book their stay.

Features
________________________________________

•	Manage campground posts and comments

	o	Create, view, edit and delete campground posts and comments
	o	Upload campground photos
	o	Display campground location on Google Maps (disabled)

•	Responsive web design

•	Authentication

	o	Signup a user with a username, admin code and password
	o	User login using the username and password
	o	Admin login with admin username and password
	
•	Authorization

	o	One cannot create or edit a new campground or comment without user login
	o	One cannot edit or delete a campground or comment created by a different user
	o	Admins have the right to manage all campgrounds and comments
	
•	Flash messages responding to users' interaction with the app

•	Custom Enhancements

	o	Changed comment post and put routes to redirect back to single campground show page
	o	Used Google Fonts and Font Awesome instead default fonts
	o	Used moment JS to show post and comment creation and update timestamp
	o	Added Admin invitation code generation functionality
	
Technologies used
________________________________________

Front-end

•	Google Fonts

•	Font Awesome

•	Bootstrap 4

Back-end

•	express

•	mongoDB

•	mongoose

•	ejs

•	passport

•	passport-local

•	passport-local-mongoose

•	body-parser

•	express-session

•	method-override

•	moment

•	connect-flash

•	Google Maps APIs

Deployment

•	Heroku
