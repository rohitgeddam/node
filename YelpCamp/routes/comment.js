//++++++++++++++++++++++++++++++++++++++
//COMMENTS ROUTE
const express = require("express");
const Router = express.Router({mergeParams:true});
const Campground = require("../models/campground.js");
const Comment = require("../models/comment");
const middleware = require("../middleware/");
Router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:foundCampground});
		}
	})
	
})
//++++++++++++++++++++++++++++++++++++++

Router.post("/",middleware.isLoggedIn,function(req,res){
	//find the campground first.
	Campground.findById(req.params.id,function(err,campground){
	
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//create a comment.
			Comment.create(req.body.comment,function(err,comment){
			
				if(err){
					console.log(err);
				}else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
			})
		}
	})
})
Router.get("/:commentId/edit",middleware.isCommentOwner,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log("didnt find the campground.");
			res.redirect("/campgrounds");
		}else{
			Comment.findById(req.params.commentId,function(err,foundComment){
				if(err){
					console.log(err);
					res.redirect("/campgrounds/"+req.params.id);
				}else{
					res.render("comments/edit",{comment:foundComment,campground:foundCampground,currentUser:req.user});
				}
			})
		}
		
	})

})

Router.put("/:commentId",middleware.isCommentOwner,function(req,res){

	Comment.findByIdAndUpdate(req.params.commentId,req.body.comment,function(err,updatedComment){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})

Router.delete("/:commentId",middleware.isCommentOwner,function(req,res){
	Comment.findByIdAndRemove(req.params.commentId,function(err,removedComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("back");
		}
	})
})

//middleware




module.exports = Router;