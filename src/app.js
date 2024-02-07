const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express(); // express() method na through badhi properties app naam na variable ma transfer thase.

app.use(cors({
    origin: process.env.CORS_ORIGIN //khali apda frontend ne j allow karisu backend sathe interact karva mate

}))   // app.use method is used for middleware and configuration 

app.use(express.json({limit: '16kb'})); //json ne accept karisu 
app.use(express.urlencoded({limit: '16kb'})) //url mathi aavto encoded data mate nu configuration
app.use(express.static('public'));
app.use(cookieParser()); // server thi user na browser ni cookies pr CRUD operation karva

// import routes
const userRouter = require('./routes/user.routes')

//routes declaration
app.use('/api/v1/users',userRouter);

module.exports = app;