const cloudinary = require('cloudinary').v2
const fs = require('fs');
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME , 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath)=>{
  try {
    if(!localFilePath) return null

    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type: "auto"
    })

    // file has successfully uploaded on cloudinary
    console.log('file is uploaded on cloudinary',response.url);
    return response

  } catch (error) {
      fs.unlinkSync(localFilePath); //to remover locally saved file on server
      return null
  }
}

module.exports = uploadOnCloudinary