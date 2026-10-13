const express = require('express')
const router =express.Router()
const {getUsers,createUser, getUserbyId,updateUser,deleteUser,login,checkUser}= require("../controllers/userController")
const validateUser = require("../middlewares/validateUser")
const validateToken = require("../middlewares/authMiddleware")
const authorize = require("../middlewares/authorize")

//check user is loggedin
router.get('/checkUser',validateToken,checkUser)

//Get all users
router.get("/",validateToken,authorize("admin"), getUsers)
router.post("/",validateUser,createUser)
// get single user
router.get("/:id",getUserbyId)
//Update user
router.put("/:id",updateUser)
//delete user
router.delete("/:id",deleteUser)
//login
router.post("/login",login)
//register
router.post("/register",createUser)
module.exports=router