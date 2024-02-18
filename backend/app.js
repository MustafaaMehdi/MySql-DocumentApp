const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connection = require('./lib/connect.js')
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const documentRouter = require('./routes/document');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/document', documentRouter);

module.exports = app;
