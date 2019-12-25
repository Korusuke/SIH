const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const winston = require('./winston');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware functions
app.use(morgan('combined', { stream: winston.stream }));
app.use(cookieParser());
app.use(cors(
  //required for using withcredentials on front end
    {

      origin: process.env.CORS_ORIGIN,
      credentials: true,

    }

));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const uri = process.env.MONGODB_URI;
console.log(uri);
mongoose.connect(uri, {
    useNewUrlParser: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/delete', require('./routes/delete'));
app.use('/ps', require('./routes/problemStatement'));
app.use('/export', require('./routes/export.js'));
app.use('/team', require('./routes/team'));
app.use('/user', require('./routes/user'));
app.use('/', require('./routes/login'));
app.use('/forgotPassword', require('./routes/forgotPassword'));

app.use('/images', express.static(__dirname + '/storage/userphotos'));
app.use('/storage', express.static(__dirname + '/storage'));

const port = 8080;
app.listen(port, () => {
	console.log('Hey, listening on port %s', port);
});
