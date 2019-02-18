let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let teslajs = require('teslajs');

let app = express();

var options = {
	authToken:"oilyconnoily",
	vehicleID:"heckinhonkin",
	carIndex:0
};

var isLocked = 0;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Assets')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/lock', function(req, res){
	console.log("lock command received");
	var promise = teslajs.doorLockAsync(options);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
}); 

app.get('/unlock', function(req, res){
	console.log("lock command received");
	var promise = teslajs.doorUnlockAsync(options);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
}); 

app.get('/honk', function(req, res){
	console.log("honk command received");
	var promise = teslajs.honkHornAsync(options);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
}); 

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
