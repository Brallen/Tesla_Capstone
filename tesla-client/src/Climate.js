import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import axios from 'axios';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class ClimateModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.vehicleClimateNum,
      multiplier: 1,
      frontLeft: this.props.seatLeft,
      frontRight: this.props.seatRight,
      rearLeft: this.props.seatLeftRear,
      rearCenter: this.props.seatMidRear,
      rearRight: this.props.seatRightRear,
      frontLeftNext: this.props.seatLeft+1,
      frontRightNext: this.props.seatRight+1,
      rearLeftNext: this.props.seatLeftRear+1,
      rearCenterNext: this.props.seatMidRear+1,
      rearRightNext: this.props.seatRightRear+1,
      localOptions: {}
    };
    this.refreshGlobalTimerWhenAction = this.refreshGlobalTimerWhenAction.bind(this);
    this.climateOnButton = this.climateOnButton.bind(this);
    this.applyClimateSettings = this.applyClimateSettings.bind(this);
    this.handleClimateChange = this.handleClimateChange.bind(this);
    this.frontLeftHeater = this.frontLeftHeater.bind(this);
    this.frontRightHeater = this.frontRightHeater.bind(this);
    this.rearRightHeater = this.rearRightHeater.bind(this);
    this.rearLeftHeater = this.rearLeftHeater.bind(this);
    this.rearMidHeater = this.rearMidHeater.bind(this);
  }

  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
    //alert(JSON.stringify(this.state.localOptions))
  }

  //call this function inside every control
  refreshGlobalTimerWhenAction(){
    var newStore = store.getState();
    newStore.state.refreshTime = this.props.globalTimerInterval;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        refreshTime: newStore.state.refreshTime
      }
    })
  }

  hideClimateModal = () => {
    var newStore = store.getState();
    newStore.state.showClimateModal = false;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showClimateModal: newStore.state.showClimateModal
      }
    })
  }

  /*
    this runs every time the slider is moved
    this is because in order for the view to be updated client side we need to 
    update the corresponding data. This means if we call the API in this function
    we are going to be flooding the server with API commands
  */
  handleClimateChange = (value) => {
    this.refreshGlobalTimerWhenAction();
    var newStore = store.getState();
    this.setState({ 
      temperature: parseFloat(value)
    });
    newStore.state.vehicleDataObject.climate_state.driver_temp_setting = parseFloat(this.state.temperature);
    newStore.state.vehicleDataObject.climate_state.passenger_temp_setting = parseFloat(this.state.temperature);

    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
  }

  applyClimateSettings(){
    this.refreshGlobalTimerWhenAction();
    //make API call here to send the temperature setting
    //see comment above handleClimateChange()
    axios.post('/setTemp', {
      auth: JSON.stringify(this.state.localOptions),
      temp: parseInt(this.state.temperature.toFixed(0))
    })
    .then(function (response) {
      //if it's a good response, update local state
      alert("temperature set");
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      alert(error.response.data + ' - ' + error.response.statusText);
      //error, lets repull the data to update the slider back to what it is
      var newStore = store.getState();
      newStore.state.refreshTime = 1;
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          refreshTime: newStore.state.refreshTime
        }
      })
    });
  }

  climateOnButton(){
    this.refreshGlobalTimerWhenAction();
    
    //if vehicle climate is on then turn it off
    if(this.props.vehicleClimate === true){
      axios.post('/climateOff', {
        auth: JSON.stringify(this.state.localOptions)
      })
      .then(function (response) {
        //if it's a good response, update local state
        var newStore = store.getState();
        newStore.state.vehicleDataObject.climate_state.is_climate_on = false;
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
            vehicleDataObject: newStore.state.vehicleDataObject
          }
        })
        alert("temperature set");
      })
      .catch(function (error) {
        //alert(JSON.stringify(error))
        alert(error.response.data + ' - ' + error.response.statusText);
      });
    }

    if(this.props.vehicleClimate === false){
      axios.post('/climateOn', {
        auth: JSON.stringify(this.state.localOptions)
      })
      .then(function (response) {
        //if it's a good response, update local state
        var newStore = store.getState();
        newStore.state.vehicleDataObject.climate_state.is_climate_on = true;
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
            vehicleDataObject: newStore.state.vehicleDataObject
          }
        })
        alert("temperature set");
      })
      .catch(function (error) {
        //alert(JSON.stringify(error))
        alert(error.response.data + ' - ' + error.response.statusText);
      });
    }
  }


  /*
      *************** Front left heater button **************
  */
  frontLeftHeater(){
    this.refreshGlobalTimerWhenAction();
    //calculate next level for front left seat
    switch(this.state.frontLeft){
      case 0:
      default:
        this.setState({ frontLeft: 3 });
        break;
      case 1:
      case 2:
      case 3:
      this.setState({ frontLeft: this.state.frontLeft-1 });
        break;
    }
    var newStore = store.getState();
    newStore.state.vehicleDataObject.climate_state.seat_heater_left = this.state.frontLeft;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(0),
      level: JSON.stringify(this.state.frontLeft)
    })
    .then(function (response) {
      //if it's a good response, update local state to match
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      //alert(error.response + ' - ' + error.response.statusText);
    });
  }


    /*
        *************** Front right heater button **************
    */
  frontRightHeater(){
    this.refreshGlobalTimerWhenAction();
    switch(this.state.frontRight){
      case 0:
      default:
        this.setState({ frontRight: 3 });
        break;
      case 1:
      case 2:
      case 3:
      this.setState({ frontRight: this.state.frontRight-1 });
        break;
    }
    var newStore = store.getState();
    newStore.state.vehicleDataObject.climate_state.seat_heater_right = this.state.frontRight;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(1),
      level: JSON.stringify(this.state.frontRight)
    })
    .then(function (response) {
      //if it's a good response, update local state to match
      
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      //alert(error.response + ' - ' + error.response.statusText);
    });
  }


  /*
      *************** Rear right heater button **************
  */
  rearRightHeater(){
    this.refreshGlobalTimerWhenAction();
    switch(this.state.rearRight){
      case 0:
      default:
        this.setState({ rearRight: 3 });
        break;
      case 1:
      case 2:
      case 3:
      this.setState({ rearRight: this.state.rearRight-1 });
        break;
    }
    var newStore = store.getState();
    newStore.state.vehicleDataObject.climate_state.seat_heater_rear_right = this.state.rearRight;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(5),
      level: JSON.stringify(this.state.rearRight)
    })
    .then(function (response) {
      //if it's a good response, update local state to match
      
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      //alert(error.response + ' - ' + error.response.statusText);
    });
  }

  /*
      *************** Rear left heater button **************
  */
 rearLeftHeater(){
  this.refreshGlobalTimerWhenAction();
  switch(this.state.rearLeft){
    case 0:
    default:
      this.setState({ rearLeft: 3 });
      break;
    case 1:
    case 2:
    case 3:
    this.setState({ rearLeft: this.state.rearLeft-1 });
      break;
  }
  var newStore = store.getState();
  newStore.state.vehicleDataObject.climate_state.seat_heater_rear_left = this.state.rearLeft;
  store.dispatch({
    type: 'UPDATE_OBJECT',
    payload: {
      vehicleDataObject: newStore.state.vehicleDataObject
    }
  })
  axios.post('/seatHeating', {
    auth: JSON.stringify(this.state.localOptions),
    seat: JSON.stringify(2),
    level: JSON.stringify(this.state.rearLeft)
  })
  .then(function (response) {
    //if it's a good response, update local state to match
    
  })
  .catch(function (error) {
    //alert(JSON.stringify(error))
    //alert(error.response + ' - ' + error.response.statusText);
  });
  }

  /*
      *************** Rear middle heater button **************
  */
  rearMidHeater(){
    this.refreshGlobalTimerWhenAction();
    switch(this.state.rearCenter){
      case 0:
      default:
        this.setState({ rearCenter: 3 });
        break;
      case 1:
      case 2:
      case 3:
      this.setState({ rearCenter: this.state.rearCenter-1 });
        break;
    }
    var newStore = store.getState();
    newStore.state.vehicleDataObject.climate_state.seat_heater_rear_center = this.state.rearCenter;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(4),
      level: JSON.stringify(this.state.rearCenter)
    })
    .then(function (response) {
      //if it's a good response, update local state to match
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      //alert(error.response + ' - ' + error.response.statusText);
    });
  }

  render(){
    return(
      <div>
        <Modal show={this.props.showClimate} handleClose={this.hideClimateModal}>
          <div className="modal-content">
            <div className="modal--close">
              <button onClick={this.hideClimateModal} id="modal--climate_close" className="modal--close_button"><i className="fas fa-times"></i></button>
            </div>
            <div className="modal--climate_controls">
              <p id="climate--temp_level" className="modal--level_text">
                Climate: {this.props.unitDecider ? parseFloat(this.props.vehicleClimateNum).toFixed(1) : parseFloat(this.props.vehicleClimateNum*(9/5)+32).toFixed(1)}{this.props.vehicleClimateUnit}
              </p>
                <div className='modal--slider'>
                  <Slider
                    value={this.props.vehicleClimateNum}
                    min={this.props.vehicleClimateMin} //these are in celsius
                    max={this.props.vehicleClimateMax} 
                    onChange={this.handleClimateChange}
                    onChangeComplete={this.applyClimateSettings}
                    tooltip={false}
                    step={0.1}/>
                </div>
              

              <button id="climate--control" className="btn btn--modal_btn" onClick={this.climateOnButton}>Turn Climate Control {this.props.vehicleClimate ? 'Off' : 'On'}</button>
              <div id="climate--seat_warmers" className="climate--seat_warmers">
                <div className="climate--seats climate--front_seats">
                    <button id="climate--seat_fl" className={'climate--seat_btn_level_'+this.props.seatLeft} onClick={this.frontLeftHeater} >
                      <i className="climate--img fas fa-fire-alt"></i>
                    </button>
                    <button id="climate--seat_fr" className={'climate--seat_btn_level_'+this.props.seatRight} onClick={this.frontRightHeater} >
                      <i className="climate--img fas fa-fire-alt"></i>
                    </button>
                </div>
                <div className="climate--seats climate--back_seats">
                    <button id="climate--seat_bl" className={'climate--seat_btn_level_'+this.props.seatLeftRear} onClick={this.rearLeftHeater}>
                      <i className="climate--img fas fa-fire-alt"></i>
                    </button>
                    <button id="climate--seat_bm" className={'climate--seat_btn_level_'+this.props.seatMidRear} onClick={this.rearMidHeater}>
                      <i className="climate--img fas fa-fire-alt"></i
                    ></button>
                    <button id="climate--seat_br" className={'climate--seat_btn_level_'+this.props.seatRightRear} onClick={this.rearRightHeater}>
                      <i className="climate--img fas fa-fire-alt"></i>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'block' : 'none';
    return (
        <div className='modal' style={{display: showHideClassName}}>
        {children}
    </div>
    );
  };

const mapStateToProps = (state) => {
    return {
      vehicleClimate: state.state.vehicleDataObject.climate_state.is_climate_on,
      vehicleClimateNum: state.state.vehicleDataObject.climate_state.driver_temp_setting,
      vehicleClimateNum2: state.state.vehicleDataObject.climate_state.passenger_temp_setting,
      vehicleClimateMax: state.state.vehicleDataObject.climate_state.max_avail_temp,
      vehicleClimateMin: state.state.vehicleDataObject.climate_state.min_avail_temp,
      seatLeft: state.state.vehicleDataObject.climate_state.seat_heater_left,
      seatRight: state.state.vehicleDataObject.climate_state.seat_heater_right,
      seatLeftRear: state.state.vehicleDataObject.climate_state.seat_heater_rear_left,
      seatMidRear: state.state.vehicleDataObject.climate_state.seat_heater_rear_center,
      seatRightRear: state.state.vehicleDataObject.climate_state.seat_heater_rear_right,
      globalTimerInterval: state.state.refreshInterval,
      localOptionsProp: state.state.localOptions,
      showClimate: state.state.showClimateModal,
      unitDecider: state.state.unitDecider,
      vehicleClimateUnit: state.state.vehicleDataObject.gui_settings.gui_temperature_units
    }
  }

export default connect(mapStateToProps)(ClimateModal);