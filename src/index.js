require('dotenv').config();
// const mongoose = require('mongoose');
// const DB_NAME = require('./constants.js')
const connectDB = require('./db/db');

connectDB()


// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log("MongoDB is connected");
//     } catch (error) {
//         console.error("ERROR : ",error)
//     }
// })()