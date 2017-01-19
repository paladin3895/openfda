import fs from 'fs';
import os from 'os';
import path from 'path';
import zlib from 'zlib';
import restify from 'restify';
import { acceptParser, queryParser, bodyParser } from 'restify-plugins';

const server = restify.createServer({
  name: 'Automation API',
  version: '1.0.0'
});

server.use(restify.CORS({
  origins: ['*'],
  credentials: true,                 // defaults to false
  methods: ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS']
}));

server.use(acceptParser(server.acceptable));
server.use(queryParser());
server.use(bodyParser());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  return next();
});

const dataDir = path.join(__dirname, '..', 'data', 'openfda.adr');

server.get('/openfda/adr', (req, res, next) => {
  const index = fs.readFileSync(path.join(dataDir, 'index')).toString().trim().split(os.EOL);
  res.send({
    status: 1,
    data: index,
  });
  next();
});

server.get('/openfda/adr/:id', (req, res, next) => {
  const block = fs.readFileSync(path.join(dataDir, req.params.id));
  res.send({
    status: 1,
    data: JSON.parse(zlib.unzipSync(block)),
  });
  next();
});

server.listen(8383, () => {
  console.log('%s listening at %s', server.name, server.url);
});
