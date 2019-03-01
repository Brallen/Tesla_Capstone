window.onload = function(){
    // Modal code
    let controlModal = document.getElementsByClassName('container--modal_controls')[0];
    let mediaModal = document.getElementsByClassName('container--modal_media')[0];
    let climateModal = document.getElementsByClassName('container--modal_climate')[0];
    let chargingModal = document.getElementsByClassName('container--modal_charging')[0];
    let summonModal = document.getElementsByClassName('container--modal_summon')[0];
	  let flashbutton = document.getElementById('flashlights_btn');
    let trunkbutton = document.getElementById('opentrunk_btn');
    let frunkbutton = document.getElementById('openfrunk_btn');
    let climatebutton = document.getElementById('climate--control');
    let tempSlider = document.getElementById('climate--temp_slider');
    let seatHeaterSelector = document.getElementById('climate--seat_warmers');
    let enginebutton = document.getElementById('enginetoggle_btn');
    let playbutton = document.getElementById('play_pause_btn');
    let nextbutton = document.getElementById('play_next_btn');
    let prevbutton = document.getElementById('play_prev_btn');
    let lock = document.getElementById('lock');
    let honk = document.getElementById('honk');
    let sunroof = document.getElementById('sunroof');
    let chargeLimitSlider = document.getElementById('charging--charge_slider');
    let chargePort = document.getElementById('charging--charge_port');

    var localOptions = {
      authToken:"fakeTokenLaLaLa",
      vehicleID:"vehicle1LaLaLa",
      carIndex:0
    };

    var email = getQueryVariable("email");
    var password = getQueryVariable("password");
    var authToken;
    var vehicleID;
    var carIndex;
    var climateOn = false;
    var seatHeating = {
      0:false,
      1:false,
      2:false,
      4:false,
      5:false
    }
    var musicPlaying = false;
  	if (isLocked == 0) document.getElementById('lock').innerHTML = "Lock";
  	else document.getElementById('lock').innerHTML = "Unlock";

    document.getElementById('modal--control_open').onclick = function() {
        controlModal.style.display = 'block';
    };
    document.getElementById('modal--control_close').onclick = function() {
        controlModal.style.display = 'none';
    };
    document.getElementById('modal--media_open').onclick = function() {
        mediaModal.style.display = 'block';
    };
    document.getElementById('modal--media_close').onclick = function() {
        mediaModal.style.display = 'none';
    };
    document.getElementById('modal--climate_open').onclick = function() {
        climateModal.style.display = 'block';
    };
    document.getElementById('modal--climate_close').onclick = function() {
        climateModal.style.display = 'none';
    };

    document.getElementById('modal--charging_open').onclick = function() {
        chargingModal.style.display = 'block';
    };
    document.getElementById('modal--charging_close').onclick = function() {
        chargingModal.style.display = 'none';
    };
    document.getElementById('modal--summon_open').onclick = function() {
        summonModal.style.display = 'block';
    };
    document.getElementById('modal--summon_close').onclick = function() {
        summonModal.style.display = 'none';
    };

    // Page update commands
    tempSlider.oninput = function() {
        document.getElementById('climate--temp_level').innerHTML = `Climate: ${this.value}F`;
    }
    document.getElementById('media--volume_slider').oninput = function() {
        document.getElementById('media-volume_level').innerHTML = `Volume: ${this.value}%`;
    }
    chargeLimitSlider.oninput = function() {
        document.getElementById('charging--charge_level').innerHTML = `Max Charge: ${this.value}%`;
    }

    let seats = Array.from(document.getElementsByClassName('climate--seat_btn'));
    seats.forEach(seat => {
        seat.onclick = function(){
            this.classList.toggle('climate--seat_btn_active');
        }
    });

    //Initial Login Attempt
    $.ajax({
    	url:"login",
    	type: "POST",
    	async: false,
    	data: { email: email,
              password: password}
  	}).done(function(response){
  		alert(response);
  		localOptions.authToken = response;
  	});

    $.ajax({
      url: "vehicleID",
      type: "POST",
      async: false,
      data: {authToken: authToken}
    }).done(function(response){
      alert(response);
      localOptions.vehicleID = response;
    });

    // Async requests

    //Lock/Unlock
    var isLocked = 0;

    if (isLocked == 0) document.getElementById('lock').innerHTML = "Lock";
    else document.getElementById('lock').innerHTML = "Unlock";

  	lock.onclick = function() {
          if (isLocked == 0) {
              $.ajax({
                  url:"lock",
                  type: "POST",
                  data: {auth: JSON.stringify(localOptions)}

              }).done(function(response){
                  //alert(response);
                  isLocked = 1;
                  document.getElementById('lock').innerHTML = "Unlock";
  				});
  		}
  		else {
  			$.ajax({
  				    url:"unlock",
              type: "POST",
              data: {auth: JSON.stringify(localOptions)}
  				}).done(function(response){
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

    sunroof.onclick = function() {
        if (sunRoofOpen == 0) {
            $.ajax({
                url:"opensunroof",
                type: "POST",
                data: {auth:JSON.stringify(localOptions)}
            }).done(function(response){
                //alert(response);
                sunRoofOpen = 1;
                document.getElementById('sunroof').innerHTML = "Close Sunroof";
				    });
		    }
		    else {
			       $.ajax({
				           url:"closesunroof",
                   type:"POST",
                   data:{auth:JSON.stringify(localOptions)}
				     }).done(function(response){
					          //alert(response);
					          sunRoofOpen = 0;
					          document.getElementById('sunroof').innerHTML = "Open Sunroof";
				     });
		    }
	  }

  //Max charge info
	chargeLimitSlider.onchange = function() {
		$.ajax({
				url:"chargelimit",
  			type: "POST",
  			data: {auth:JSON.stringify(localOptions), value: chargeLimitSlider.value}
			}).done(function(response){
					//alert(response);
			});
	}

    // Horn

  	honk.onclick = function() {
  		$.ajax({
  			   url:"honk",
           type:"POST",
           data:{auth:JSON.stringify(localOptions)}
  			}).done(function(response){
  				//alert(response);
  			});
  	}

    //Charge Port Open/Close

    var chargePortOpen = 0;

    if (chargePortOpen == 0) document.getElementById('charging--charge_port').innerHTML = "Open Charge Port";
    else document.getElementById('charging--charge_port').innerHTML = "Close Charge Port";

    chargePort.onclick = function() {
        if (chargePortOpen == 0) {
            $.ajax({
                url:"openchargeport",
                type: "POST",
                data: {auth: JSON.stringify(localOptions)}
            }).done(function(response){
                //alert(response);
                chargePortOpen = 1;
                document.getElementById('charging--charge_port').innerHTML = "Close Charge Port";
				    });
		    }
		    else {
			       $.ajax({
				           url:"closechargeport",
                   type: "POST",
                   data: {auth: JSON.stringify(localOptions)}
				     }).done(function(response){
					          //alert(response);
					          chargePortOpen = 0;
					          document.getElementById('charging--charge_port').innerHTML = "Open Charge Port";
				     });
		    }
	  }
    flashbutton.onclick = function(){
      $.ajax({
        url:"flashLights",
        type: "POST",
        data: {auth: JSON.stringify(localOptions)}
      }).done(function(response){
        //alert(response);
      });
    }

    trunkbutton.onclick = function(){
      $.ajax({
        url:"openTrunk",
        type: "POST",
        data: {auth: JSON.stringify(localOptions), which: "trunk"}
      }).done(function(response){
        //alert(response);
      });
    }

    frunkbutton.onclick = function(){
      $.ajax({
        url:"openTrunk",
        type: "POST",
        data: {auth:JSON.stringify(localOptions), which: "frunk"}
      }).done(function(response){
        //alert(response);
      });
    }

    climatebutton.onclick = function(){
      if (climateOn == true) {
        $.ajax({
          url:"climateOff",
          type: "POST",
          data: {auth: JSON.stringify(localOptions)}
          }).done(function(response){
            //alert(response);
            climateOn = false;
            climatebutton.innerHTML = "Turn Climate Control On";
          });
      }
      else {
        $.ajax({
          url:"climateOn",
          type: "POST",
          data: {auth: JSON.stringify(localOptions)}
          }).done(function(response){
            //alert(response);
            climateOn = true;
            climatebutton.innerHTML = "Turn Climate Control Off";
          });
      }
    }

    //change actual temp when slider released
    //Changing temp for both Driver & Passenger
    tempSlider.onchange = function(){
      $.ajax({
        url:"setTemp",
        type:"POST",
        data:{auth: JSON.stringify(localOptions), temp: Math.round((tempSlider.value -32) * (5/9))} //converting to Celcius
      }).done(function(response){
        //in further developments, return set temp, and assign to text and slider
        //alert(response);
      });
    }



    seatHeaterSelector.onclick = function(e){
      var seatHeaters = [].slice.call(document.querySelectorAll('.climate--seat_btn > .climate--img'), 0);
      var index = seatHeaters.indexOf(e.target);
      var apiIndex;
      if(index !== -1){
        //change index to TeslaAPI seat index
        switch (index) {
          case 3:
            apiIndex = 4;
            break;
          case 4:
            apiIndex = 5;
            break;
          default:
            apiIndex = index;
        }
        //either turn seat heating on or off
        var level, color;
        if(seatHeating[apiIndex] == false){
          //turn seat heating on for that seat
          level = 2;
          color = "red";
          seatHeating[apiIndex] = true;
        }else{
          //turn seat heating off for that seat
          level = 0;
          color = "white";
          seatHeating[apiIndex] = false;
        }
        $.ajax({
          url:"seatHeating",
          type: "POST",
          data: {auth: JSON.stringify(localOptions), seat:apiIndex, level:level}
        }).done(function(response){
          //change image
          var heater = seatHeaters[index];
          heater.style.color = color;
        });
      }
    }
    //just start the engine. Dont turn it off
    enginebutton.onclick = function(){
      $.ajax({
        url:"startEngine",
        type: "POST",
        data: {auth: JSON.stringify(localOptions)}
      }).done(function(response){
        //alert(response);
      });

    }

    playbutton.onclick = function(){
      $.ajax({
        url: "toggleMusic",
        type: "POST",
        data: {auth: JSON.stringify(localOptions)}
      }).done(function(response){
        if(musicPlaying == false){
          playbutton.classList.add("media-pause");
          playbutton.classList.remove("media-play");
          document.getElementById('play_pause_image').classList.add("fa-pause-circle");
          document.getElementById('play_pause_image').classList.remove("fa-play-circle");
          musicPlaying = true;
        }else {
          playbutton.classList.add("media-play");
          playbutton.classList.remove("media-pause");
          document.getElementById('play_pause_image').classList.add("fa-play-circle");
          document.getElementById('play_pause_image').classList.remove("fa-pause-circle");
          musicPlaying = false;
        }
      });
    }
    nextbutton.onclick = function(){
      $.ajax({
        url: "nextSong",
        type: "POST",
        data: {auth: JSON.stringify(localOptions)}
      }).done(function(response){
        alert(response);
      });
    }
    prevbutton.onclick = function(){
      $.ajax({
        url: "prevSong",
        type: "POST",
        data: {auth: JSON.stringify(localOptions)}
      }).done(function(response){
        alert(response);
      });
    }
}

function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
 }
