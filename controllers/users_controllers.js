const { builtinModules } = require("module");

module.exports.profile=function(req,res){
    return res.render("user_profile.ejs",{
        title:"iConnect"
    });
}