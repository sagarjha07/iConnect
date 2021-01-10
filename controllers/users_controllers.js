const User=require("../models/user");

module.exports.profile=function(req,res){
    return res.render("user_profile.ejs",{
        title:"iConnect"
    });
};

//rendering sign up
module.exports.signUp=function(req,res){
    return res.render("user_sign_up",{
        title:"iConnect | Sign Up"
    });
};

//rendering sign in
module.exports.signIn=function(req,res){
    return res.render("user_sign_in",{
        title:"iConnect | Sign In"
    });
};

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect("back");
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in Sign Up");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user Sign Up");
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect("back");
        }
    });
};

//get the sign in data and create a seesion for the user
module.exports.createSession=function(req,res){
    
};