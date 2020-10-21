const { S3 } = require('aws-sdk');
const convertToStream = require('into-stream');
const { v1: uuidv1 } = require('uuid');
const logger = require('./logger');

const s3 = new S3();
class S3Uploader {
  static getFileSize(fileSize) {
    return (fileSize.size / (1024 * 1024)).toFixed(2);
  }

  static getExtension(originalName) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(originalName)[1];
    return ext;
  }

  static upload(file, folderName) {
    return new Promise((resolve, reject) => {
      const fileStream = convertToStream(file.buffer);
      const originalName = file.originalname;
      const ext = this.getExtension(originalName);
      const blobName = folderName
        ? `${folderName}/${uuidv1()}.${ext}`
        : `${uuidv1()}.${ext}`;
      s3.upload({ Bucket: 's3bucketName', Key: blobName, Body: fileStream }, (err, data) => {
        if (err) {
          reject(err);
        } if (data) {
          logger.info(`Document was uploaded successfully. url: ${data.key}`);
          resolve(data);
        }
      });
    });
  }
}

module.exports = S3Uploader;
