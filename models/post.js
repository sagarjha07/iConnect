const { Mongoose } = require("mongoose")
const mongoose=require("mongoose");
// const User=require("./user");

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:true
});

const Post=new mongoose.model("Post",postSchema);

module.exports=Post;