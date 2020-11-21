const {
  SERVER_PORT,
  DATABASE_URI,
  DB_NAME,
  I18N_COL_NAME
} = process.env;

import express from 'express';
import chalk from 'chalk';
import * as path from 'path';
// import path from 'path';
const __dirname = path.resolve();
import mongoose from 'mongoose';

import i18next from 'i18next';
import expressMiddleware_i18next from'i18next-express-middleware';
import Backend from 'i18next-node-mongo-backend';

import bodyParser from'body-parser';
import Debug from "debug";
const debug = Debug("app");

import preworkRoutes from './src/routes/preworkRoutes.js';

import {addNewWholePrework} from './src/controllers/initTranslation.js'

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').parse()
// }

const app = express();
const PORT = SERVER_PORT || 3000;


app.use(express.static(path.join(__dirname, '/public/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/css/')));

//template engine setup
app.set('views', path.join(__dirname, '/src/views/html'));
app.set('view engine', 'ejs');

 //mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const conn = mongoose.connection
conn.on('error', error => console.error(error))
conn.once('open', () => {
    debug('Connected to Mongoose');
    //auto add json into mongodb
    // addNewWholePrework() //<-----------need to add this back with condition
})


//body parser setup
app.use(bodyParser.urlencoded({extended: false, limit:'10mb'}));
app.use(bodyParser.json());


//I18n
i18next
.use(expressMiddleware_i18next.LanguageDetector)
.use(Backend)
.init({
  fallbackLng: 'en',
  backend: {
    uri:DATABASE_URI,
    dbName: DB_NAME,
    collectionName: I18N_COL_NAME,
      // MongoDB field name
    languageFieldName: 'lang',
    namespaceFieldName: 'ns',
    dataFieldName: 'data',
  },
});

app.use(
  expressMiddleware_i18next.handle(i18next, {
    // removeLngFromUrl: false
  })
);

//routes
// app.use('/pre-works',  preworkRouter);
preworkRoutes(app);

app.get('/', (req, res) => {
  debug(`Reqest from home received`);
  res.render('index');
  // res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => {
  debug(`Listen to port ${chalk.green(PORT)}`);
});



// "env": {
//   "NODE_ENV": "development",
//   "SERVER_PORT": 4000,
//   "DATABASE_URL": "mongodb://localhost/PORTFOLIOdb"
// }

// "start": "set DEBUG=app & nodemon app.js --exec babel-node -e js"