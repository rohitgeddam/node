const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment")
var data = [
	{
		name: "sandy shore",
		image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"no bathrooms only sand."
	},
	{
		name: "Granite Hill",
		image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"beautifull hill over the top view."
	},
	{
		name: "night classic",
		image:"https://images.unsplash.com/photo-1502218808493-e5fd26249efc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"best in class suit campground"
	}

]

function seedsDB(){
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
			console.log("removed campgrounds");
			//add a few campgrounds.
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err){
						console.log(err);
					}
					else{
						console.log("added a campground");
						//create a comment
						Comment.create({
							text:"very beautiful place and fits the budget.",
							author:"rohit"
						},function(err,comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("new comment created");
							}
						})
					}
				});
			});
			
		
	});
}

module.exports = seedsDB;