const express= require('express');
const jsonwebtoken= require('jsonwebtoken');
const app= express();
const userModel= require('../model/user_model');


async function registerUser(req,res){
  const   {username,email,password,role="user"}=req.body;
  const isUserExist= await userModel.findOne({
    $or:[{email},{username}],
}
);
if (isUserExist){ 
    return res.status(400).json({message:"User already exists"});   }
try{
    const newUser= await userModel.create({
        username,
        email,  
        password,   
    })
    const token= jsonwebtoken.sign({id:newUser._id,role:newUser.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.status(201).json({message:"User registered successfully", user: newUser,token:token});
}
catch (error){
    res.status(500).json({message:"Internal server error"});
}



}