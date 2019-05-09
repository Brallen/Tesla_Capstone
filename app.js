let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const teslajs = require('teslajs');
const WS13 = require('websocket13');
let bodyParser = require('body-parser');

let port = process.env.PORT || 3001;
let app = express();
var testMode = false;

app.use(express.static(path.join(__dirname, 'tesla-client/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//websocket for autopark/summon
let ws = new WS13.WebSocket("wss://streaming.vn.teslamotors.com/streaming/");

//var ws;

//websocket message handlers
ws.on('connected', function() {
	console.log('*** WebSocket Connected to wss://streaming.vn.teslamotors.com/streaming/');
  /*ws.send(JSON.stringify({
		"tag": "vehicle_18fbvbvbv",
		"token": "redacted",
		"value": "shift_state,speed,power,est_lat,est_lng,est_heading,est_corrected_lat,est_corrected_lng,native_latitude,native_longitude,native_heading,native_type,native_location_supported",
		"msg_type": "data:subscribe"
	}));*/
});

ws.on('message', (type, data) => {
  console.log('*** WebSocket Message recieved: ');
	console.log(data.toString('utf8'));
});

ws.on('disconnected', function() {
	console.log('*** WebSocket Disconnected to wss://streaming.vn.teslamotors.com/streaming/');
	console.log(arguments);
});

ws.on('error', function(err){
  console.log('*** WebSocket Error Recieved: ');
  console.log(err);
})

//app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

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
    var promise = teslajs.setChargeLimitAsync(JSON.parse(options), parseInt(value));
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
    console.log(options);
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

//{"authToken":"27dca13259eb7c99c6fe100816fa0e2b9ef7b7575993bf66d7decbcaa1c440b1","vehicleID":"58706612948970456","vehicle_id":28906417,"tokens":["6ed77422b3d2896c","03274357adf9b3f5"]}

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
    teslajs.setTempsAsync(JSON.parse(options), tempC, tempC)
    .then(function (result) { //success
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
    var promise = teslajs.seatHeaterAsync(JSON.parse(options), JSON.parse(seat), JSON.parse(level));
    promise.then(function (result) { //success
        console.log("Successful Response: " + JSON.stringify(result));
        res.status(200).send(result);
    }).catch(function (err) { //error
        console.log("Error: " + err);
        res.status(400).send(err);
    });
});

/**** STREAMING COMMANDS ****/
app.post('/summonForward', function(req, res){
    var email = req.body.email;
    var options = JSON.parse(req.body.auth);
    //console.log(options);
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    var token = Buffer.from(email + ':' + options.tokens[0], 'utf8').toString('base64')

    ws.send(JSON.stringify({
      "tag": options.vehicle_id.toString(),
      "token": token,
      "msg_type": "autopark:cmd_forward",
      "latitude": latitude.toString(),
      "longitude": longitude.toString()
    }));

    //send response back to server
    res.status(200).send("SummonForward command sent");
});

app.post('/summonBackward', function(req, res){
    var email = req.body.email;
    var options = JSON.parse(req.body.auth);
    //console.log(options);
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    var token = Buffer.from(email + ':' + options.tokens[0], 'utf8').toString('base64')

    ws.send(JSON.stringify({
      "tag": options.vehicle_id.toString(),
      "token": token,
      "msg_type": "autopark:cmd_backward",
      "latitude": latitude.toString(),
      "longitude": longitude.toString()
    }));

    res.status(200).send("SummonBackward command sent");
});

app.post('/summonAbort', function(req, res){
    //get options variable for tag & token
    var email = req.body.email;
    var options = JSON.parse(req.body.auth);
    //console.log(options);

    var token = Buffer.from(email + ':' + options.tokens[0], 'utf8').toString('base64')

    ws.send(JSON.stringify({
      "tag": options.vehicle_id.toString(),
      "token": token,
      "msg_type": "autopark:cmd_abort",
    }));

  res.status(200).send("SummonAbort command sent");
});

// checking to see if mobile access is enabled
app.post('/mobileAccess', function(req, res) {
    var options = req.body.auth;
    console.log("Checking mobile access");
    teslajs.mobileEnabledAsync(JSON.parse(options))
        .then(function (result) {
            console.log("Tesla Response: " + JSON.stringify(result));
            res.send(result);
        }).catch(function(err) {
            console.log("Tesla Response: " + JSON.stringify(err));
            res.send(true);
        });
});

/**** Getting State Calls ****/
app.post('/vehicleData', function (req, res) {
    var options = req.body.auth;
    console.log("Requesting full vehicle state");
    teslajs.vehicleDataAsync(JSON.parse(options))
        .then(function (vehicleData) {
            console.log("Vehicle data received");
            //console.log(JSON.stringify(vehicleData))
            //console.log(vehicleData);
            res.send(vehicleData);
        }).catch(function (err) {
            console.log("Tesla Response: " + JSON.stringify(err));
            //send fake vehicle update
            res.send({
                id: 12345678901234567,
                user_id: 123,
                vehicle_id: 1234567890,
                vin: "5YJSA11111111111",
                display_name: "Generated Test Vehicle",
                option_codes: 'AD15,MDLS,PBSB,RENA,BT37,ID3W,RFP2',
                color: null,
                tokens: ["abcdef1234567890", "1234567890abcdef"],
                state: "online",
                in_service: false,
                id_s: "12345678901234567",
                calendar_enabled: true,
                api_version: 6,
                backseat_token: null,
                backseat_token_updated_at: null,
                climate_state: {
                    battery_heater: false,
                    battery_heater_no_power: null,
                    driver_temp_setting: 21.7,
                    fan_status: 0,
                    inside_temp: 18.3,
                    is_auto_conditioning_on: false,
                    is_climate_on: false,
                    is_front_defroster_on: false,
                    is_preconditioning: false,
                    is_rear_defroster_on: false,
                    left_temp_direction: 0,
                    max_avail_temp: 28,
                    min_avail_temp: 15,
                    outside_temp: 17.5,
                    passenger_temp_setting: 21.7,
                    remote_heater_control_enabled: false,
                    right_temp_direction: 0,
                    seat_heater_left: 3,
                    seat_heater_rear_center: 2,
                    seat_heater_rear_left: 1,
                    seat_heater_rear_right: 0,
                    seat_heater_right: 2,
                    side_mirror_heaters: false,
                    smart_preconditioning: false,
                    timestamp: 1000000000000,
                    wiper_blade_heater: false
                },
                charge_state: {
                    battery_heater_on: false,
                    battery_level: 90,
                    batery_range: 276.68,
                    charge_current_request: 48,
                    charge_current_request_max: 48,
                    charge_enable_request: true,
                    charge_energy_added: 10.98,
                    charge_limit_soc: 78,
                    charge_limit_soc_max: 100,
                    charge_limit_soc_min: 50,
                    charge_limit_soc_std: 90,
                    charge_miles_added_ideal: 47,
                    charge_miles_added_rated: 47,
                    charge_port_cold_weather_mode: false,
                    charge_port_door_open: false,
                    charge_port_latch: 'Engaged',
                    charge_rate: 0,
                    charge_to_max_range: false,
                    charger_actual_current: 0,
                    charger_phases: null,
                    charger_pilot_current: 48,
                    charger_power: 0,
                    charger_voltage: 2,
                    charging_state: 'Charging',
                    conn_charge_cable: '<invalid>',
                    est_battery_range: 285.08,
                    fast_charger_brand: '<invalid>',
                    fast_charger_present: false,
                    fast_charger_type: '<invalid>',
                    ideal_battery_range: 276.68,
                    managed_charging_active: false,
                    managed_charging_start_time: null,
                    managed_charging_user_canceled: false,
                    max_range_charge_counter: 0,
                    not_enough_power_to_heat: null,
                    scheduled_charging_pending: false,
                    scheduled_charging_start_time: null,
                    time_to_full_charge: 0,
                    timestamp: 1000000000000,
                    trip_charging: false,
                    usable_battery_level: 72,
                    user_charge_enable_request: null
                },
                gui_settings: {
                    gui_24_hour_time: false,
                    gui_charge_rate_units: 'mi/hr',
                    gui_distance_units: 'mi/hr',
                    gui_range_display: 'Rated',
                    gui_temperature_units: 'F',
                    timestamp: 1000000000000
                },
                vehicle_state: {
                    api_version: 6,
                    autopark_state_v3: 'ready',
                    autopark_style: 'dead_man',
                    calendar_supported: true,
                    car_version: 'TESTVERSION mmddll33',
                    center_display_state: 0,
                    df: 0,
                    dr: 0,
                    ft: 0,
                    homelink_nearby: false,
                    is_user_present: false,
                    last_autopark_error: 'no_error',
                    locked: true,
                    media_state: {
                        remote_control_enabled: true
                    },
                    notifications_supported: true,
                    odometer: 12002.1853,
                    parsed_calendar_supported: true,
                    pf: 0,
                    pr: 0,
                    remote_start: false,
                    remote_start_supported: true,
                    rt: 0,
					sentry_mode: false,
                    software_update: {
                        expected_duration_sec: 2700,
                        status: ''
                    },
                    speed_limit_mode: {
                        active: false,
                        current_limit_mph: 55,
                        max_limit_mph: 90,
                        min_limit_mph: 50,
                        pin_code_set: false
                    },
                    sun_roof_percent_open: null,
                    sun_roof_state: 'unknown',
                    timestamp: 1000000000000,
                    valet_mode: false,
                    valet_pin_needed: true,
                    vehicle_name: 'TestVehicle'
                },
                vehicle_config: {
                    can_accept_navigation_requests: true,
                    can_actuate_trunks: true,
                    car_special_type: 'base',
                    car_type: 'modelS',
                    charge_port_type: 'US',
                    eu_vehicle: false,
                    exterior_color: 'White',
                    has_air_suspension: false,
                    has_ludicrous_mode: false,
                    motorized_charge_port: true,
                    perf_config: 'Base',
                    plg: null,
                    rear_seat_heaters: 1,
                    rear_seat_type: null,
                    rhd: false,
                    roof_color: 'Glass',
                    seat_type: null,
                    spoiler_type: 'None',
                    sun_roof_installed: null,
                    third_row_seats: '<invalid>',
                    timestamp: 1000000000000,
                    trim_badging: '74',
                    wheel_type: 'Pinwheel18'
                },
                drive_state: {
                    gps_as_of: 1000000000000,
                    heading: 90,
                    latitude: 20.00000,
                    longitude: -150.00000,
                    native_latitude: 20.00000,
                    native_location_supported: 1,
                    native_longitude: -150.00000,
                    native_type: 'wgs',
                    power: 0,
                    shift_state: null,
                    speed: null,
                    timestamp: 1000000000000
                }
            });
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
            console.log("Tesla Response: " + JSON.stringify(err));
            res.status(400).send(err);
        } else {
            console.log("Tesla Response: " + JSON.stringify(result));
            res.status(200).send(result);
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
    if(email === 'test' || email === '')
    {
        console.log("Entering test mode");
        res.send({
            authToken: "faketoken",
            refreshToken: "fakeRefreshToken"
        });
    }else{
        teslajs.login(email, password, function (err, result) {
        //console.log("Tesla Response: " + JSON.stringify(result));
        if (!result.response.body.access_token) {
            console.error("Login failed!");
            res.status(400).send(false);
        }else{
            console.log("Login successful");
            res.status(200).send(result);
        }
        });
    }
});

app.post('/vehicleID', function (req, res) {
    var options = {
        authToken: req.body.authToken
    }
    console.log("Requesting 'vehicle' with token " + JSON.stringify(options.authToken));
    teslajs.vehicle(options, function (err, vehicle) {
        //console.log(JSON.stringify(vehicle));
        if (vehicle === null) {
            //sending a fake vehicle for
            res.status(200).send({
                id: 12345678901234567,
                vehicle_id: 1234567890,
                vin: "5YJSA11111111111",
                display_name: "Generated Test Vehicle",
                option_codes: 'AD15,MDLS,PBSB,RENA,BT37,ID3W,RF3G,S3PB,DRLH,DV2W,W39B,APF0,COUS,BC3B,CH07,PC30,FC3P,FG31,GLFR,HL31,HM31,IL31,LTPB,MR31,FM3B,RS3H,SA3P,STCP,SC04,SU3C,T3CA,TW00,TM00,UT3P,WR00,AU3P,APH3,AF00,ZCST,MI00,CDM0',
                color: null,
                tokens: ["abcdef1234567890", "1234567890abcdef"],
                state: "online",
                in_service: false,
                id_s: "12345678901234567",
                calendar_enabled: true,
                api_version: 6,
                backseat_token: null,
                backseat_token_updated_at: null
            });
        }
        else {
            res.status(200).send(vehicle);
        }
    });
});

app.post('/refreshToken', function (req, res) {
    var refreshToken = req.body.refreshToken;
    console.log("Requesting 'refresh token' with refresh token " + refreshToken);
    teslajs.refreshTokenAsync(refreshToken)
        .then(function (result) {
            //sending fake tokens for testing purposes
            if(result.response.statusCode == 401){
                res.status(200).send({
                    authToken: "UltraFakeToken",
                    refreshToken: "UltraFakeRefreshToken"
                });
            }else{
                res.status(200).send(result);
            }
        }).catch(function(err) {
            console.log("ERROR - Tesla Response: " + err);
            res.status(400).send(true);
        });
});

app.post('/stopCharge', function(req, res) {
    var options = req.body.auth;
    console.log("Requesting Stop Charge");
    teslajs.stopChargeAsync(JSON.parse(options))
        .then(function(result) {
            console.log("Successful Response: " + result);
            res.status(200).send(result);
        }).catch(function(err) {
            console.log("Error: " + err);
            res.status(400).send(err);
        });
});

app.post('/startCharge', function(req, res) {
    var options = req.body.auth;
    console.log("Requesting Start Charge");
    teslajs.startChargeAsync(JSON.parse(options))
        .then(function(result) {
            console.log("Successful Response: " + result);
            res.status(200).send(result);
        }).catch(function(err) {
            console.log("Error: " + err);
            res.status(400).send(err);
        });
});

app.post('/setSentryMode', function(req, res) {
	var options = req.body.auth;
	var onoff = req.body.onoff;
	if (onoff) console.log("Requesting Set Sentry Mode On");
	else console.log("Requesting Set Sentry Mode Off");
	teslajs.setSentryModeAsync(JSON.parse(options), onoff)
		.then(function(result) {
			console.log("Successful Response: " + result);
			res.status(200).send(result);
		}).catch(function(err) {
			console.log("Error: " + err);
			res.status(400).send(err);
		});
});

app.post('/setValetMode', function(req, res) {
	var options = req.body.auth;
	var onoff = req.body.onoff;
	var pin = req.body.pin;
	if (onoff) console.log("Requesting Set Valet Mode On");
	else console.log("Requesting Set Valet Mode Off");
	teslajs.setValetModeAsync(JSON.parse(options), onoff, pin)
		.then(function(result) {
			console.log("Successful Response: " + result);
			res.status(200).send(result);
		}).catch(function(err) {
			console.log("Error: " + err);
			res.status(400).send(err);
		});
});

app.post('/resetValetPin', function(req, res) {
	var options = req.body.auth;
	console.log("Requesting Reset Valet Pin");
	teslajs.resetValetPinAsync(JSON.parse(options))
		.then(function(result) {
			console.log("Succesful Response: " + result);
			res.status(200).send(result);
		}).catch(function(err) {
			console.log("Error Response: " + err);
			res.status(400).send(err);
		})
});

app.post('/activateSpeedLimit', function(req, res) {
	var options = req.body.auth;
	var pin = req.body.pin;
	console.log("Requesting Activate Speed Limit");
	teslajs.speedLimitActivateAsync(JSON.parse(options), pin)
		.then(function(result) {
			console.log("Successful Response: " + result);
			res.status(200).send(result);
		}).catch(function(err) {
			console.log("Error Response: " + err);
			res.status(400).send(err);
		});
});

app.post('/deactivateSpeedLimit', function(req, res) {
	var options = req.body.auth;
	var pin = req.body.pin;
	console.log("Requesting Deactivate Speed Limit");
	teslajs.speedLimitDeactivateAsync(JSON.parse(options), pin)
		.then(function(result) {
			console.log("Successful Response: " + result);
			res.status(200).send(result);
		}).catch(function(err) {
			console.log("Error Response: " + err);
			res.status(400).send(err);
		});
});

app.post('/clearSpeedLimitPin', function(req, res) {
	var options = req.body.auth;
	var pin = req.body.pin;
	console.log("Requesting Clear Speed Limit Pin with");
	teslajs.speedLimitClearPinAsync(JSON.parse(options), pin)
		.then(function(result) {
			console.log("Successful Response: " + result);
			res.status(200).send(result);
		}).catch(function(err) {
			console.log("Error Response: " + err);
			res.status(400).send(err);
		});
});

app.post('/setSpeedLimit', function(req, res) {
	var options = req.body.auth;
	var limit = req.body.limit;
	console.log("Requesting Set Speed Limit to " + limit);
	teslajs.speedLimitSetLimitAsync(JSON.parse(options), limit)
		.then(function(result) {
			console.log("Successful Response: " + result);
			res.status(200).send(result);
		}).catch(function(err) {
			console.log("Error Response: " + err);
			res.status(400).send(err);
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
    //res.render('error');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
