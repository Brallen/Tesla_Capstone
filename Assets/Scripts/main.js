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
    let enginebutton = document.getElementById('enginetoggle_btn');
    let playbutton = document.getElementById('play_pause_btn');
    let nextbutton = document.getElementById('play_next_btn');
    let prevbutton = document.getElementById('play_prev_btn');

  	var isLocked = 0;
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
