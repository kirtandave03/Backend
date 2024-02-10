const asyncHandler = require('../utils/asyncHadler');
const apiError = require('../utils/apiError');
const apiResponse = require('../utils/apiResponse');
const User = require('../models/user.model');
const uploadOnCloudinary = require('../utils/cloudinary');

const generateAccessAndRefreshTokens = async (userId) =>{   
   try {
        const user = await User.findById(userId);
        const accessToken =  user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken};
   } catch (error) {
        throw new apiError(500,"Something went wrong while genarating Access and refresh Tokens");
   }

}

const registerUser = asyncHandler(async (req,res)=>{
   const {username, email, fullname, password} = req.body

   console.log("Request Body :",req.body);
   
   if([username, email, fullname, password].some((field)=>
    field?.trim() === "")){
        throw new apiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or : [{username},{email}]
    })

    if(existedUser){
        throw new apiError(409,"User with username or email already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath =req.files?.coverImage[0]?.path

    let coverImageLocalPath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    console.log("Request Files : ",req.files)

    if(!avatarLocalPath){
        throw new apiError(400,"Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new apiError(400,"Avatar is required")
    }

    const user = await User.create({
        username : username.toLowerCase(),
        email,
        fullname,
        password,
        avatar : avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new apiError(500, "Something went wrong while registering the user")
    }

    res.status(201).json(
        new apiResponse(200,createdUser,"User Created Sucessfully")
    )
})

const loginUser = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body;

    if(!username || !email){
        throw new apiError(400, "username or email ia required")
    }

   const user = await User.findOne({
        $or : [{username}, {email}]
    })

    if(!user){
        throw new apiError(404, "User not found")
    }

    const isPasswordValid = user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new apiError(400, "Invalid user credentials");
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const options = {
        httpOnly : true,
        secure : true
    }

    const loggedInuser = await User.findById(user._id).select("-password -refreshToken")
    return res.status(200)
    .cookie('accessToken',accessToken,options)
    .cookie('refreshToken',refreshToken, options)
    .json(
        new apiResponse(200,
            {
                user: loggedInuser,accessToken,refreshToken
            
            }
            ,"Login successfully")
    )
})

const logoutUser = asyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken : undefined
            }
        },
        {
            new : true
        })
        
    const options = {
        httpOnly : true,
        secure : true 
    }

    res.status(200)
    .clearCookie('accessToken',options)
    .clearCookie('refreshToken',options)
    .json(new apiResponse(200, {}, "User logged out"))
    
})

module.exports = { registerUser, loginUser, logoutUser };