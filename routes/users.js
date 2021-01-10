const express=require("express");
const router=express.Router();

const usersContoller=require("../controllers/users_controllers");

router.get("/profile",usersContoller.profile);

router.get("/sign-up",usersContoller.signUp);
router.get("/sign-in",usersContoller.signIn);

router.post('/create',usersContoller.create);

module.exports=router;