const User=require("../models/user");
const fs=require("fs");
const path=require("path");

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render("user_profile.ejs",{
            title:"iConnect",
            profile_user:user
        });
    });
};

module.exports.update=async function(req,res){
    try{
        if(req.user.id==req.params.id){
            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("Multer error ****",err);
                    return;
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                    }

                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath+"/"+req.file.filename;
                }
                user.save();
                return res.redirect("back");
            });
            
        }
        else{
            req.flash("error","Unauthorized");
            return res.status(401).send("Unauthorized");
        }
    }catch(err){
        req.flash("error",err);
        return res.redirect("back");
    }
    
}

//rendering sign up
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }

    return res.render("user_sign_up",{
        title:"iConnect | Sign Up"
    });
};

//rendering sign in
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
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
    req.flash("success","Logged in Successfully");
    return res.redirect("/");
};

module.exports.destroySession=function(req,res){
    req.logout(); 
    req.flash("success","You have Logged out!");
    
    return res.redirect("/");
};