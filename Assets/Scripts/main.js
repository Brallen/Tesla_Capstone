window.onload = function () {
    // Modal code
    let controlModal = document.getElementsByClassName('container--modal_controls')[0];
    let mediaModal = document.getElementsByClassName('container--modal_media')[0];
    let climateModal = document.getElementsByClassName('container--modal_climate')[0];
    let chargingModal = document.getElementsByClassName('container--modal_charging')[0];
    let summonModal = document.getElementsByClassName('container--modal_summon')[0];
    let loginModal = document.getElementsByClassName('modal container--modal_login')[0];
    let logoutModal = document.getElementsByClassName('container--logout_button')[0];
    let logoutOpen = document.getElementById('modal--logout_open');
    let logoutClose = document.getElementById('modal--logout_close');

    //buttons
    let flashbutton = document.getElementById('flashlights_btn');
    let trunkbutton = document.getElementById('opentrunk_btn');
    let frunkbutton = document.getElementById('openfrunk_btn');
    let climatebutton = document.getElementById('climate--control');
    let tempSlider = document.getElementById('climate--temp_slider');
    let seatHeaterSelector = document.getElementById('climate--seat_warmers');
    let enginebutton = document.getElementById('enginetoggle_btn');
    let volUpbutton = document.getElementsByClassName('media-volume_up')[0];
    let volDownbutton = document.getElementsByClassName('media-volume_down')[0];
    let playbutton = document.getElementsByClassName('media-play')[0];
    let nextbutton = document.getElementsByClassName('media-next')[0];
    let prevbutton = document.getElementsByClassName('media-back')[0];
    let lock = document.getElementById('lock');
    let honk = document.getElementById('honk');
    let sunroof = document.getElementById('sunroof');
    let chargeLimitSlider = document.getElementById('charging--charge_slider');
    let chargePort = document.getElementById('charging--charge_port');
    let login = document.getElementById('login');

    var localOptions = {
        authToken: "fakeTokenLaLaLa",
        vehicleID: "vehicle1LaLaLa",
        vehicle_id: "",
        tokens: []
    }
    var authToken;
    var vehicleID;
    var carIndex;
    var climateOn = false;
    var musicPlaying = false;
    if (isLocked == 0) document.getElementById('lock').innerHTML = "Lock";
    else document.getElementById('lock').innerHTML = "Unlock";

    var climateOn = false;
    var seatHeating = {
        "climate--seat_fl": 0,
        "climate--seat_fr": 0,
        "climate--seat_bl": 0,
        "climate--seat_bm": 0,
        "climate--seat_br": 0
    }
    const seatIndex = {
        "climate--seat_fl": 0,
        "climate--seat_fr": 1,
        "climate--seat_bl": 2,
        "climate--seat_bm": 4,
        "climate--seat_br": 5
    }
    var musicPlaying = false;
    if (isLocked == 0) document.getElementById('lock').innerHTML = "Lock";
    else document.getElementById('lock').innerHTML = "Unlock";


    loginModal.style.display = 'block';

    document.getElementById('modal--control_open').onclick = function () {
        controlModal.style.display = 'block';
    };
    document.getElementById('modal--control_close').onclick = function () {
        controlModal.style.display = 'none';
    };
    document.getElementById('modal--media_open').onclick = function () {
        mediaModal.style.display = 'block';
    };
    document.getElementById('modal--media_close').onclick = function () {
        mediaModal.style.display = 'none';
    };
    document.getElementById('modal--climate_open').onclick = function () {
        climateModal.style.display = 'block';
    };
    document.getElementById('modal--climate_close').onclick = function () {
        climateModal.style.display = 'none';
    };
    document.getElementById('modal--charging_open').onclick = function () {
        chargingModal.style.display = 'block';
    };
    document.getElementById('modal--charging_close').onclick = function () {
        chargingModal.style.display = 'none';
    };
    document.getElementById('modal--summon_open').onclick = function () {
        summonModal.style.display = 'block';
    };
    document.getElementById('modal--summon_close').onclick = function () {
        summonModal.style.display = 'none';
    };
    logoutOpen.onclick = () => {
        logoutModal.classList.toggle('hidden');
        logoutOpen.classList.toggle('hidden');
        logoutClose.classList.toggle('hidden');
    }
    logoutClose.onclick = () => {
        logoutModal.classList.toggle('hidden');
        logoutClose.classList.toggle('hidden');
        logoutOpen.classList.toggle('hidden');
    }

    window.onclick = function (event) {
        if (event.target == controlModal) {
            controlModal.style.display = "none";
        } else if (event.target == mediaModal) {
            mediaModal.style.display = "none";
        } else if (event.target == climateModal) {
            climateModal.style.display = "none";
        } else if (event.target == chargingModal) {
            chargingModal.style.display = "none";
        } else if (event.target == summonModal) {
            summonModal.style.display = "none";
        }
    }

    // Page update commands
    tempSlider.oninput = function () {
        document.getElementById('climate--temp_level').innerHTML = `Climate: ${this.value}F`;
    }
    chargeLimitSlider.oninput = function () {
        document.getElementById('charging--charge_level').innerHTML = `Max Charge: ${this.value}%`;
    }

    let seats = Array.from(document.getElementsByClassName('climate--seat_btn'));
    seats.forEach(seat => {
        seat.onclick = function () {
            this.classList.toggle('climate--seat_btn_active');
        }
    });

    //Initial Login Attempt
    login.onclick = function () {

        email = document.getElementById('email').value;
        password = document.getElementById('password').value;

        if (email !== "" && password !== "") {

            $.ajax({
                url: "login",
                type: "POST",
                async: false,
                data: {
                    email: email,
                    password: password
                }
            }).done(function (response) {
                alert(response);
                localOptions.authToken = response;
            });

            $.ajax({
                url: "vehicleID",
                type: "POST",
                async: false,
                data: {
                    authToken: localOptions.authToken
                }
            }).done(function (response) {
                alert(JSON.stringify(response));
                localOptions.vehicleID = response.id_s;
                localOptions.vehicle_id = response.vehicle_id;
                localOptions.tokens = response.tokens;
            });

            loginModal.style.display = 'none';
        } else {
            document.getElementById('login-error').innerHTML = "Both fields required"
        };
    }

    // Async requests

    //Lock/Unlock
    var isLocked = 0;

    if (isLocked == 0) document.getElementById('lock').innerHTML = "Lock";
    else document.getElementById('lock').innerHTML = "Unlock";

    lock.onclick = function () {
        if (isLocked == 0) {
            $.ajax({
                url: "lock",
                type: "POST",
                data: {
                    auth: JSON.stringify(localOptions)
                }

            }).done(function (response) {
                //alert(response);
                isLocked = 1;
                document.getElementById('lock').innerHTML = "Unlock";
            });
        } else {
            $.ajax({
                url: "unlock",
                type: "POST",
                data: {
                    auth: JSON.stringify(localOptions)
                }
            }).done(function (response) {
                //alert(response);
                isLocked = 0;
                document.getElementById('lock').innerHTML = "Lock";
            });
        }
    }

    //Sunroof Open/Close
    var sunRoofOpen = 0;

    if (sunRoofOpen == 0) document.getElementById('sunroof').innerHTML = "Open Sunroof";
    else document.getElementById('sunroof').innerHTML = "Close Sunroof";

    sunroof.onclick = function () {
        if (sunRoofOpen == 0) {
            $.ajax({
                url: "opensunroof",
                type: "POST",
                data: {
                    auth: JSON.stringify(localOptions)
                }
            }).done(function (response) {
                //alert(response);
                sunRoofOpen = 1;
                document.getElementById('sunroof').innerHTML = "Close Sunroof";
            });
        } else {
            $.ajax({
                url: "closesunroof",
                type: "POST",
                data: {
                    auth: JSON.stringify(localOptions)
                }
            }).done(function (response) {
                //alert(response);
                sunRoofOpen = 0;
                document.getElementById('sunroof').innerHTML = "Open Sunroof";
            });
        }
    }

    //Max charge info
    chargeLimitSlider.onchange = function () {
        $.ajax({
            url: "chargelimit",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions),
                value: chargeLimitSlider.value
            }
        }).done(function (response) {
            //alert(response);
        });
    }

    // Horn

    honk.onclick = function () {
        $.ajax({
            url: "honk",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions)
            }
        }).done(function (response) {
            //alert(response);
        });
    }

    //Charge Port Open/Close

    var chargePortOpen = 0;

    if (chargePortOpen == 0) document.getElementById('charging--charge_port').innerHTML = "Open Charge Port";
    else document.getElementById('charging--charge_port').innerHTML = "Close Charge Port";

    chargePort.onclick = function () {
        if (chargePortOpen == 0) {
            $.ajax({
                url: "openchargeport",
                type: "POST",
                data: {
                    auth: JSON.stringify(localOptions)
                }
            }).done(function (response) {
                //alert(response);
                chargePortOpen = 1;
                document.getElementById('charging--charge_port').innerHTML = "Close Charge Port";
            });
        } else {
            $.ajax({
                url: "closechargeport",
                type: "POST",
                data: {
                    auth: JSON.stringify(localOptions)
                }
            }).done(function (response) {
                //alert(response);
                chargePortOpen = 0;
                document.getElementById('charging--charge_port').innerHTML = "Open Charge Port";
            });
        }
    }
    flashbutton.onclick = function () {
        console.log(localOptions);
        $.ajax({
            url: "flashLights",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions)
            }
        }).done(function (response) {
            alert(response);
        });
    }

    trunkbutton.onclick = function () {
        $.ajax({
            url: "openTrunk",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions),
                which: "trunk"
            }
        }).done(function (response) {
            //alert(response);
        });
    }

    frunkbutton.onclick = function () {
        $.ajax({
            url: "openTrunk",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions),
                which: "frunk"
            }
        }).done(function (response) {
            //alert(response);
        });
    }

    //change actual temp when slider released
    //Changing temp for both Driver & Passenger
    tempSlider.onchange = function () {
        $.ajax({
            url: "setTemp",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions),
                temp: Math.round((tempSlider.value - 32) * (5 / 9))
            } //converting to Celcius
        }).done(function (response) {
            //in further developments, return set temp, and assign to text and slider
            //alert(response);
        });
    }

    climatebutton.onclick = function () {
        if (climateOn == true) {
            $.ajax({
                url: "climateOff",
                type: "POST",
                data: {
                    auth: JSON.stringify(localOptions)
                }
            }).done(function (response) {
                //alert(response);
                climateOn = false;
                climatebutton.innerHTML = "Turn Climate Control On";
            });
        } else {
            $.ajax({
                url: "climateOn",
                type: "POST",
                data: {
                    auth: JSON.stringify(localOptions)
                }
            }).done(function (response) {
                //alert(response);
                climateOn = true;
                climatebutton.innerHTML = "Turn Climate Control Off";
            });
        }
    }

    //use this function instead of below
    seats.forEach(seat => {
        seat.onclick = function () {
            //this.classList.toggle('climate--seat_btn_active');
            var apiIndex = seatIndex[this.id];
            //either turn seat heating on or off
            var level, color;

            switch (seatHeating[this.id]) {
                case 0:
                case 1:
                case 2:
                    seatHeating[this.id]++;
                    console.log(this.classList);
                    this.classList.add('climate--seat_btn_level_' + seatHeating[this.id]);
                    this.classList.remove('climate--seat_btn_level_' + (seatHeating[this.id] - 1));
                    console.log(this.classList);
                    break;
                case 3:
                default:
                    seatHeating[this.id] = 0;
                    this.classList.add('climate--seat_btn_level_0');
                    this.classList.remove('climate--seat_btn_level_3');
                    break;
            }
            level = seatHeating[this.id];

            $.ajax({
                url: "seatHeating",
                type: "POST",
                data: {
                    seat: apiIndex,
                    level: level
                }
            }).done(function (response) {

            });
        }
    });

    //just start the engine. Dont turn it off
    enginebutton.onclick = function () {
        $.ajax({
            url: "startEngine",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions),
                pass: password
            }
        }).done(function (response) {
            //alert(response);
        });

    }

    volUpbutton.onclick = function () {
        $.ajax({
            url: "volumeUp",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions)
            }
        }).done(function (response) {
            //alert(response)
        });
    }

    volDownbutton.onclick = function () {
        $.ajax({
            url: "volumeDown",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions)
            }
        }).done(function (response) {
            //alert(response)
        });
    }

    playbutton.onclick = function () {
        $.ajax({
            url: "toggleMusic",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions)
            }
        }).done(function (response) {
            if (musicPlaying == false) {
                playbutton.getElementsByClassName("fa-play-circle")[0].classList.add("fa-pause-circle");
                playbutton.getElementsByClassName("fa-play-circle")[0].classList.remove("fa-play-circle");
                musicPlaying = true;
            } else {
                playbutton.getElementsByClassName("fa-pause-circle")[0].classList.add("fa-play-circle");
                playbutton.getElementsByClassName("fa-pause-circle")[0].classList.remove("fa-pause-circle");
                musicPlaying = false;
            }
        });
    }
    nextbutton.onclick = function () {
        $.ajax({
            url: "nextSong",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions)
            }
        }).done(function (response) {
            //alert(response);
            //If music was off at the time, let user know music now playing
            if (musicPlaying == false) {
                playbutton.getElementsByClassName("fa-play-circle")[0].classList.add("fa-pause-circle");
                playbutton.getElementsByClassName("fa-play-circle")[0].classList.remove("fa-play-circle");
                musicPlaying = true;
            } //Do we need to call for music to start as well?

        });
    }
    prevbutton.onclick = function () {
        $.ajax({
            url: "prevSong",
            type: "POST",
            data: {
                auth: JSON.stringify(localOptions)
            }
        }).done(function (response) {
            //alert(response);
            //If music was off at the time, let user know music now playing
            if (musicPlaying == false) {
                playbutton.getElementsByClassName("fa-play-circle")[0].classList.add("fa-pause-circle");
                playbutton.getElementsByClassName("fa-play-circle")[0].classList.remove("fa-play-circle");
                musicPlaying = true;
            } //Do we need to call for music to start as well?
        });

    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}