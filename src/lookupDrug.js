import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { EOL } from 'os';
import axios from 'axios';
import uuid from 'uuid';
import Promise from 'bluebird';
import { Drug, Substance } from './models';

require('dotenv').config();

const [drugId] = process.argv[2].match(
  /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/);
console.log(`...Processing ${drugId}`);

const apiEndpoint = 'https://api.fda.gov/drug/label.json';
const apiKey = _.sample(process.env.API_KEY.split(','));
const logFile = path.join(__dirname, '..', 'data', '.log');

function lookupSplId(splId) {
  const query = `search=id:${splId}&limit=1&api_key=${apiKey}`;
  return axios
    .get(encodeURI(`${apiEndpoint}?${query}`))
    .catch(error => fs.appendFileSync(logFile, `${splId}: ${error.message}${EOL}`));
}

function lookupDrugname(drugName) {
  const name = drugName
    .toLowerCase()
    .replace(/[^A-Za-z0-9\s]/g, '')
    .split(/([0-9]+(\.[0-9]+)?)/)
    .shift()
    .trim()
    .replace(/\s+/g, '+');

  return Promise.all([
    axios
      .get(encodeURI(`${apiEndpoint}?search=generic_name:${name}&limit=1&api_key=${apiKey}`))
      .catch(error => fs.appendFileSync(logFile, `${name}: ${error.message}${EOL}`)),
    axios.get(encodeURI(`${apiEndpoint}?search=brand_name:${name}&limit=1&api_key=${apiKey}`))
      .catch(error => fs.appendFileSync(logFile, `${name}: ${error.message}${EOL}`)),
  ]).then(([generic, brand]) => {
    if (brand) {
      return brand;
    }

    return generic;
  });
}

Drug.findOne({
  where: { id: drugId }
}).then((drug) => {
  if (!drug) {
    throw new Error('Drug not found');
  }
  const { openfda, medicinalProduct } = drug;
  if (openfda) {
    return lookupSplId(openfda[0]);
  }

  return lookupDrugname(medicinalProduct);
}).then((response) => {
  if (response.data) {
    const { substance_name: substances } = response.data.results[0].openfda;

    return Substance.bulkCreate(
      substances.map(substance => ({
        id: uuid.v1(),
        drugId,
        substance: substance.toLowerCase(),
      })));
  }

  throw new Error('Empty response data');
}).catch(error => fs.appendFileSync(logFile, `${error.message}${EOL}`));
