let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const teslajs = require('teslajs');
let bodyParser = require('body-parser');

let port = process.env.PORT || 3001;
let app = express();

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
        //sending a fake vehicle!
        if (vehicle === null) {
            res.send({
                id: 12345678901234567,
                user_id: 123,
                vehicle_id: 1234567890,
                vin: "5YJSA11111111111",
                display_name: "Nikola 2.0",
                option_codes: 'AD15,MDL3,PBSB,RENA,BT37,ID3W,RF3G,S3PB,DRLH,DV2W,W39B,APF0,COUS,BC3B,CH07,PC30,FC3P,FG31,GLFR,HL31,HM31,IL31,LTPB,MR31,FM3B,RS3H,SA3P,STCP,SC04,SU3C,T3CA,TW00,TM00,UT3P,WR00,AU3P,APH3,AF00,ZCST,MI00,CDM0',
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
                    seat_heater_left: 0,
                    seat_heater_rear_center: 0,
                    seat_heater_rear_left: 0,
                    seat_heater_rear_right: 0,
                    seat_heater_right: 0,
                    side_mirror_heaters: false,
                    smart_preconditioning: false,
                    timestamp: 1552440838137,
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
                    charge_limit_soc: 50,
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
                    charging_state: 'Disconnected',
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
                    timestamp: 1552440838137,
                    trip_charging: false, 
                    usable_battery_level: 72,
                    user_charge_enable_request: null
                },
                gui_settings: {
                    gui_24_hour_time: false,
                    gui_charge_rate_units: 'mi/hr',
                    gui_distance_units: 'mi/hr',
                    gui_range_display: 'Rated',
                    gui_temperature_units: 'C',
                    timestamp: 1552440838137
                },
                vehicle_state: {
                    api_version: 6,
                    autopark_state_v3: 'ready',
                    autopark_style: 'dead_man',
                    calendar_supported: true,
                    car_version: '2018.50.6 4ec03ed',
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
                    odometer: 12900.1235,
                    parsed_calendar_supported: true,
                    pf: 0,
                    pr: 0,
                    remote_start: false,
                    remote_start_supported: true,
                    rt: 0,
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
                    timestamp: 1552440838137,
                    valet_mode: false,
                    valet_pin_needed: true,
                    vehicle_name: 'TestVehicle'
                },
                vehicle_config: {
                    can_accept_navigation_requests: true,
                    can_actuate_trunks: true,
                    car_special_type: 'base',
                    car_type: 'model3',
                    charge_port_type: 'US',
                    eu_vehicle: false,
                    exterior_color: 'DeepBlue',
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
                    timestamp: 1552440838137,
                    trim_badging: '74',
                    wheel_type: 'Pinwheel18'
                },
                drive_state: {
                    gps_as_of: 1552440838,
                    heading: 90,
                    latitude: 44.54428,
                    longitude: -123.254808,
                    native_latitude: 44.54428,
                    native_location_supported: 1,
                    native_longitude: -123.254808,
                    native_type: 'wgs',
                    power: 0,
                    shift_state: null,
                    speed: null,
                    timestamp: 1552440838137
                }
            });
        }
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

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;