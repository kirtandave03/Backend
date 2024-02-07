const asyncHandler = require('../utils/asyncHadler');

const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message : 'Kirtan Dave'
    })
})

module.exports = registerUser;