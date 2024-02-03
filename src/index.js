require('dotenv').config();
const app = require('./app');
// const mongoose = require('mongoose');
// const DB_NAME = require('./constants.js')
const connectDB = require('./db/db');

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{console.log(`Server is running at port ${process.env.PORT}`)})
})
.catch((err)=>{console.log("MongoDB connection failed !!!",err)});


// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log("MongoDB is connected");
//     } catch (error) {
//         console.error("ERROR : ",error)
//     }
// })()