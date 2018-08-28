var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");

User.create({
    email: "me@gmail.com",
    name: "Bob Bobberson"
});

Post.create({
    title: "How to cook 3",
    content: "blah blah blah blah nah nah nah"
}, function(err, post) {
    if (err) {
        console.log(err);
    } else {
        User.findOne({email: "me@gmail.com"}, function(err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data) {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log(data);
                  }
                });
            }
        })
        console.log(post);
    }
});

User.findOne({email: "me@gmail.com"}).populate("posts").exec(function(err, user) {
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});