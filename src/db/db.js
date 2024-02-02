const mongoose = require("mongoose");
const DB_NAME  = require("../constants.js");

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected !! DB host : ${connectionInstance.Connection.host}`);
    } catch (error) {
        console.error("Error : ",error);
        process.exit(1);
    }
}

module.exports =  connectDB;