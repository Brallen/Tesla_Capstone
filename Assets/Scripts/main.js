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

    let seats = Array.from(document.getElementsByClassName('climate--seat_btn'));
    seats.forEach(seat => {
        seat.onclick = function(){
            this.classList.toggle('climate--seat_btn_active');
        }
    });
    
    // Async requests
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
	
	honk.onclick = function() {
		$.ajax({
			url:"honk"
			}).done(function(response){
				//alert(response);
			});
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
}
