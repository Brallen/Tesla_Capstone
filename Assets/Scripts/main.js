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
    let seats = Array.from(document.getElementsByClassName('climate--seat_btn'));


  var climateOn = false;
  var seatHeating = {
    "climate--seat_fl":0,
    "climate--seat_fr":0,
    "climate--seat_bl":0,
    "climate--seat_bm":0,
    "climate--seat_br":0
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
    document.getElementById('climate--temp_slider').oninput = function() {
        document.getElementById('climate--temp_level').innerHTML = `Climate: ${this.value}F`;
    }
    document.getElementById('media--volume_slider').oninput = function() {
        document.getElementById('media-volume_level').innerHTML = `Volume: ${this.value}%`;
    }
    document.getElementById('charging--charge_slider').oninput = function() {
        document.getElementById('charging--charge_level').innerHTML = `Max Charge: ${this.value}%`;
    }

    // Async requests

    //Lock/Unlock
    var isLocked = 0;

    if (isLocked == 0) document.getElementById('lock').innerHTML = "Lock";
    else document.getElementById('lock').innerHTML = "Unlock";

  	lock.onclick = function() {
          if (isLocked == 0) {
              $.ajax({
                  url:"lock"
              }).done(function(response){
                  //alert(response);
                  isLocked = 1;
                  document.getElementById('lock').innerHTML = "Unlock";
  				});
  		}
  		else {
  			$.ajax({
  				url:"unlock"
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
                url:"opensunroof"
            }).done(function(response){
                //alert(response);
                sunRoofOpen = 1;
                document.getElementById('sunroof').innerHTML = "Close Sunroof";
				    });
		    }
		    else {
			       $.ajax({
				           url:"closesunroof"
				     }).done(function(response){
					          //alert(response);
					          sunRoofOpen = 0;
					          document.getElementById('sunroof').innerHTML = "Open Sunroof";
				     });
		    }
	  }

    //Charge Limit

    document.getElementById('charging--charge_level').innerHTML = "Max Charge: 80";

  chargeLimitSlider.oninput = function() {
    var message = "Max Charge: " + chargeLimitSlider.value
    document.getElementById('charging--charge_level').innerHTML = message;
  }

	chargeLimitSlider.onchange = function() {
		$.ajax({
				url:"chargelimit",
			type: "POST",
			data: {value: chargeLimitSlider.value}
				}).done(function(response){
					//alert(response);
			});
	}

    // Horn

  	honk.onclick = function() {
  		$.ajax({
  			url:"honk"
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
                url:"openchargeport"
            }).done(function(response){
                //alert(response);
                chargePortOpen = 1;
                document.getElementById('charging--charge_port').innerHTML = "Close Charge Port";
				    });
		    }
		    else {
			       $.ajax({
				           url:"closechargeport"
				     }).done(function(response){
					          //alert(response);
					          chargePortOpen = 0;
					          document.getElementById('charging--charge_port').innerHTML = "Open Charge Port";
				     });
		    }
	  }
    flashbutton.onclick = function(){
      $.ajax({
        url:"flashLights"
      }).done(function(response){
        //alert(response);
      });
    }

    trunkbutton.onclick = function(){
      $.ajax({
        url:"openTrunk",
        type: "POST",
        data: {which: "trunk"}
      }).done(function(response){
        //alert(response);
      });
    }

    frunkbutton.onclick = function(){
      $.ajax({
        url:"openTrunk",
        type: "POST",
        data: {which: "frunk"}
      }).done(function(response){
        //alert(response);
      });
    }

    climatebutton.onclick = function(){
      if (climateOn == true) {
        $.ajax({
          url:"climateOff"
          }).done(function(response){
            //alert(response);
            climateOn = false;
            climatebutton.innerHTML = "Turn Climate Control On";
          });
      }
      else {
        $.ajax({
          url:"climateOn"
          }).done(function(response){
            //alert(response);
            climateOn = true;
            climatebutton.innerHTML = "Turn Climate Control Off";
          });
      }
    }

    //change what temp is being showed
    tempSlider.oninput = function(){
      document.getElementById('climate--temp_level').innerHTML = tempSlider.value;
    }
    //change actual temp when slider released
    //Changing temp for both Driver & Passenger
    tempSlider.onchange = function(){
      $.ajax({
        url:"setTemp",
        type:"POST",
        data:{temp: Math.round((tempSlider.value -32) * (5/9))} //converting to Celcius
      }).done(function(response){
        //in further developments, return set temp, and assign to text and slider
        //alert(response);
      });
    }

    //use this function instead of below
    seats.forEach(seat => {
        seat.onclick = function(){
            //this.classList.toggle('climate--seat_btn_active');
            var apiIndex = seatIndex[this.id];
            //either turn seat heating on or off
            var level, color;
            /*if(seatHeating[apiIndex] == false){
              //turn seat heating on for that seat
              level = 2;
              color = "red";
              seatHeating[apiIndex] = true;
            }else{
              //turn seat heating off for that seat
              level = 0;
              color = "white";
              seatHeating[apiIndex] = false;
            }*/

            switch (seatHeating[this.id]) {
              case 0:
              case 1:
              case 2:
                seatHeating[this.id]++;
                console.log(this.classList);
                this.classList.add('climate--seat_btn_level_' + seatHeating[this.id]);
                this.classList.remove('climate--seat_btn_level_' + (seatHeating[this.id]-1));
                console.log(this.classList);
                break;
              case 3:
              default:
                seatHeating[this.id] = 0;
                this.classList.add('climate--seat_btn_level_0');
                this.classList.remove('climate--seat_btn_level_3');
                break;
            }level = seatHeating[this.id];

            $.ajax({
              url:"seatHeating",
              type: "POST",
              data: {seat:apiIndex, level:level}
            }).done(function(response){
              //change image
              //seat.style.color = color;
            });
        }
    });

    //just start the engine. Dont turn it off
    enginebutton.onclick = function(){
      $.ajax({
        url:"startEngine"
      }).done(function(response){
        //alert(response);
      });

    }

    playbutton.onclick = function(){
      $.ajax({
        url: "toggleMusic"
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
        url: "nextSong"
      }).done(function(response){
        alert(response);
      });
    }
    prevbutton.onclick = function(){
      $.ajax({
        url: "prevSong"
      }).done(function(response){
        alert(response);
      });
    }

}
