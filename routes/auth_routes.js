const express= require('express');
const authController= require('../src/controller/auth_controller');
const authroutes= express.Router();

authroutes.post('/register', authController.registerUser);
authroutes.post('/login', authController.loginuser);
module.exports= authroutes;