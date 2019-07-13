const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/data_associations");
//create schema for movie.


var commentSchema = mongoose.Schema({
	comment:String,
})

var movieSchema = mongoose.Schema({
	title:String,
	genres: String,
	comments:[commentSchema],
})

var Movie = mongoose.model("Movie",movieSchema);
var Comment = mongoose.model("Comment",commentSchema);

// var avatar = new Movie({
// 	title:"Avatar",
// 	genres :"sci-fi",
// })
// avatar.comments.push({
// 	comment:"very funny",
// })

// avatar.save({},function(err,data){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(data);
// 	}
// })

Movie.findOne({title:"Avatar"},function(err,movie){
	if(err){
		console.log(err);
	}else{
		movie.comments.push({
			comment:"not that funny ha ha ha",
		});
		movie.save({},function(err,savedMovie){
			if(err){
				console.log(err);
			}else{
				console.log(savedMovie);
			}
		})
	}
})