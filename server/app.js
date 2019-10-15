var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var session = require('express-session');

var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customer');
var addressRouter = require('./routes/address');
var creditcardRouter = require('./routes/creditcard');

var app = express();

/*
app.use(session({
  secret: 'YunDaYeong',
  resave: false,
  saveUninitialized: true,   // 세션이 필요하기전까진 세션을 실행하지 않겠다
  //store : new FileStore()    // 서버가 종료가 되더라도 사라지지 않고 계속 저장되어있다.
}))*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/address', addressRouter);
app.use('/creditcard', creditcardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
