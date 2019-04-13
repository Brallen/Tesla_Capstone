import React, { Component } from 'react';
import { connect } from 'react-redux';
import {store} from './store/index.js';
import Slider from 'react-rangeslider';
import axios from 'axios';
import 'react-rangeslider/lib/index.css';

class ChargingModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      maxCharge: 50,
      localOptions: {}
    };
    this.refreshGlobalTimerWhenAction = this.refreshGlobalTimerWhenAction.bind(this);
    this.handleChargeChange = this.handleChargeChange.bind(this);
    this.applyChargeSettings = this.applyChargeSettings.bind(this);
    this.chargePortButton = this.chargePortButton.bind(this);
    this.chargingButton = this.chargingButton.bind(this);
    this.showError = this.showError.bind(this);
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

  showError(text){
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showErrorPrompt: true,
        showChargingModal: false,
        errorText: text
      }
    })
  }


  hideChargeModal = () => {
    var newStore = store.getState();
    newStore.state.showChargingModal = false;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showChargingModal: newStore.state.showChargingModal
      }
    })
  }

  /*
    this runs every time the slider is moved
    this is because in order for the view to be updated client side we need to
    update the corresponding data. This means if we call the API in this function
    we are going to be flooding the server with API commands
  */
  handleChargeChange (value) {
    this.refreshGlobalTimerWhenAction();
    var newStore = store.getState();
    this.setState({
      maxCharge: parseInt(value)
    });
    newStore.state.vehicleDataObject.charge_state.charge_limit_soc = parseInt(this.state.maxCharge);
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
  }

  applyChargeSettings(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    //make API call here to send the max charge setting
    //see comment above handleChargeChange()
    axios.post('/chargeLimit', {
      auth: JSON.stringify(this.state.localOptions),
      value: parseInt(this.state.maxCharge)
    })
    .then(function (response) {
      //if it's a good response, update local state
      alert("charge limit changed");
    })
    .catch(function (error) {
      self.showError(JSON.stringify(error.response.data + " - " + error.response.statusText));
      //error lets repull our data and ensure its back to normal
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



  chargePortButton(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    //if the charge door is open then send close command
    if(this.props.vehicleChargeDoor === true){
      axios.post('/closeChargePort', {
        auth: JSON.stringify(this.state.localOptions)
      })
      .then(function (response) {
        //if it's a good response, update local state
        var newStore = store.getState();
        newStore.state.vehicleDataObject.charge_state.charge_port_door_open = false;
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
            vehicleDataObject: newStore.state.vehicleDataObject
          }
        })
      })
      .catch(function (error) {
        self.showError(JSON.stringify(error.response.data + " - " + error.response.statusText));
      });
    }
    //if the charge port door is closed then send open command
    if(this.props.vehicleChargeDoor === false){
      axios.post('/openChargePort', {
        auth: JSON.stringify(this.state.localOptions)
      })
      .then(function (response) {
        //if it's a good response, update local state
        var newStore = store.getState();
        newStore.state.vehicleDataObject.charge_state.charge_port_door_open = true;
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
            vehicleDataObject: newStore.state.vehicleDataObject
          }
        })
      })
      .catch(function (error) {
        self.showError(JSON.stringify(error.response.data + " - " + error.response.statusText));
      });
    }
  }


  chargingButton(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    //if it's not charging
    if(this.props.vehicleCharging === 'Stopped'){
        axios.post('/startCharge', {
            auth: JSON.stringify(this.state.localOptions)
        }).then(function(response) {
            var newStore = store.getState();
            newStore.state.vehicleDataObject.charge_state.charging_state = 'Charging';
            store.dispatch({
                type: 'UPDATE_OBJECT',
                payload: {
                    vehicleDataObject: newStore.state.vehicleDataObject
                }
            })
        }).catch(function(error) {
            self.showError(JSON.stringify(error.response.data + " - " + error.response.statusText));
        });
    }
    if(this.props.vehicleCharging === 'Charging'){
        axios.post('/stopCharge', {
            auth: JSON.stringify(this.state.localOptions)
        }).then(function(response) {
            var newStore = store.getState();
            newStore.state.vehicleDataObject.charge_state.charging_state = 'Disconnected';
            store.dispatch({
                type: 'UPDATE_OBJECT',
                payload: {
                    vehicleDataObject: newStore.state.vehicleDataObject
                }
            })
        }).catch(function(error) {
            self.showError(JSON.stringify(error.response.data + " - " + error.response.statusText));
        });
    }
  }

  render(){
    return(
      <div>
          <Modal show={this.props.showCharge} handleClose={this.hideChargeModal}>
            <div className="modal-content">
              <div className="modal--close">
                <button onClick={this.hideChargeModal}id="modal--charging_close" className="modal--close_button"><i className="fas fa-times"></i></button>
              </div>
              <div className="modal--charging_controls">
                <p id="charging--charge_level" className="modal--level_text">Max Charge: {parseInt(this.props.vehicleCharge)}%</p>
                  <div className="modal--slider">
                    <Slider
                        value={this.props.vehicleCharge}
                        min={this.props.vehicleChargeMin}
                        max={this.props.vehicleChargeMax}
                        onChange={this.handleChargeChange}
                        onChangeComplete={this.applyChargeSettings}
                        tooltip={false}
                        step={1}/>
                  </div>

                  { (this.props.vehicleCharging !== 'Charging') ?
                      <button onClick={this.chargePortButton} id="charging--charge_port" className="btn btn--modal_btn">
                        {this.props.vehicleChargeDoor ? 'Open Charge Port' : null}
                        {(this.props.chargePortLatch === 'Disengaged' && !this.props.vehicleChargeDoor) ? 'Close Charge Port' : null}
                        {(this.props.chargePortLatch === 'Engaged' && this.props.vehicleCharging === 'Stopped') ? 'Disengage Charger Latch' : null}
                      </button>
                      : null
                  }

                  { (this.props.vehicleCharing !== 'Disconnected') ?
                      <button onClick={this.chargingButton} id="charging--charge_port" className="btn btn--modal_btn">
                        {(this.props.vehicleCharging === 'Charging') ? 'Stop Charge' : null}
                        {(this.props.vehicleCharging === 'Stopped') ? 'Start Charge' : null}
                      </button>
                      : null
                  }
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
      vehicleChargeDoor: state.state.vehicleDataObject.charge_state.charge_port_door_open,
      vehicleChargeMax: state.state.vehicleDataObject.charge_state.charge_limit_soc_max,
      vehicleChargeMin: state.state.vehicleDataObject.charge_state.charge_limit_soc_min,
      vehicleCharge: state.state.vehicleDataObject.charge_state.charge_limit_soc,
      globalTimerInterval: state.state.refreshInterval,
      localOptionsProp: state.state.localOptions,
      showCharge: state.state.showChargingModal,
      vehicleCharging: state.state.vehicleDataObject.charge_state.charging_state,
      chargePortLatch: state.state.vehicleDataObject.charge_state.charge_port_latch
    }
  }
export default connect(mapStateToProps)(ChargingModal);
