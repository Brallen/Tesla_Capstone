let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const teslajs = require('teslajs');

let app = express();

var options = {
  authToken:"fakeTokenLaLaLa",
  vehicleID:"vehicle1LaLaLa",
  carIndex:0
};
var fakePassword = "password";

//app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + 'Assets'));
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
	console.log("unlock command received");
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

app.get('/flashLights', function(req, res){
  console.log("Requesting 'flash lights'");
  var promise =  teslajs.flashLightsAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response)
  });
});

app.get('/startEngine', function(req, res){
  console.log("Remotely starting engine");
  var promise = teslajs.remoteStartAsync(options, fakePassword);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
  })
});

app.get('/toggleMusic', function(req, res){
  console.log("Toggling Music");
  var promise = teslajs.mediaTogglePlaybackAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.get('/nextSong', function(req, res){
  console.log("Calling next song");
  var promise = teslajs.mediaPlayNextAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.get('/prevSong', function(req, res){
  console.log("Calling previous song");
  var promise = teslajs.mediaPlayPreviousAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.get('/volumeUp', function(req,res){
  console.log("Turning volume up");
  var promise = teslajs.mediaVolumeUpAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});
app.get('/volumeDown', function(req,res){
  console.log("Turning volume down");
  var promise = teslajs.mediaVolumeDownAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

//for both trunk & frunk
app.post('/openTrunk', function(req, res){
  var which = req.body.which;
  console.log("which: " + which);
  console.log("Requesting 'open" + which + "'");
  var promise =  teslajs.openTrunkAsync(options, which);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response)
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
