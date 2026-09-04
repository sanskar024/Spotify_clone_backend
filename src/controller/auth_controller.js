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
async function loginuser(req,res){
    const {email,username,password}=req.body;
    const user=await userModel.findOne({$or:[{email},{username}]});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    if(user.password!==password){
        return res.status(400).json({message:"Invalid password"});
    }
    const token=jsonwebtoken.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    const cokkie=res.cookie('token',token,{httpOnly:true,maxAge:3600000});
    return res.status(200).json({message:"User logged in successfully",user:user});
}
module.exports={registerUser,loginuser};