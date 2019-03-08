import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Assets/Styles/main.css';
import CarImage from './Assets/Images/Tesla-model-3.png';


class App extends React.Component {
  render(){
    return(
      <div>
        <Head/>
        <Header/>
        <Main/>
      </div>
    );
  }
}
class Head extends React.Component{
  render(){
    return(
      <div>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <title>Tesla Capstone</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet"/>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossOrigin="anonymous"/>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        </head>
      </div>
    );
  }
}

/*
******************************************* HEADER CLASS HANDLES HEADER
*/
class Header extends React.Component{
  render(){
    return(
      <div>
        <header class="container--header">
          <div class="container--car_info">
              <h1>{this.props.vehicle_name}</h1>
              <p>88% remaining</p>
          </div>
        </header>
    </div>
    );
  }
}

/*
******************************************* MAIN CLASS HANDLES BUTTONS AND BACKGROUND IMAGE
*/
class Main extends React.Component{
  render(){
    return(
      <div>
        <main class="container--main_section">
          <Image/>
          <div class="container--control_btn">
            <ul class="list--control_btn"><ControlModal/></ul>
            <ul class="list--control_btn"><MediaModal/></ul>
            <ul class="list--control_btn"><ClimateModal/></ul>
            <ul class="list--control_btn"><ChargingModal/></ul>  
          </div>
          <LoginModal/>
        </main>
      </div>
    );
  }
}










/*
***************************** LOGIN MODAL STUFF
*/

class LoginModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      email: '',
      password: '',
      authToken: '',
      vehicleID: '',
      vehicle_id: '', 
      tokens: ['',''], 
      vehicle_name: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange (evt) {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange (evt) {
    this.setState({ password: evt.target.value });
  }

  loginFunction = () => {
    var self = this;
    axios.post('/login', {
     email: this.state.email,
     password: this.state.password
    })
    .then(function (response) {
      self.setState({ authToken: response.data });
      self.vehicleLoginFunction();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  vehicleLoginFunction = () => {
    var self = this;
    axios.post('/vehicleID', {
      authToken: this.state.authToken
    })
    .then(function (response) {
      //alert(JSON.stringify(response.data.response));
      self.setState({ vehicleID: response.data.response.id_s });
      self.setState({ vehicle_id: response.data.response.vehicle_id });
      self.setState({ tokens: response.data.response.tokens });
      self.setState({ vehicle_name: response.data.response.display_name });
        alert("TEST LOGIN\nYour credentials:\nemail: "+self.state.email+"\npassword: "+self.state.password+"\nauthToken: "+
        self.state.authToken+"\nvehicleID: "+self.state.vehicleID+"\nvehicle_id: "+self.state.vehicle_id+"\ntokens: "+self.state.tokens+"\n")
    })
    .catch(function (error) {
     console.log(error);
    });
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
    this.loginFunction();
  }

  render(){
    return(
      <div>
        <Header vehicle_name={this.state.vehicle_name} />
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <div class="modal container--modal_login">
          <div class="modal-content">
          <p id='login-error'></p>
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Tesla Email" name="email" required id="email" onChange={this.handleEmailChange}/>
            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Tesla Password" name="password" required id="password" onChange={this.handlePasswordChange}/>
            <button type="submit" onClick={this.hideModal} class="btn btn--modal_btn" id="login">Login</button>
          </div>
          </div>
        </Modal>
    </div>
    );
  }
}


/*
***************************** CONTROL MODAL STUFF
*/
class ControlModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showControl: false
    };
  }

  showControlModal = () => {
    this.setState({ showControl: true });
  }

  hideControlModal = () => {
    this.setState({ showControl: false });
  }

  render(){
    return(
      <div>
          <Modal show={this.state.showControl} handleClose={this.hideControlModal} >
          <div class="modal container--modal_controls">
              <div class="modal-content">
                  <div class="modal--close">
                      <button onClick={this.hideControlModal}id="modal--control_close" class="modal--close_button"><i class="fas fa-times"></i></button>
                  </div>
                  <ul class="list--modal_btn">
                      <li class="item--modal_btn"><button class="btn btn--modal_btn" id="enginetoggle_btn">Start Engine</button></li>
                      <li class="item--modal_btn"><button class="btn btn--modal_btn" id="lock">Lock</button></li>
                      <li class="item--modal_btn"><button class="btn btn--modal_btn" id="honk">Honk Horn</button></li>
                      <li class="item--modal_btn"><button class="btn btn--modal_btn" id="flashlights_btn">Flash Lights</button></li>
                      <li class="item--modal_btn"><button class="btn btn--modal_btn" id="openfrunk_btn">Open Frunk</button></li>
                      <li class="item--modal_btn"><button class="btn btn--modal_btn" id="opentrunk_btn">Open Trunk</button></li>
                      <li class="item--modal_btn"><button class="btn btn--modal_btn" id="sunroof">Open Sunroof</button></li>
                  </ul>
              </div>
          </div>
          </Modal>

          <li class="item--control_btn"><button onClick={this.showControlModal} id="modal--control_open" class="btn btn--control_btn">Controls</button></li>
      </div>
    );
  }
}





