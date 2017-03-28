var express = require('express'),

 bodyParser = require('body-parser'),
    passport = require ("passport"),
    localStrategy = require("passport-local"),
    mongoose  = require('mongoose'),

    User = ("./models/User"),
    working = require("./models/works"),
 comment = require("./models/comment"),
 seedDB = require("./seed"),
app = express();
seedDB();
mongoose.connect("mongodb://localhost/sel__works");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public"));


//PASSPORT config
app.use(require("express-session")({
    secret:"Вы попали на этот сайт случайно",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use( new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("landing");

});
app.get("/works", function(req, res){

working.find({},function(err, AllWorks){
    if(err){
        console.log(err);
    }else {
        res.render("work/works", {works:AllWorks});
    }
});




});
app.post("/works", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newWorks = {name : name, image : image, description : description};
   working.create(newWorks, function(err, created){
       if(err){
           console.log(err);
       }else {
           res.redirect("/works");
       }
   });

});
app.get("/works/new", function(req, res){
    res.render('work/new');
});


app.get("/works/:id", function(req, res){
    working.findById(req.params.id).populate("comments").exec( function(err, foundWorking){
        if(err){
            console.log(err);
        }else {

            res.render('work/show',{working : foundWorking});
        }

    });


});
//================================
//comments routs
//================================
app.get("/works/:id/comments/new", function(req, res){
    working.findById(req.params.id, function(err, working){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new", {working:working});
        }
    });

});
app.post("/works/:id/comments", function(req, res){
    working.findById(req.params.id,function(err, working){
        if(err){
            console.log(err);
            res.redirect("/works");
        }else {
            comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else {
                    working.comments.push(comment);
                    working.save();
                    res.redirect("/works/" + working._id);
                }
            });


            //var text = req.body.text,
            //    author = req.body.author

        }
    });
});
//AUTH routes
//register form
app.get("/register", function(req, res){
        res.render("register");
});
app.post("/register", function(req, res){
  var newUser =   new User({username:req.body.username}),
      pass = req.body.password;
    User.register(newUser, pass, function(err, user){
        if(err){
            console.log(err);
          return res.render("register");
        }else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/works");
            });
        }
    });
});
app.listen(7300, function(){
    console.log("Landing has started!!!");
});


