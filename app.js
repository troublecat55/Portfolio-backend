import express from 'express';
import chalk from 'chalk';
import * as path from 'path';
// import path from 'path';
const __dirname = path.resolve();
import mongoose from 'mongoose';
import bodyParser from'body-parser';
import Debug from "debug";
const debug = Debug("app");



// const preworkRouter = require('./src/routes/preworkRoutes');
import preworkRoutes from './src/routes/preworkRoutes.js'

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').parse()
// }

const app = express();
const PORT = process.env.PORT || 3000;
// import i18next from 'i18next';
// import i18nextMiddleware from'i18next-express-middleware';
// import Backend from 'i18next-node-fs-backend';

// i18next
// .use(Backend)
// .use(i18nextMiddleware.LanguageDetector)
// .init({
//   backend: {
//     loadPath: __dirname + '/src/locales/{{lng}}/{{ns}}.json',
//   },
//   detection: {
//     order: ['querystring', 'cookie'],
//     caches: ['cookie']
//   },
//   fallbackLng: 'en',
//   preload: ['en', 'zh-TW']
// });


app.use(express.static(path.join(__dirname, '/public/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/css/')));


//template engine setup
app.set('views', path.join(__dirname, '/src/views/html'));
app.set('view engine', 'ejs');

 //mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => debug('Connected to Mongoose'))

//body parser setup
app.use(bodyParser.urlencoded({extended: false, limit:'10mb'}));
app.use(bodyParser.json());

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
//   "PORT": 4000,
//   "DATABASE_URL": "mongodb://localhost/PORTFOLIOdb"
// }

// "start": "set DEBUG=app & nodemon app.js --exec babel-node -e js"