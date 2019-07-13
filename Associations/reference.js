const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/data_associations");
//create schema for movie.


var commentSchema = mongoose.Schema({
	comment:String,
})

var movieSchema = mongoose.Schema({
	title:String,
	genres: String,
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref :"Movie",
	}],
})

var Movie = mongoose.model("Movie",movieSchema);
var Comment = mongoose.model("Comment",commentSchema);


// Movie.create({
// 	title:"race",
// 	genres:"action",
// },function(err,movie){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(movie);
// 	}
// });

// Comment.create({
// 	comment:"Review 2"
// },function(err,comment){
// 	Movie.findOne({title:"race"},function(err,found){
// 		found.comments.push(comment);
// 		found.save(function(err,saved){
// 			console.log(saved);
// 		});
// 	});
// })


//find those comments.

Movie.findOne({title:"race"}).populate("comments").exec(function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
})