const express=require("express");
const router=express.Router();

const usersContoller=require("../controllers/users_controllers");

router.get("/profile",usersContoller.profile);

module.exports=router;