const express=require("express");
const cookieParser=require("cookie-parser");

const app=express();
const port=8000;
const expressLayouts=require("express-ejs-layouts");
const db=require("./config/mongoose");

//used for session cookie
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore=require("connect-mongo")(session);
const sassMiddleware=require("node-sass-middleware");
const flash=require("connect-flash");
const custoMware=require("./config/middleware");

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:"expanded",
    prefix:"/css"
}));

//for using post request data
app.use(express.urlencoded());

//use cookie parser
app.use(cookieParser());

app.use(express.static("./assets"));
//make the uploads path available for the browser
app.use("/uploads",express.static(__dirname+"/uploads"));
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);



//setting view engine 
app.set("view engine","ejs");
app.set("views","./views");

//mongo store is used to store the session cookie in the db


app.use(session({
    name:"iConnect",
    //TODO change the secret before deployment in production mode 
    secret:"sagarjha",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || "connect-mongodb setup OK");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//flash messages
app.use(flash());
app.use(custoMware.setFlash);

//use express router
app.use("/",require("./routes"));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});