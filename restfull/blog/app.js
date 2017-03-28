var express = require("express"),
        app = express(),
    sanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/blog_base");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(sanitizer());


var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : {
        type : Date,
        default: Date.now
    }

});




var blog = mongoose.model("blog", blogSchema);


app.get( "/", function(req, res){
    res.redirect("/blogs");
});
//index file
app.get("/blogs", function(req, res){
    blog.find({}, function(err, blogs){
        if(err){
            console.log("Error!");
        }else {
            res.render("index", {blogs : blogs});
        }
    });

});
//new file
app.get("/blogs/new", function(req, res){
    res.render("new");
});
//create news
app.post("/blogs", function(req, res){
    blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else {
            res.redirect("/blogs");
        }

    })
});
//show file
app.get("/blogs/:id", function(req, res){
   blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");

       }else{
           res.render("show", {blog : foundBlog});
       }
   });
});
//edit file
app.get("/blogs/:id/edit", function(req, res){
    blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog : foundBlog});
        }
    });
});
//update
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
   blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/" + req.params.id);
       }
   })
});
//delete
app.delete("/blogs/:id", function(req, res){
    blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else {
            res.redirect("/blogs");
        }

    });
});

app.listen(9999, function(){
    console.log('Server is running!!!')
});