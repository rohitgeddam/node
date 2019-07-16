const Campground = require("../models/campground");
const Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }


middlewareObj.isCommentOwner = function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.commentId,function(err,foundComment){
			if(err){
				console.log(err);
				res.redirect("back");
			}else{
				if(foundComment.author.id.equals(req.user.id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		})
	}else{
		res.redirect("back");
	}
}

middlewareObj.isCampgroundOwner = function(req,res,next){
    if(req.isAuthenticated()){
      Campground.findById(req.params.id,function(err,foundCampground){
          if(err){
              res.redirect("back");
          }else{
              if(foundCampground.author.id.equals(req.user._id)){
               next();
              }else{
                  res.redirect("back");
              }
          }
      })
    }else{
        res.redirect("back");
        
    }
   
}

module.exports = middlewareObj;