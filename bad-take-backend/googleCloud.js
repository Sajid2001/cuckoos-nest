const {Storage} = require('@google-cloud/storage');
const Multer = require("multer");
const fs = require('fs')
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
  });
  

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
const keyFilename = process.env.GOOGLE_CLOUD_KEY_FILENAME
const storage = new Storage({
    projectId,
    keyFilename,
  });

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET)


async function uploadFileToCloudStorage(file) {
    try {
      const filename = `${file.originalname}`;
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream();
      

      blobStream.on("finish", () => {
        console.log("Success");
      });
      blobStream.end(file.buffer);
  
      const url = `https://storage.googleapis.com/${bucket.name}/${filename}`;
  
      return url;
    } catch (error) {
      console.error('Error uploading file to Google Cloud Storage:', error);
      throw new Error('Error uploading file to Google Cloud Storage');
    }
  }

  async function deleteFileFromCloudStorage(url) {
    try {
      // Extract the bucket name and file path from the URL
      const urlParts = url.split('/');
      const bucketName = urlParts[3];
      const filePath = urlParts.slice(4).join('/');
  
      // Create a reference to the file in the bucket
      const file = storage.bucket(bucketName).file(filePath);
  
      // Delete the file
      await file.delete();
  
      console.log('File deleted successfully.');
    } catch (error) {
      console.error('Error deleting file from Google Cloud Storage:', error);
      throw new Error('Error deleting file from Google Cloud Storage');
    }
  }


  module.exports = { uploadFileToCloudStorage,deleteFileFromCloudStorage, multer }
