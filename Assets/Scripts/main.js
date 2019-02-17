window.onload = function(){
    let controlModal = document.getElementsByClassName('container--modal_controls')[0];
    let controlModalOpen = document.getElementById('modal--control_open');
    let controlModalClose = document.getElementById('modal--control_close');
    let flashbutton = document.getElementById('flashlights_btn');

    controlModalClose.onclick = function() {
        controlModal.style.display = 'none';
    };

    controlModalOpen.onclick = function() {
        controlModal.style.display = 'block';
    };

    flashbutton.onclick = function(){
      
    }
}
