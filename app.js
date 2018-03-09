var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config/jwt-conf');
var jwt    = require('jsonwebtoken');

var index = require('./routes/index');
var db = require('./config/db.js').cn;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', config.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: 'http://localhost:3000'}));

app.use('/', index);


app.post('/login', function (req, res, next) {
    console.log(req.body);
    db.query('SELECT * from users where email = ?',[req.body.email], function (err, rows, fields) {
        if(err) throw err;

        if(rows.length <= 0) {
            console.log('user not found');
            res.json({
                status: false,
                message: 'User not found, please check your creds.'
            });
            return false;
        }

        let password = req.body.password;

        if(password == rows[0].password) {
            const payload = {
                user: rows[0].email
            };

            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: 1440 // expires in 24 hours
            });

            res.json({
                status: true,
                message: 'Welcome',
                user: rows[0],
                token: token
            });

        }else {
            res.json({
               status: false,
               message: 'User not found, please check your creds.'
            });
        }
    })
})

app.get('/all_users', function (req, res, next) {
    db.query('SELECT * from users', function (err, rows, fields) {
        if(err) throw err;

        res.send(rows)
    })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
