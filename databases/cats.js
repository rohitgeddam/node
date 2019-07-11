var mongoose = require("mongoose")


//connect to the service

mongoose.connect("mongodb://localhost/cat_app");

//define what a cat looks like.
//cat schema

var catSchema = new mongoose.Schema({
	name:String,
	age:Number,
	temperament:String,
});

var Cat = mongoose.model("Cat",catSchema);

// //adding cat to db.

// var george = new Cat({
// 	name:"George",
// 	age:11,
// 	temperament:"Grouchy"
// });

// george.save(function(err,cat){
// 	if(err){
// 		console.log("error");
// 	}else{
// 		console.log("saved");
// 	}
// });

//new and save at once.
Cat.create({
	name:"Snow White",
	age:15,
	temperament:"Bland",
},function(err,cat){
	if(err){
		console.log("err");
	}
	else{
		console.log(cat);
	}
});

//retreive objects from db.
Cat.find({},function(err,cats){
	if(err){
		console.log("err");
	}else{
		console.log("saved");
		console.log(cats);
	}
})






