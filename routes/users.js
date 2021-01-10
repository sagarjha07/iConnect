const express=require("express");
const router=express.Router();
const passport=require("passport");

const usersContoller=require("../controllers/users_controllers");

router.get("/profile",passport.checkAuthentication,usersContoller.profile);

router.get("/sign-up",usersContoller.signUp);
router.get("/sign-in",usersContoller.signIn);

router.post('/create',usersContoller.create);

// use passport as a middleware to authenticate
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersContoller.createSession);

router.get("/sign-out",usersContoller.destroySession);

module.exports=router;