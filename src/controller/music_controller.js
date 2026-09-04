const Music_model= require('../model/music_model');
const token= require('jsonwebtoken');
async function CreateMusic(req,res){

const token=req.cookies.token;
if(!token){
    return res.status(401).json({message:"Unauthorized"});}
try{
   const decoded= jwt.verify(token,process.env.JWT_SECRET);
  if(decoded.role!=="admin"){
    return res.status(403).json({message:"Forbidden"});
  }
}
    catch(error){
        return res.status(401).json({message:"Unauthorized"});
    
}

}