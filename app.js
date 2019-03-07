let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const teslajs = require('teslajs');
let bodyParser = require('body-parser');

//let port = process.env.PORT || 5000;
let app = express();

//app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(__dirname + 'Assets'));
app.use(express.static(path.join(__dirname, 'Assets')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/lock', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'lock door'");
  console.log("options: " + options);
  var promise = teslajs.doorLockAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/unlock', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'unlock door'");
  var promise = teslajs.doorUnlockAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/opensunroof', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'open sunroof'");
  var promise = teslajs.sunRoofControlAsync(options, "vent");
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/closesunroof', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'close sunroof'");
  var promise = teslajs.sunRoofControlAsync(options, "close");
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/chargelimit', function (req, res) {
  var options = req.body.auth;
  var value = req.body.value;
  console.log("Requesting 'set charge limit to " + value + "'");
  var promise = teslajs.setChargeLimitAsync(options, value);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/honk', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'honk horn'");
  var promise = teslajs.honkHornAsync(JSON.parse(options));
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/openchargeport', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'open charge port'");
  teslajs.openChargePortAsync(JSON.parse(options)).done(function (result) {
    console.log("got response" + result);
    res.send(result);
  });
  /*promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });*/
});

app.post('/closechargeport', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'close charge port'");
  teslajs.closeChargePortAsync(JSON.parse(options)).done(function (result) {
    console.log("got response" + result);
    res.send(result);
  });
  /*promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });*/
});

app.post('/flashLights', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'flash lights'");
  console.log("options: " + JSON.stringify(options));
  var promise = teslajs.flashLightsAsync(JSON.parse(options));
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response)
  });
});

app.post('/climateOn', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'climate control on'");
  var promise = teslajs.climateStartAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response)
  });
});

app.post('/climateOff', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting 'climate control off'");
  var promise = teslajs.climateStopAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/startEngine', function (req, res) {
  var options = req.body.auth;
  var password = req.body.pass;
  console.log("Remotely starting engine");
  var promise = teslajs.remoteStartAsync(options, password);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/volumeUp', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting volume up");
  var promise = teslajs.mediaVolumeUpAsync(JSON.parse(options));
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/volumeDown', function (req, res) {
  var options = req.body.auth;
  console.log("Requesting volume down");
  var promise = teslajs.mediaVolumeDownAsync(JSON.parse(options));
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/toggleMusic', function (req, res) {
  var options = req.body.auth;
  console.log("Toggling Music");
  var promise = teslajs.mediaTogglePlaybackAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/nextSong', function (req, res) {
  var options = req.body.auth;
  console.log("Calling next song");
  var promise = teslajs.mediaPlayNextAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/prevSong', function (req, res) {
  var options = req.body.auth;
  console.log("Calling previous song");
  var promise = teslajs.mediaPlayPreviousAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/volumeUp', function (req, res) {
  var options = req.body.auth;
  console.log("Turning volume up");
  var promise = teslajs.mediaVolumeUpAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/volumeDown', function (req, res) {
  var options = req.body.auth;
  console.log("Turning volume down");
  var promise = teslajs.mediaVolumeDownAsync(options);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

//for both trunk & frunk
app.post('/openTrunk', function (req, res) {
  var options = req.body.auth;
  var which = req.body.which;
  console.log("which: " + which);
  console.log("Requesting 'open" + which + "'");
  var promise = teslajs.openTrunkAsync(JSON.parse(options), which);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/setTemp', function (req, res) {
  var options = req.body.auth;
  var tempC = req.body.temp;
  console.log("Requesting 'temp set to " + tempC + "'");
  //setting same temp for Driver & Passenger
  var promise = teslajs.setTempsAsync(options, tempC, tempC);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response + ", temp set to: " + Math.round(tempC * (9 / 5) + 32) + "F");
    res.send("Tesla Response: " + response + ", temp set to: " + Math.round(tempC * (9 / 5) + 32) + "F");
  });
});

//setting seat heating temp for [seat] at [level]
app.post('/seatHeating', function (req, res) {
  var options = req.body.auth;
  var seat = req.body.seat;
  var level = req.body.level;
  console.log("Requesting 'seat " + seat + " to be heated to level " + level + "'");
  var promise = teslajs.seatHeaterAsync(options, seat, level);
  promise.catch(function (response) {
    console.log("Tesla Response: " + response);
    res.send("Tesla Response: " + response);
  });
});

app.post('/login', function (req, res) {

  var email = req.body.email;
  var password = req.body.password;

  console.log("Requesting 'login to " + email + "'s account'");
  console.log(password);

  //Should be using Async request as below, but async request won't catch.

  /*var promise = teslajs.loginAsync(email, password);
  promise.catch(function(response){
		console.log("AAAAA");
		console.log("Tesla Repsonse: " + response.response);
		if (typeof response.authToken === 'undefined') {
			console.log("Invalid credentials, entering test mode");
			res.send("faketoken");
		}
		else {
			console.log("Login successful");
			res.send(authToken);
		}
  });*/

  teslajs.login(email, password, function (err, result) {
    if (result.error) {
      console.log(JSON.stringify(result.error));
      process.exit(1);
    }

    console.log("Tesla Response: " + result.response.statusCode + ": " + result.body.response);

    if (typeof result.authToken === 'undefined') {
      console.log("Invalid credentials, entering test mode");
      res.send("faketoken");
    } else {
      console.log("Login successful");
      res.send(result.authToken);
    }
  });
});

app.post('/vehicleID', function (req, res) {
  var options = {
    authToken: req.body.authToken
  }
  console.log("Requesting 'vehicle' with token " + options.authToken);
  teslajs.vehicle(options, function (err, vehicle) {
    console.log(JSON.stringify(vehicle));
    if (vehicle === null) res.send("fakeID");
    else {
      res.send(vehicle);
    }
  });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
