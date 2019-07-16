const express  	=require("express");
const app 	  	 = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const seedsDB = require("./seeds");
const methodOverride = require('method-override')
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const commentRoute = require("./routes/comment"),
	  campgroundRoute = require("./routes/campground"),
	  indexRoute  		= require("./routes/index")	

// seedsDB();
const Campground = require("./models/campground");
const Comment = require("./models/comment");
// const Comment = require("./models/comment");
app.set("view engine","ejs");
app.use(methodOverride('_method'));
//variable
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
})
//setup passport.
app.use(require("express-session")({
	secret:"node js campground project bootcamp",
	resave:false,
	saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//using routes.
app.use("/campgrounds/:id/comments",commentRoute);
app.use("/campgrounds",campgroundRoute);
app.use(indexRoute);

//connect to mongoose.
// mongoose.connect("mongodb://localhost/yelp_camp");//old method
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});//new method

//app server setup
app.get("/",function(req,res){
    res.render("landing");
  })
  

app.listen(8000,function(){
  console.log("server has started running at port 8000");
})
