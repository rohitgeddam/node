var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var friends = ["tony","miranda","justin","pierre","lily"];

app.get("/",function(req,res){
  res.render("home");

});

app.post("/addFriend",function(req,res){
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect("/friends");
})

app.get("/friends",function(req,res){

  res.render("friends",{friends:friends});

});


app.listen(8000,function(){
  console.log("server has started.")
});
