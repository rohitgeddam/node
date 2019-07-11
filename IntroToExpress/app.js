var express = require("express"); 
var app = express();
 // '/'=>hi there.

app.get('/',(req,res)=>{
	res.send("hello hi there!!");
});

// '/hi'=> good morning;
app.get('/hi',(req,res)=>{
	res.send("hi good mornign!");
});


app.get("/r/:anyword",(req,res)=>{
	console.log(req);
	res.send("soccer");
});


app.get("*",(req,res)=>{
	res.send("you are a star!!");
});

//any word :


app.listen(8000,function(err){
	console.log("server has started");
});