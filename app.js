import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
require('dotenv').config();
var app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use('/images', express.static('images'));

indexRouter(app);
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
