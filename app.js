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
    var promise = teslajs.doorLockAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/unlock', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'unlock door'");
    var promise = teslajs.doorUnlockAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/opensunroof', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'open sunroof'");
    var promise = teslajs.sunRoofControlAsync(JSON.parse(options), "vent");
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/closesunroof', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'close sunroof'");
    var promise = teslajs.sunRoofControlAsync(JSON.parse(options), "close");
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/chargelimit', function (req, res) {
    var options = req.body.auth;
    var value = req.body.value;
    console.log("Requesting 'set charge limit to " + value + "'");
    var promise = teslajs.setChargeLimitAsync(JSON.parse(options), value);
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/honk', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'honk horn'");
    var promise = teslajs.honkHornAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/openchargeport', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'open charge port'");
    var promise = teslajs.openChargePortAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/closechargeport', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'close charge port'");
    teslajs.closeChargePortAsync(JSON.parse(options))
        .then(function (result) { //success
            console.log("Successful Response: " + result);
            res.status(200).send(result);
        }).catch(function (err) { //error
            console.log("Error: " + err);
            res.status(400).send(err);
        });
});

app.post('/flashLights', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'flash lights'");
    console.log("options: " + JSON.stringify(options));
    var promise = teslajs.flashLightsAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/climateOn', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'climate control on'");
    var promise = teslajs.climateStartAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/climateOff', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting 'climate control off'");
    var promise = teslajs.climateStopAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/startEngine', function (req, res) {
    var options = req.body.auth;
    var password = req.body.pass;
    console.log("Remotely starting engine");
    var promise = teslajs.remoteStartAsync(JSON.parse(options), password);
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/volumeUp', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting volume up");
    var promise = teslajs.mediaVolumeUpAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/volumeDown', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting volume down");
    var promise = teslajs.mediaVolumeDownAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/toggleMusic', function (req, res) {
    var options = req.body.auth;
    console.log("Toggling Music");
    var promise = teslajs.mediaTogglePlaybackAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/nextSong', function (req, res) {
    var options = req.body.auth;
    console.log("Calling next song");
    var promise = teslajs.mediaPlayNextAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/prevSong', function (req, res) {
    var options = req.body.auth;
    console.log("Calling previous song");
    var promise = teslajs.mediaPlayPreviousAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/volumeUp', function (req, res) {
    var options = req.body.auth;
    console.log("Turning volume up");
    var promise = teslajs.mediaVolumeUpAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/volumeDown', function (req, res) {
    var options = req.body.auth;
    console.log("Turning volume down");
    var promise = teslajs.mediaVolumeDownAsync(JSON.parse(options));
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

//for both trunk & frunk
app.post('/openTrunk', function (req, res) {
    var options = req.body.auth;
    var which = req.body.which;
    console.log("which: " + which);
    console.log("Requesting 'open" + which + "'");
    if (which.toUpperCase() == "FRUNK") {
        which = teslajs.FRUNK;
    } else {
        which = teslajs.TRUNK;
    }
    var promise = teslajs.openTrunkAsync(JSON.parse(options), which);
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

app.post('/setTemp', function (req, res) {
    var options = req.body.auth;
    var tempC = req.body.temp;
    console.log("Requesting 'temp set to " + tempC + "'");
    //setting same temp for Driver & Passenger
    var promise = teslajs.setTempsAsync(options, tempC, tempC);
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        console.log("Temp set to: " + Math.round(tempC * (9 / 5) + 32) + "F");
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });

});

//setting seat heating temp for [seat] at [level]
app.post('/seatHeating', function (req, res) {
    var options = req.body.auth;
    var seat = req.body.seat;
    var level = req.body.level;
    console.log("Requesting 'seat " + seat + " to be heated to level " + level + "'");
    var promise = teslajs.seatHeaterAsync(JSON.parse(options), seat, level);
    promise.then(function (result) { //success
        console.log("Successful Response: " + result);
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

/**** Getting State Calls ****/
app.post('/vehicleData', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting full vehicle state");
    teslajs.vehicleDataAsync(JSON.parse(options))
        .then(function (vehicleData) {
            console.log("Vehicle data received");
            console.log(vehicleData);
            res.send(vehicleData);
        }).catch(function (err) {
            console.log("Tesla Response: " + err);
            res.send("I_got_nothin");
        });
});

app.post('/wakeup', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting vehicle wake-up");

    //Async request won't catch

    /*teslajs.wakeUpAsync(JSON.parse(options))
        .then(function(response) {
            console.log("Tesla Response: " + response);
            res.send("Tesla Response: " + response);
        }).catch(function(err) {
            console.log("Tesla Response: " + response);
            res.send("Tesla Response: " + response);
        });*/

    teslajs.wakeUp(JSON.parse(options), function (err, result) {
        if (err) {
            console.log("Tesla Response: " + err);
            res.send("Tesla Response: " + err);
        } else {
            console.log("Tesla Response: " + result);
            res.send("Tesla Response: " + result);
        }
    });
});

app.post('/login', function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    console.log("Requesting 'login to " + email + "'s account'");

    //Async request won't catch.

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