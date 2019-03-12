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
  let wakeUpPopUp = document.getElementsByClassName("modal container--modal_wake-up")[0];

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

  //Authentication Vars
  var localOptions = {
    authToken: "",
    vehicleID: "",
    vehicle_id: "",
    tokens: []
  }

  //State Vars
  var chargingState;
  var batteryLevel;
  var chargeLimit;
  var climateOn;
  var tempSet;
  var musicPlaying;
  var sunRoofOpen;
  var isLocked;
  var carTitle;
  var awake;
  var carTemp;
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

  loginModal.style.display = 'block';

  wakeUpPopUp.style.display = 'none';

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
          loginModal.style.display = 'none';
          updateState();
          setInterval(updateState, 10000);
        });
      });

    } else {
      document.getElementById('login-error').innerHTML = "Both fields required"
    };
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

  // Async requests

  //Lock/Unlock
  lock.onclick = function () {
    if (isLocked == false) {
      $.ajax({
        url: "lock",
        type: "POST",
        data: {
          auth: JSON.stringify(localOptions)
        }

      }).done(function (response) {
        isLocked = true;
        document.getElementById('lock').innerHTML = "Unlock";
      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
      });
    } else {
      $.ajax({
        url: "unlock",
        type: "POST",
        data: {
          auth: JSON.stringify(localOptions)
        }
      }).done(function (response) {
        isLocked = false;
        document.getElementById('lock').innerHTML = "Lock";
      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
      });
    }
  }

  //Sunroof Open/Close
  sunroof.onclick = function () {
    if (sunRoofOpen == false) {
      $.ajax({
        url: "opensunroof",
        type: "POST",
        data: {
          auth: JSON.stringify(localOptions)
        }
      }).done(function (response) {
        sunRoofOpen = true;
        document.getElementById('sunroof').innerHTML = "Close Sunroof";
      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
      });
    } else {
      $.ajax({
        url: "closesunroof",
        type: "POST",
        data: {
          auth: JSON.stringify(localOptions)
        }
      }).done(function (response) {
        sunRoofOpen = false;
        document.getElementById('sunroof').innerHTML = "Open Sunroof";
      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
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
      //nothing for now
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
      //returning slider to previous value
      chargeLimitSlider.value = chargeLimit;
      document.getElementById('charging--charge_level').innerHTML = `Max Charge: ${chargeLimit}%`;

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
      //nothing for now
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
    });
  }

  //Charge Port Open/Close
  chargePort.onclick = function () {
    if (chargePortOpen == 0) {
      $.ajax({
        url: "openchargeport",
        type: "POST",
        data: {
          auth: JSON.stringify(localOptions)
        }
      }).done(function (response) {
        chargePortOpen = 1;
        document.getElementById('charging--charge_port').innerHTML = "Close Charge Port";
      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
      });
    } else {
      $.ajax({
        url: "closechargeport",
        type: "POST",
        data: {
          auth: JSON.stringify(localOptions)
        }
      }).done(function (response) {
        chargePortOpen = 0;
        document.getElementById('charging--charge_port').innerHTML = "Open Charge Port";
      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
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
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
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
      //nothing for now
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
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
      //nothing for now
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
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
      tempSet = tempSlider.value;
      carTemp = tempSlider.value;
      //in further developments, return set temp, and assign to text and slider
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
      //returning slider to previous value
      tempSlider.value = tempSet;
      document.getElementById('climate--temp_level').innerHTML = `Climate: ${tempSet}F`;
    });
  }

  climatebutton.onclick = function () {
    if (climateOn) {
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
      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
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
      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
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

      //will need this to only change if status is successful
      //move temp up if not at level three, otherwise drop it back to 0
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
          level: level,
          auth: JSON.stringify(localOptions)
        }
      }).done(function (response) {

      }).catch(function(err){
        alert(err.responseText + " - " + err.statusText);
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
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
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
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
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
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
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
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
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

    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
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
    }).catch(function(err){
      alert(err.responseText + " - " + err.statusText);
    });

  }

  function updateState() {
      $.ajax({
          url: "vehicleData",
          type: "POST",
          data: {
              auth: JSON.stringify(localOptions)
          }
      }).done(function(response) {
          if (response === "I_got_nothin") {
              chargingState = "Disconnected";
              batteryLevel = 80;
              chargeLimit = 80;
              climateOn = false;
              tempSet = 70;
              musicPlaying = false;
              sunRoofOpen = false;
              isLocked = false;
              chargePortOpen = false;
              carTitle = "Barnaby";
              awake = "online";
              carTemp = 70;
              seatHeating[0] = 0;
              seatHeating[1] = 0;
              seatHeating[2] = 0;
              seatHeating[3] = 0;
              seatHeating[4] = 0;
          }
          else {
              chargingState = response.charge_state.charging_state;
              batteryLevel = response.charge_state.battery_level;
              chargeLimit = response.charge_state.charge_limit_soc;
              climateOn = response.climate_state.is_climate_on;
              musicPlaying = false;
              sunRoofOpen = response.vehicle_state.sun_roof_percent_open;
              isLocked = response.vehicle_state.locked;
              chargePortOpen = response.charge_state.charge_port_door_open;
              carTitle = response.response.display_name;
              awake = response.response.state;
              carTemp = (response.climate_state.driver_temp_setting * 1.8) + 32;
              //seatHeating[0] = response.climate_state.seat_heater_left
              //seatHeating[1] = response.climate_state.seat_heater_right;
              //seatHeating[2] = response.climate_state.seat_heater_rear_left;
              //seatHeating[3] = response.climate_state.seat_heater_rear_center;
              //seatHeating[4] = response.climate_state.seat_heater_rear_right;
              //Not sure what return value to expect here, just experimenting for now.
              console.log(response.climate_state.seat_heater_left);
          }
          document.getElementById("battery_lvl").innerHTML = batteryLevel;

          document.getElementById("charging--charge_level").innerHTML = "Max Charge: " + chargeLimit.toString() + "%";
          document.getElementById("charging--charge_slider").value = chargeLimit.toString();

          if (isLocked) lock.innerHTML = "Unlock";
          else lock.innerHTML = "Lock";

          if (chargePortOpen) document.getElementById("charging--charge_port").innerHTML = "Close Charge Port";
          else document.getElementById("charging--charge_port").innerHTML = "Open Charge Port";

          if (climateOn) document.getElementById("climate--control").innerHTML = "Turn Climate Control Off";
          else document.getElementById("climate--control").innerHTML = "Turn Climate Control On";

          document.getElementById("car_title").innerHTML = carTitle;

          tempSlider.value = carTemp;
          document.getElementById("climate--temp_level").innerHTML = "Climate: " + carTemp + "F";

          for (var i = 0; i < 5; i++) {
              var seat;
              if (i === 0) seat = document.getElementById("climate--seat_fl");
              else if (i === 1) seat = document.getElementById("climate--seat_fr");
              else if (i === 2) seat = document.getElementById("climate--seat_bl");
              else if (i === 3) seat = document.getElementById("climate--seat_bm");
              else seat = document.getElementById("climate--seat_br");
              switch (seatHeating[i]) {
                case 0:
                    seat.classList.add('climate--seat_btn_level_0');
                    seat.classList.remove('climate--seat_btn_level_3');
                    break;
                case 1:
                    seat.classList.add('climate--seat_btn_level_1');
                    seat.classList.remove('climate--seat_btn_level_0');
                    break;
                case 2:
                    seat.classList.add('climate--seat_btn_level_2');
                    seat.classList.remove('climate--seat_btn_level_3');
                    break;
                case 3:
                default:
                    seat.classList.add('climate--seat_btn_level_3');
                    seat.classList.remove('climate--seat_btn_level_0');
                    break;
              }
          }

          if (awake === "alseep") {
              wakeUpPopUp.style.display = 'block';
              $.ajax({
                  url: "wakeup",
                  type: "POST",
                  async: false,
                  data: {
                      auth: JSON.stringify(localOptions)
                  }
              }).done(function(response) {
                  wakeUpPopUp.style.display = 'none';
                  awake = "online";
              }).catch(function(err){
                console.log("Waking car: " + err.responseText + " - " + err.statusText);
              });
          }
      }).catch(function(err){
        console.log("Updating state: " + err.responseText + " - " + err.statusText);
      });
  }
}
