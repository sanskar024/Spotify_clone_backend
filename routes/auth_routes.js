const express= require('express');
const routes= express.Router();

routes.post('/register', registerUser);
module.exports= routes;