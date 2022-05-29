const fs = require('fs');
const cloudinary = require("cloudinary").v2;

// cloudinary configuration
cloudinary.config({ 
    cloud_name: 'dihq2mfsj', 
    api_key: '519415831796165', 
    api_secret: '3Sr8IIcw_g4AN-bVxSIFv7fuiaQ' 
  });

 const uploadToCloudinary = async (locaFilePath) => {
    // locaFilePath :
    // path of image which was just uploaded to "uploads" folder
  
    var mainFolderName = "main"
    // filePathOnCloudinary :
    // path of image we want when it is uploded to cloudinary
    var filePathOnCloudinary = mainFolderName + "/" + locaFilePath
  
    return cloudinary.uploader.upload(locaFilePath,{ "public_id": filePathOnCloudinary})
    .then((result) => {
      // Image has been successfully uploaded on cloudinary
      // So we dont need local image file anymore
      // Remove file from local uploads folder 
      fs.unlinkSync(locaFilePath)
      
      return {
        message: "Success",
        url: result.url
      };
    }).catch((error) => {
      // Remove file from local uploads folder 
      fs.unlinkSync(locaFilePath)
      return {message: "Fail",};
    });
  }
  

module.exports = uploadToCloudinary