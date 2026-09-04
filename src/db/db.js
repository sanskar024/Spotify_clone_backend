const mongoose = require('mongoose');
const dotenv = require('dotenv');
async function connectDB() {
try {
    const mongoose=await mongoose.connect(process.env.DB_URL) 
console.log('Database connected successfully');
}
catch (error) {
    console.log(error);}
}
dotenv.config();
module.exports = connectDB;