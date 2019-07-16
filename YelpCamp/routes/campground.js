const express = require("express");
const Router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware/");
//routes goes here
// Router.get("/",function(req,res){
//     res.render("landing");
//   })
  
Router.get("/",function(req,res){
      // var campgrounds = [
      //   {name:"salmon creek",image:"https://www.photosforclass.com/download/pixabay-1163419?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d3404e53a514f6da8c7dda793f7f1636dfe2564c704c732d7dd79044c75d_960.jpg&user=Brahmsee"},
      //   {name:"jaipur", image:"https://www.photosforclass.com/download/pixabay-1892494?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8dc414e5ba814f6da8c7dda793f7f1636dfe2564c704c732d7dd79044c75d_960.jpg&user=12019"},
      //   {name:"salmon creek",image:"https://www.photosforclass.com/download/pixabay-1163419?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d3404e53a514f6da8c7dda793f7f1636dfe2564c704c732d7dd79044c75d_960.jpg&user=Brahmsee"},
      //   {name:"jaipur", image:"https://www.photosforclass.com/download/pixabay-1892494?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8dc414e5ba814f6da8c7dda793f7f1636dfe2564c704c732d7dd79044c75d_960.jpg&user=12019"},
      //   {name:"salmon creek",image:"https://www.photosforclass.com/download/pixabay-1163419?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d3404e53a514f6da8c7dda793f7f1636dfe2564c704c732d7dd79044c75d_960.jpg&user=Brahmsee"},
      //   {name:"jaipur", image:"https://www.photosforclass.com/download/pixabay-1892494?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8dc414e5ba814f6da8c7dda793f7f1636dfe2564c704c732d7dd79044c75d_960.jpg&user=12019"},
      // ]
      Campground.find({},function(err,allcampgrounds){
          if(err){
              console.log(err);
          }else{
              res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser:req.user});
          }
      })
  
  })
  
Router.post("/",middleware.isLoggedIn,function(req,res){
      // res.send("you have come to post method");
      var name = req.body.name;
      var image = req.body.image;
      var description = req.body.description;
      var author = {
          id : req.user.id,
          username: req.user.username
      }
      var newCampground = {name:name,image:image,description:description,author:author};
      Campground.create(newCampground,function(err,newlyCreated){
          if(err){
              console.log(err);
          }else{
              res.redirect("/campgrounds");
          }
      })
  })
  
Router.get("/new",middleware.isLoggedIn,function(req,res){
      //show the form
      res.render("campgrounds/new.ejs",{currentUser: req.user});
  })
  
Router.get("/:id",function(req,res){
      // res.render("show");
      // console.log(req.params.id);
  
        // Yes, it's a valid ObjectId, proceed with `findById` call.
          Campground.findById(req.params.id).populate("comments").exec(function(err,newCampground){
              if(err){
                  console.log(err);
              }else{
                  res.render('campgrounds/show',{campground:newCampground,currentUser: req.user})
              }
          })
  
  });

  // edit and update route for campground page.
  Router.get("/:id/edit",middleware.isCampgroundOwner,function(req,res){
      Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit.ejs",{campground:foundCampground,currentUser: req.user});
      })
      
  })
  Router.put("/:id",middleware.isCampgroundOwner,function(req,res){
        Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
            if(err){
                console.log(err);
            }else{
                console.log(updatedCampground);
                res.redirect("/campgrounds/"+ updatedCampground.id);
            }
        })
  })

  Router.get("/:id/delete",middleware.isCampgroundOwner,function(req,res){
      Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/delete.ejs",{campground:foundCampground,currentUser: req.user});
        }
      })
      
  })

  Router.delete('/:id',middleware.isCampgroundOwner,function(req,res){
      if(req.body.name === "delete"){
        Campground.findByIdAndRemove(req.params.id,function(err,removedCampground){
            if(err){
                console.log(err);

            }else{
                res.redirect("/campgrounds/");
            }
        })
      }else{
          res.redirect("/campgrounds/"+req.params.id+"/delete");
        // window.alert("please type delete in the box.");
      }
        
  });

  

  

  module.exports = Router;