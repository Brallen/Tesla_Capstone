window.onload = function(){
    let controlModal = document.getElementsByClassName('container--modal_controls')[0];
    let controlModalOpen = document.getElementById('modal--control_open');
    let controlModalClose = document.getElementById('modal--control_close');
    let mediaModal = document.getElementsByClassName('container--modal_media')[0];
    let climateModal = document.getElementsByClassName('container--modal_climate')[0];
    let chargingModal = document.getElementsByClassName('container--modal_charging')[0];
    let summonModal = document.getElementsByClassName('container--modal_summon')[0];
	let flashbutton = document.getElementById('flashlights_btn');
    let trunkbutton = document.getElementById('opentrunk_btn');
    let frunkbutton = document.getElementById('openfrunk_btn');
    let climatebutton = document.getElementById('climate--control');
    let tempSlider = document.getElementById('climate--temp_slider');

	var isLocked = 0;
  var climateOn = false;

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

	honk.onclick = function() {
		$.ajax({
			url:"honk"
			}).done(function(response){
				//alert(response);
			});
	}

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
}
