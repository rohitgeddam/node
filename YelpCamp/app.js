const express  	=require("express");
const app 	  	 = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine","ejs");
//variable
app.use(bodyParser.urlencoded({extended:true}));

//connect to mongoose.
// mongoose.connect("mongodb://localhost/yelp_camp");//old method
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});//new method


//schema setup

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description:String,
});

//objectifing a schema.

var Campground = mongoose.model("campground",campgroundSchema);

//creating campground in db.
// Campground.create({
// 	name: "Granite Hill",
// 	image:"https://www.photosforclass.com/download/pixabay-1892494?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8dc414e5ba814f6da8c7dda793f7f1636dfe2564c704c732d7dd79044c75d_960.jpg&user=12019",
// 	description:"a hilly over granite with no bathrooms.",
// },function(err,campground){
// 	if(err){
// 		console.log("error");
// 	}else{
// 		console.log("success");
// 		console.log(campground);
// 	}
// })

//routes goes here
app.get("/",function(req,res){
  res.render("landing");
})

app.get("/campgrounds",function(req,res){
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
    		res.render("index",{campgrounds:allcampgrounds});
    	}
    })

})

app.post("/campgrounds",function(req,res){
	// res.send("you have come to post method");
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name:name,image:image,description:description};
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	})
})

app.get("/campgrounds/new",function(req,res){
	//show the form
	res.render("new.ejs");
})

app.get("/campgrounds/:id",function(req,res){
	// res.render("show");
	// console.log(req.params.id);

	  // Yes, it's a valid ObjectId, proceed with `findById` call.
		Campground.findById(req.params.id,function(err,newCampground){
			if(err){
				console.log(err);
			}else{
				res.render('show',{campground:newCampground})
			}
		})






})
//app server setup

app.listen(8000,function(){
  console.log("server has started running at port 8000");
})
