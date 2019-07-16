var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description:String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"

		},
		username: String
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
			}
	]
});

//objectifing a schema.
module.exports = mongoose.model("Campground",campgroundSchema);