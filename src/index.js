import axios from 'axios';
import fs from 'fs';
import path from 'path';
import os from 'os';
import Promise from 'bluebird';

import { Report, Patient, Drug, Reaction } from './models';
import { mapDataToModels } from './helper';

require('dotenv').config();

const dataFile = path.join(__dirname, '../.data');
const logFile = path.join(__dirname, '../.log');

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ limit: 100, skip: 0 }));
}

const checkpoint = JSON.parse(fs.readFileSync(dataFile));

axios.request({
  url: 'https://api.fda.gov/drug/event.json',
  method: 'get',
  params: { api_key: process.env.API_KEY, ...checkpoint },
}).then(({ data }) => {
  const { results: reports } = data;

  return Promise.all(
    reports.map(report => (
      Report.create(
        mapDataToModels(report),
        {
          include: [
            { model: Patient, as: 'patient' },
            { model: Drug, as: 'drugs' },
            { model: Reaction, as: 'reactions' },
          ]
        })
      ))
  );
}).catch(({ name, message }) => {
  fs.appendFile(logFile, `${name}: ${message}${os.EOL}`);
}).then(() => {
  checkpoint.skip += checkpoint.limit;
  fs.writeFileSync(dataFile, JSON.stringify(checkpoint));
});
