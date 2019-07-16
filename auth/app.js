const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const app = express();
mongoose.connect("mongodb://localhost/auth_demo");

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');


app.use(require("express-session")({
    secret: "Rusty is the est and cutest dog in the world",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

//order is very important. = > require express session -> initialize -> session.


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/",function(req,res){
    res.render("home");
})

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
})

//++++++++
//Register ROute
//++++++++
app.get("/register",function(req,res){
    res.render("register");
})

app.post("/register",function(req,res){

    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secret");
            })
        }
    })

})

app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");

});



//LOgin route
app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req,res){

});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        console.log("i am else");
        res.redirect("/login");
    }
    
};
app.listen(8000,function(){
    console.log("auth server has started on port 8000");
});
