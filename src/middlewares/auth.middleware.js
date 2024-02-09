const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHadler');
const apiError = require('../utils/apiError');
const User = require('../models/user.model');

const verifyJWT = asyncHandler(async (req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header('Authorization');

        if(!token){
            throw new apiError(400, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user =await User.findById(decodedToken._id).select("-password -refreshToken");

        if(!user){
            throw apiError(401,'Invalid access token');
        }

        req.user = user
        next()



    } catch (error) {
        throw new apiError(401,"Invalid Access Token")
    }
})

module.exports = verifyJWT