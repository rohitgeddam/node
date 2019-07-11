var express = require("express")
var app = express();

app.use(express.static("public"));
app.set("view engine" ,"ejs")


app.get('/',function(req,res){
	// res.send("welcome to the homepage");
	res.render("home");
});

app.get("/fellinlovewith/:thing",function(req,res){
	var thing = req.params.thing;
	res.render("love",{thing:thing});
});

app.listen(8000,function(){
	console.log("server has started.");
})
