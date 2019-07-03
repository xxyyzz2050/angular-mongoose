import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import mongoose from 'mongoose';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y'
  })
);

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  bufferCommands: false,
  autoIndex: false,
  retryWrites: true
};

const auth = 'xxyyzz2050:Xx159753%40%40';
const uri = `mongodb://${auth}@cluster-test-shard-00-00-kuwit.gcp.mongodb.net:27017,cluster-test-shard-00-01-kuwit.gcp.mongodb.net:27017,cluster-test-shard-00-02-kuwit.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster-test-shard-0&authSource=admin&retryWrites=true&w=majority`;
const uri_srv = `mongodb+srv://${auth}@cluster-test-kuwit.gcp.mongodb.net/test?retryWrites=true&w=majority`;

function connect(res, srv) {
  // close the connection before re-connecting, to avoid MongooseError: You can not `mongoose.connect()` multiple times while connected.
  mongoose.connection.close();
  console.log('connecting.....');
  mongoose
    .connect(
      srv ? uri_srv : uri,
      options
    )
    .then(db => {
      console.log('connected');
      res.json({ test: 'mongoose' + srv ? '-srv' : '' });
    })
    .catch(err => {
      console.log('err:', err);
      res.json({ test: 'error' + srv ? '-srv' : '' });
    });
}
// without srv
app.get('/mongoose', (req, res) => {
  connect(
    res,
    false
  );
});

// using srv
app.get('/mongoose-srv', (req, res) => {
  connect(
    res,
    true
  );
});

app.get('*', (req, res) => {
  res.json({ test: 'ok' });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
