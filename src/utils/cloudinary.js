import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: "dlqofzsll",
  api_key: "117896837844537",
  api_secret: "mKOqPjXos2pYUCdm_OAv2hasyC4", // Click 'View API Keys' above to copy your API secret
});

// import fs from 'fs';
// import cloudinary from 'cloudinary';

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded on Cloudinary. File src: " + response.url);

    // Once the file is uploaded, delete it from the server
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Try to delete the file if an error occurs
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error("Failed to delete file:", unlinkError);
    }

    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

export default uploadOnCloudinary;

export { uploadOnCloudinary };
