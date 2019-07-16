const express = require("express");
const Router = express.Router();
const passport = require("passport");
const User = require("../models/user");
// const middleware = require("../middleware/");
Router.get("/register",function(req,res){
	res.render("register");
	// console.log("return");
});


Router.post("/register",function(req,res){
	var user = new User({username:req.body.username})
	User.register(user,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");

		}
		else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/campgrounds");
			});
		}
	});
});

//--------------------------LOGIN ROUTE

Router.get("/login",function(req,res){
	res.render("login");
})

Router.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
}),function(err,user){

});

Router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");	
});




module.exports = Router;