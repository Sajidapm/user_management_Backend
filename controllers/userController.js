
//const users = require("../data/users")
const User = require("../models/user")
const generateToken = require("../utils/generateToken")
const bcrypt = require("bcrypt")

//get users
const getUsers = async(req, res) => {

    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }

}

//create user
const createUser = async(req,res)=>{
  const {name,gender,email} = req.body
  const saltRounds = 10
// const newUser ={
//     id:users.length>0? users[users.length-1].id+1:1,
//     name,
//     gender:gender.toLowerCase(),
//     email,
// }
//   users.push(newUser)
try {
    bcrypt.hash(password,saltRounds,async(err,hash)=>{
        if(err){
            return res.status(500).json({error:err.message})
        }

            const newUser = new User({name,
                email,
                gender,
                hash})

    const savedUser = await newUser.save()
  res.status(201).json({
    success:true,
    messag:"user created successfully",
    data:savedUser
  })


    })
}catch (error) {
        res.status(400).json({message:error.message
        })

}

}
  // /api/users/:id
const getUserbyId=async(req,res,next)=>{
    //const id = Number(req.params.id)
    // find user matching the id
  //  const user= users.find((user)=>user.id === id)
  const user = await User.findById(id)
    if(!user){
        const error = new Error("User not found")
        error.status =404
        return next(error)

    }
    res.status(200).json({
        success:true,
        data:user
    })


}
// put Update /api/users/:id
const updateUser =async(req,res,next)=>{
   //  const id = Number(req.params.id)
    // find user matching the id
  //  const userIndex= users.findIndex((user)=>user.id === id)
  try{
    const  updatedUser = await User.
    findByIdAndUpdate(req.params.id, req.body, 
        {new:true,runValidators:true})

             if(!updatedUser){
        const error = new Error("User not found")
        error.status =404
        return next(error)

    }
        res.status(200).json({
        success:true,
        message:"user updated",
        data:updatedUser
    })


  } catch(error){
  }
    // const {name,gender,email} = req.body
    // users[userIndex]={
    //     ...users[userIndex],
    //     name,
    //     gender:gender.toLowerCase(),
    //     email
    // }
}
//delete

const deleteUser =async(req,res,next)=>{
    //  const id = Number(req.params.id)
    // // find user matching the id
  //  const userIndex= users.findIndex((user)=>user.id === id)
  const deletedUser = await User.findByIdAndDelete(req.params.id)
    if(!userIndex == -1){
        const error = new Error("User not found")
        error.status =404
        return next(error)

    }
    
  //  const deleteUser =users.splice(userIndex,1)

    res.status(200).json({
        success:true,
        message:"user deleted",
        data:deleteUser
    })

}
const login=async(req,res,next)=>{
    try{
    if(!req.body){
        return res.status(400).json({error:"Login details cannot be empty"})

    }
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(404).json({error:"User not  found"})
    }
    const isValid=(password === user.password)
    if(!isValid){m
        return res.status(400).json({error:"Invalid credentials"})
    }
    //for valid user -create token
    let payload = {user:email,role:user.role}
    const token = generateToken(payload)
    res.cookie('token',token,{httpOnly:true,
        secure:false
    })
}
catch(error){
    console.log(error)
    res.status(500).json({error:"Internal server error"})
}
const checkUser = async(req,res,next)=>{
    return res.status(200).json({message:"user validate"})
}
}
module.exports = {
    getUsers,
    createUser,
    getUserbyId,
    updateUser,
    deleteUser,
    login,
    checkUser
}