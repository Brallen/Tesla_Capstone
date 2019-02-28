let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const teslajs = require('teslajs');

let app = express();

/*/var options= {
  authToken:"fakeTokenLaLaLa",
  vehicleID:"vehicle1LaLaLa",
  carIndex:0
};/*/
var fakePassword = "password";

//app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + 'Assets'));
app.use(express.static(path.join(__dirname, 'Assets')));

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/main', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/lock', function(req, res){
  var options = req.body.auth;
  var burt = req.body.me;
  console.log("Me: " + burt);
  console.log("options variable: " + options);
	console.log("Requesting 'lock door'");
	var promise = teslajs.doorLockAsync(options);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
});

app.post('/unlock', function(req, res){
  var options = req.body.auth;
	console.log("Requesting 'unlock door'");
	var promise = teslajs.doorUnlockAsync(options);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
});

app.post('/opensunroof', function(req, res){
  var options = req.body.auth;
  console.log("Requesting 'open sunroof'");
	var promise = teslajs.sunRoofControlAsync(options, "vent");
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
});

app.post('/closesunroof', function(req, res){
  var options = req.body.auth;
	console.log("Requesting 'close sunroof'");
	var promise = teslajs.sunRoofControlAsync(options, "close");
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
});

app.post('/chargelimit', function(req, res){
  var options = req.body.auth;
  var value = req.body.value;
	console.log("Requesting 'set charge limit to " + value + "'");
	var promise = teslajs.setChargeLimitAsync(options, value);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
});

app.post('/honk', function(req, res){
  var options = req.body.auth;
	console.log("Requesting 'honk horn'");
	var promise = teslajs.honkHornAsync(options);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
});

app.post('/openchargeport', function(req, res){
  var options = req.body.auth;
	console.log("Requesting 'open charge port'");
	var promise = teslajs.openChargePortAsync(options);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
});

app.post('/closechargeport', function(req, res){
  var options = req.body.auth;
	console.log("Requesting 'close charge port'");
	var promise = teslajs.closeChargePortAsync(options);
	promise.catch(function(response){
		console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
	});
});

app.post('/flashLights', function(req, res){
  var options = req.body.auth;
  console.log("Requesting 'flash lights'");
  var promise =  teslajs.flashLightsAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response)
  });
});

app.post('/climateOn', function(req, res){
  var options = req.body.auth;
  console.log("Requesting 'climate control on'");
  var promise =  teslajs.climateStartAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response)
  });
});

app.post('/climateOff', function(req, res){
  var options = req.body.auth;
  console.log("Requesting 'climate control off'");
  var promise =  teslajs.climateStopAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/startEngine', function(req, res){
  var options = req.body.auth;
  console.log("Remotely starting engine");
  var promise = teslajs.remoteStartAsync(options, fakePassword);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
		res.send("Tesla Response: " + response);
  });
});

app.post('/toggleMusic', function(req, res){
  var options = req.body.auth;
  console.log("Toggling Music");
  var promise = teslajs.mediaTogglePlaybackAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/nextSong', function(req, res){
  var options = req.body.auth;
  console.log("Calling next song");
  var promise = teslajs.mediaPlayNextAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/prevSong', function(req, res){
  var options = req.body.auth;
  console.log("Calling previous song");
  var promise = teslajs.mediaPlayPreviousAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/volumeUp', function(req,res){
  var options = req.body.auth;
  console.log("Turning volume up");
  var promise = teslajs.mediaVolumeUpAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});
app.post('/volumeDown', function(req,res){
  var options = req.body.auth;
  console.log("Turning volume down");
  var promise = teslajs.mediaVolumeDownAsync(options);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

//for both trunk & frunk
app.post('/openTrunk', function(req, res){
  var options = req.body.auth;
  var which = req.body.which;
  console.log("which: " + which);
  console.log("Requesting 'open" + which + "'");
  var promise =  teslajs.openTrunkAsync(options, which);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/setTemp', function(req, res){
  var options = req.body.auth;
  var tempC = req.body.temp;
  console.log("Requesting 'temp set to " + tempC + "'");
  //setting same temp for Driver & Passenger
  var promise =  teslajs.setTempsAsync(options, tempC, tempC);
  promise.catch(function(response){
    console.log("Tesla Response: " + response + ", temp set to: " + Math.round(tempC * (9/5) + 32) + "F");
    res.send("Tesla Response: " + response + ", temp set to: " + Math.round(tempC * (9/5) + 32) + "F");
  });
});

//setting seat heating temp for [seat] at [level]
app.post('/seatHeating', function(req, res){
  var options = req.body.auth;
  var seat = req.body.seat;
  var level = req.body.level;
  console.log("Requesting 'seat " + seat + " to be heated to level " + level + "'");
  var promise =  teslajs.seatHeaterAsync(options, seat, level);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/login', function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  console.log("Requesting 'login to " + email + "'s account'");
  console.log(password);
  var promise =  teslajs.loginAsync(email, password);
  promise.catch(function(response){
    console.log("Tesla Response: " + response);
    //console.log("Returned Token: " + authToken);
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
