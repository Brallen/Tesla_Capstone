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
    this.nextHeatLevel = this.nextHeatLevel.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
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
    newStore.state.vehicleDataObject.climate_state.driver_temp_setting = parseFloat(value);
    newStore.state.vehicleDataObject.climate_state.passenger_temp_setting = parseFloat(value);

    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
  }

  applyClimateSettings(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    //make API call here to send the temperature setting
    //see comment above handleClimateChange()
    axios.post('/setTemp', {
      auth: JSON.stringify(this.state.localOptions),
      temp: parseFloat(this.state.temperature.toFixed(1))
    })
    .then(function (response) {
      //if it's a good response, state is already updated!
    })
    .catch(function (error) {
      self.showError("Error: Could not set the vehicle cabin temperature");
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
    var self = this;
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
      })
      .catch(function (error) {
        self.showError("Error: Could not turn off the vehicle climate");
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
      })
      .catch(function (error) {
        self.showError("Error: Could not turn on the vehicle climate");
      });
    }
  }

  nextHeatLevel(heatVal){
    if(heatVal === 0){
      return 3;
    }
    if(heatVal === 1){
      return 0;
    }
    if(heatVal === 2){
      return 1; 
    }
    if(heatVal === 3){
      return 2;
    }
  }

  showError(text){
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showErrorPrompt: true,
        errorText: text
      }
    })
  }


  /*
      *************** Front left heater button **************
  */
  frontLeftHeater(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    //do our api call with the next seat heater level

    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(0),
      level: JSON.stringify(this.nextHeatLevel(this.props.seatLeft))
    })
    .then(function (response) {
      //if it's a good response, update local state
      var newStore = store.getState();
      newStore.state.vehicleDataObject.climate_state.seat_heater_left = self.nextHeatLevel(self.props.seatLeft);
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })
    })
    .catch(function (error) {
      self.showError("Error: Could not set the front left seat heater to level: "+self.nextHeatLevel(self.props.seatLeft));
    });
  }


    /*
        *************** Front right heater button **************
    */
  frontRightHeater(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    //do our api call with the updated seat heater level
    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(1),
      level: JSON.stringify(this.nextHeatLevel(this.props.seatRight))
    })
    .then(function (response) {
      //if it's a good response, update local state to match
      var newStore = store.getState();
      newStore.state.vehicleDataObject.climate_state.seat_heater_right = self.nextHeatLevel(self.props.seatRight);
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })
    })
    .catch(function (error) {
      self.showError("Error: Could not set the front right seat heater to level: "+self.nextHeatLevel(self.props.seatRight));
    });
  }


  /*
      *************** Rear right heater button **************
  */
  rearRightHeater(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    //do our api call with the updated seat heater level
    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(5),
      level: JSON.stringify(this.nextHeatLevel(this.props.seatRightRear))
    })
    .then(function (response) {
      //if it's a good response, update local state to match
      var newStore = store.getState();
      newStore.state.vehicleDataObject.climate_state.seat_heater_rear_right = self.nextHeatLevel(self.props.seatRightRear);
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })
    })
    .catch(function (error) {
      self.showError("Error: Could not set the rear right seat heater to level: "+self.nextHeatLevel(self.props.seatRightRear));
    });
  }

  /*
      *************** Rear left heater button **************
  */
 rearLeftHeater(){
  this.refreshGlobalTimerWhenAction();
    var self = this;
    //do our api call with the updated seat heater level
    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(2),
      level: JSON.stringify(this.nextHeatLevel(this.props.seatLeftRear))
    })
    .then(function (response) {
      //if it's a good response, update local state to match
      var newStore = store.getState();
      newStore.state.vehicleDataObject.climate_state.seat_heater_rear_left = self.nextHeatLevel(self.props.seatLeftRear);
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })
    })
    .catch(function (error) {
      self.showError("Error: Could not set the rear left seat heater to level: "+self.nextHeatLevel(self.props.seatLeftRear));
    });
  }

  /*
      *************** Rear middle heater button **************
  */
  rearMidHeater(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    //do our api call with the updated seat heater level
    axios.post('/seatHeating', {
      auth: JSON.stringify(this.state.localOptions),
      seat: JSON.stringify(4),
      level: JSON.stringify(this.nextHeatLevel(this.props.seatMidRear))
    })
    .then(function (response) {
      //if it's a good response, update local state to match
      var newStore = store.getState();
      newStore.state.vehicleDataObject.climate_state.seat_heater_rear_center = self.nextHeatLevel(self.props.seatMidRear);
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })
    })
    .catch(function (error) {
      self.showError("Error: Could not set the rear middle seat heater to level: "+self.nextHeatLevel(self.props.seatMidRear));
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
                Climate: {(this.props.vehicleClimateUnit === 'F') ? 
                  parseFloat(this.props.vehicleClimateNum*(9/5)+32).toFixed(1) : 
                  parseFloat(this.props.vehicleClimateNum).toFixed(1)}{this.props.vehicleClimateUnit}
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
                      <i className="climate--img fas fa-fire-alt"></i>
                    </button>
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
      vehicleClimateUnit: state.state.vehicleDataObject.gui_settings.gui_temperature_units
    }
  }

export default connect(mapStateToProps)(ClimateModal);