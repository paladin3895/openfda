import fs from 'fs';
import path from 'path';
import os from 'os';
import zlib from 'zlib';
import AWS from 'aws-sdk';
// import Promise from 'bluebird';

// import { Report, Patient, Drug, Reaction, Substance } from './models';
// import { mapDataToModels } from './helper';

const logFile = path.join(__dirname, '../.log');

require('dotenv').config();

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  httpOptions: { timeout: 300000 },
});

const s3 = new AWS.S3(config);
const filename = process.argv[2];

s3.getObject({
  Bucket: 'foxience',
  Key: `openfda.adr/${filename}`,
}, (err, data) => {
    // Handle any error and exit
  if (err) {
    const { message } = err;
    fs.appendFile(logFile, `Unable to get data: ${message}${os.EOL}`);
    return;
  }

  const reports = JSON.parse(zlib.unzipSync(data.Body).toString());

  reports.forEach((report) => {

  });
});
