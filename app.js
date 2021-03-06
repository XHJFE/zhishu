var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let log4js = require('log4js');
log4js.configure(require('./log4js.json'));
let log = log4js.getLogger('app');
let config = require('./config.json');
let _ = require('underscore');

var adapt = require('./routes/adapt');
var routes = require('./routes/index');
var apiRouter = require('./routes/api');
var apiCombRouter = require('./routes/comb');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/**', adapt);
app.use('/', routes);
app.use('/api', apiRouter);
app.use('/comb', apiCombRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        log.error(err.message);
        res.status(err.status || 500);
        if (config.base.env === 'dev') {
            res.render('error', _.extend({
                message: err.message,
                error: err
            }, config.base));
        }
        else {
            res.render('err', _.extend({
                message: err.message,
                error: {}
            }, config.base));
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    log.error(err.message);
    res.status(err.status || 500);
    if (config.base.env === 'dev') {
        res.render('error', _.extend({
            message: err.message,
            error: {}
        }, config.base));
    }
    else {
        res.render('err', _.extend({
            message: err.message,
            error: {}
        }, config.base));
    }
});


module.exports = app;
