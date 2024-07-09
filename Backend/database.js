const mongoose  = require("mongoose");
require ("dotenv").config(); 
const mongoURL = process.env.Mongo_URL
const connectdb= async()=>{
    try{
        await mongoose.connect(mongoURL)
    }catch(err){
    }
}

module.exports = connectdb