const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost/iConnect_development');
 
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting to mongoDB"));

db.once("open",function(){
    console.log("connected to database :: MongoDB")
});

module.exports=db;