/*
***************************** MEDIA MODAL STUFF
*/
class MediaModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showMedia: false
    };
  }

  showMediaModal = () => {
    this.setState({ showMedia: true });
  }

  hideMediaModal = () => {
    this.setState({ showMedia: false });
  }

  render(){
    return(
      <div>
          <Modal show={this.state.showMedia} handleClose={this.hideMediaModal} >
              <div class="modal container--modal_media">
                <div class="modal-content">
                  <div class="modal--close">
                  <button id="modal--media_close" onClick={this.hideMediaModal} class="modal--close_button"><i class="fas fa-times"></i></button>
                </div>
                  <div class="modal--media_controls">
                    <button class="media-volume_up btn btn--modal_btn">Volume Up</button>
                    <button class="media-volume_down btn btn--modal_btn">Volume Down</button>
                    <button class="media-control_button media-back" id="play_prev_btn"><i class="fas fa-backward"></i></button>
                    <button class="media-control_button media-play"><i class="fas fa-play-circle"></i></button>
                    <button class="media-control_button media-next" id="play_next_btn"><i class="fas fa-forward"></i></button>
                   </div>
                </div>
              </div>
          </Modal>

          <li class="item--control_btn"><button onClick={this.showMediaModal}id="modal--media_open" class="btn btn--control_btn">Media</button></li>
      </div>
    );
  }
}





/*
***************************** CLIMATE MODAL STUFF
*/
class ClimateModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: 70
    };
    this.handleClimateChange = this.handleClimateChange.bind(this);
  }

  showClimateModal = () => {
    this.setState({ showClimate: true });
  }

  hideClimateModal = () => {
    this.setState({ showClimate: false });
  }

  handleClimateChange (evt) {
    this.setState({ value: evt.target.value });
  }

  render(){
    return(
      <div>
        <Modal show={this.state.showClimate} handleClose={this.hideClimateModal}>
                <div class="modal container--modal_climate">
                  <div class="modal-content">
                    <div class="modal--close">
                      <button onClick={this.hideClimateModal} id="modal--climate_close" class="modal--close_button"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal--climate_controls">
                      <p id="climate--temp_level" class="modal--level_text">Climate: {this.state.value}F</p>
                      <input type="range" min="40" max="85" value={this.state.value} onChange={this.handleClimateChange} id="climate--temp_slider" class="modal--slider"/>
                      <button id="climate--control" class="btn btn--modal_btn">Turn Climate Control On</button>
                      <div id="climate--seat_warmers" class="climate--seat_warmers">
                        <div class="climate--seats climate--front_seats">
                            <button id="climate--seat_fl" class="climate--seat_btn"><i class="climate--img fas fa-fire-alt"></i></button>
                            <button id="climate--seat_fr" class="climate--seat_btn"><i class="climate--img fas fa-fire-alt"></i></button>
                        </div>
                        <div class="climate--seats climate--back_seats">
                            <button id="climate--seat_bl" class="climate--seat_btn"><i class="climate--img fas fa-fire-alt"></i></button>
                            <button id="climate--seat_bm" class="climate--seat_btn"><i class="climate--img fas fa-fire-alt"></i></button>
                            <button id="climate--seat_br" class="climate--seat_btn"><i class="climate--img fas fa-fire-alt"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </Modal>

        <li class="item--control_btn"><button onClick={this.showClimateModal} id="modal--climate_open" class="btn btn--control_btn">Climate</button></li>
      </div>
    );
  }
}



/*
***************************** CHARGING MODAL STUFF
*/
class ChargingModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showCharge: false,
      value: 80
    };
    this.handleChargeChange = this.handleChargeChange.bind(this);
  }

  showChargeModal = () => {
    this.setState({ showCharge: true });
  }

  hideChargeModal = () => {
    this.setState({ showCharge: false });
  }

  handleChargeChange (evt) {
    this.setState({ value: evt.target.value });
  }

  chargePortButton = () => {
    
  }

  render(){
    return(
      <div>
          <Modal show={this.state.showCharge} handleClose={this.hideChargeModal}>
                <div class="modal container--modal_charging">
                  <div class="modal-content">
                    <div class="modal--close">
                      <button onClick={this.hideChargeModal}id="modal--charging_close" class="modal--close_button"><i class="fas fa-times"></i></button>
                    </div>
                      <div class="modal--charging_controls">
                      <p id="charging--charge_level" class="modal--level_text">Max Charge: {this.state.value}%</p>
                      <input type="range" min="0" max="100" value={this.state.value} onChange={this.handleChargeChange} id="charging--charge_slider" class="modal--slider"/>
                      <button onClick={this.chargePortButton} id="charging--charge_port" class="btn btn--modal_btn">Open Port</button>
                    </div>
                  </div>
                </div>
          </Modal>

          <li class="item--control_btn"><button onClick={this.showChargeModal} id="modal--charging_open" class="btn btn--control_btn">Charging</button></li>
      </div>
    );
  }
}




class Image extends React.Component{
  render(){
    return(
      <div>
        <div class="container--car_image">
          <img src={CarImage} alt=""/>
        </div>
      </div>
    );
  }
}






const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' :'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};


ReactDOM.render(<App/>, document.getElementById('root'));