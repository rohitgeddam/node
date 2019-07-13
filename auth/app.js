const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const app = express();
mongoose.connect("mongodb://localhost/auth_demo");


app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());

app.use(require("express-session")({
    secret: "Rusty is the est and cutest dog in the world",
    resave:false,
    saveUninitialized:false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get("/",function(req,res){
    res.render("home");
})

app.get("/secret",function(req,res){
    res.render("secret");
})

app.get("/register",function(req,res){
    res.render("register");
})

app.listen(8000,function(){
    console.log("auth server has started on port 8000");
});
app.listen