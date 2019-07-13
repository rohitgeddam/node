const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    author:String,
    text:String,
})

module.exports = mongoose.model("Comment",commentSchema);