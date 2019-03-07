import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/Styles/main.css';
import CarImage from './Assets/Images/Tesla-model-3.png';
class App extends React.Component {
  render(){
    return(
      <div>
        <Head/>
        <Body/>
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
          <link rel="stylesheet" type="text/css" media="screen" href="Styles/main.css" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        </head>
      </div>
    );
  }
}
class Body extends React.Component{
  render(){
    return(
      <div>
        <body>
          <Header/>
          <Main/>
        </body>
      </div>
    );
  }
}
class Header extends React.Component{
  render(){
    return(
      <div>
        <header class="container--header">
          <div class="container--car_info">
              <h1>Car Title</h1>
              <p>88% remaining</p>
          </div>
          <div class="container--logout_menu">
              <i id="modal--logout_open" class="fas fa-bars"></i>
              <i id="modal--logout_close" class="fas fa-times hidden"></i>
          </div>
          <div class="container--logout_button hidden">
              <button class="btn logout-button">Logout</button>
          </div>
        </header>
    </div>
    );
  }
}
class Main extends React.Component{
  render(){
    return(
      <div>
        <main class="container--main_section">
          <Image/>
          <LoginModal/>
          <ModalOpen/>
        </main>
      </div>
    );
  }
}
class LoginModal extends React.Component{
  state = {
    show :true
  }
  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }
  render(){
    return(
      <div>
      <Modal show={this.state.show} handleClose={this.hideModal}>
      <div class="modal container--modal_login">
          <div class="modal-content">
        <p id='login-error'></p>

                  <label for="email"><b>Email</b></label>
                  <input type="text" placeholder="Enter Tesla Email" name="email" required id="email"/>

                  <label for="password"><b>Password</b></label>
                  <input type="password" placeholder="Enter Tesla Password" name="password" required id="password"/>

                  <button type="submit" onClick={this.hideModal} class="btn btn--modal_btn" id="login">Login</button>
          </div>
      </div>
      </Modal>
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
class ModalOpen extends React.Component{
  state = {
    showControl:false,
    showMedia:false,
    showClimate:false,
    showCharge:false,
    showSummon:false
  }
  showControlModal = () => {
    this.setState({ showControl: true });
  }

  hideControlModal = () => {
    this.setState({ showControl: false });
  }
  showMediaModal = () =>{
    this.setState({showMedia:true});
  }
  hideMediaModal = ()=>{
    this.setState({showMedia:false});
  }
  showClimateModal =() =>{
    this.setState({showClimate: true});
  }
  hideClimateModal =() =>{
    this.setState({showClimate: false});
  }
  showChargeModal =() =>{
    this.setState({showCharge: true});
  }
  hideChargeModal =() =>{
    this.setState({showCharge: false});
  }
  showSummonModal =() =>{
    this.setState({showSummon: true});
  }
  hideSummonModal =() =>{
    this.setState({showSummon: false});
  }
  render(){
    return(
      <div>
        <div class="container--control_btn">
          <ul class="list--control_btn">

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




              <Modal show={this.state.showClimate} handleClose={this.hideClimateModal}>
                <div class="modal container--modal_climate">
                  <div class="modal-content">
                    <div class="modal--close">
                      <button onClick={this.hideClimateModal} id="modal--climate_close" class="modal--close_button"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal--climate_controls">
                      <p id="climate--temp_level" class="modal--level_text">Climate: 70F</p>
                      <input type="range" min="40" max="85" value="70" id="climate--temp_slider" class="modal--slider"/>
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



              <Modal show={this.state.showCharge} handleClose={this.hideChargeModal}>
                <div class="modal container--modal_charging">
                  <div class="modal-content">
                    <div class="modal--close">
                      <button onClick={this.hideChargeModal}id="modal--charging_close" class="modal--close_button"><i class="fas fa-times"></i></button>
                    </div>
                      <div class="modal--charging_controls">
                      <p id="charging--charge_level" class="modal--level_text">Max Charge: 80%</p>
                      <input type="range" min="0" max="100" value="80" id="charging--charge_slider" class="modal--slider"/>
                      <button id="charging--charge_port" class="btn btn--modal_btn">Open Port</button>
                    </div>
                  </div>
                </div>
              </Modal>

              <li class="item--control_btn"><button onClick={this.showChargeModal} id="modal--charging_open" class="btn btn--control_btn">Charging</button></li>


              <Modal show={this.state.showSummon} handleClose={this.hideSummonModal}>
                <div class="modal container--modal_summon">
                  <div class="modal-content">
                    <div class="modal--close">
                      <button onClick={this.hideSummonModal} id="modal--summon_close" class="modal--close_button"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal--summon_controls">
                      <button id="summon--move_forward" class="btn btn--modal_btn">Summon Forward</button>
                      <button id="summon--move_backward" class="btn btn--modal_btn">Summon Backward</button>
                    </div>
                  </div>
                </div>
              </Modal>

              <li class="item--control_btn"><button onClick={this.showSummonModal} id="modal--summon_open" class="btn btn--control_btn">Summon</button></li>
          </ul>
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
        <button
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};
ReactDOM.render(<App/>, document.getElementById('root'));
