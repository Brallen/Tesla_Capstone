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
      showCharge: false,
      maxCharge: 50,
      localOptions: {}
    };
    this.refreshGlobalTimerWhenAction = this.refreshGlobalTimerWhenAction.bind(this);
    this.handleChargeChange = this.handleChargeChange.bind(this);
    this.applyChargeSettings = this.applyChargeSettings.bind(this);
    this.chargePortButton = this.chargePortButton.bind(this);
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

  showChargeModal = () => {
    this.setState({ showCharge: true });
  }

  hideChargeModal = () => {
    this.setState({ showCharge: false });
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
      maxCharge: parseFloat(value) 
    });
    newStore.state.vehicleDataObject.charge_state.charge_limit_soc = parseFloat(this.state.maxCharge);
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
  }

  applyChargeSettings(){
    this.refreshGlobalTimerWhenAction();
    //make API call here to send the max charge setting
    //see comment above handleChargeChange()
    axios.post('/chargeLimit', {
      auth: JSON.stringify(this.state.localOptions),
      value: parseFloat(this.state.maxCharge)
    })
    .then(function (response) {
      //if it's a good response, update local state
      alert("charge limit changed");
    })
    .catch(function (error) {
      alert(error.response.data + ' - ' + error.response.statusText);
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
        alert(error.response.data + ' - ' + error.response.statusText);
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
        alert(error.response.data + ' - ' + error.response.statusText);
      });
    }
  }

  render(){
    return(
      <div>
          <Modal show={this.state.showCharge} handleClose={this.hideChargeModal}>
            <div className="modal-content">
              <div className="modal--close">
                <button onClick={this.hideChargeModal}id="modal--charging_close" className="modal--close_button"><i className="fas fa-times"></i></button>
              </div>
              <div className="modal--charging_controls">
                <p id="charging--charge_level" className="modal--level_text">Max Charge: {parseFloat(this.props.vehicleCharge).toFixed(1)}%</p>
                  <div className="modal--slider">
                    <Slider
                        value={this.props.vehicleCharge}
                        min={this.props.vehicleChargeMin}
                        max={this.props.vehicleChargeMax} 
                        onChange={this.handleChargeChange}
                        onChangeComplete={this.applyChargeSettings}
                        tooltip={false}
                        step={0.1}/>
                  </div>
                  
                  <button onClick={this.chargePortButton} id="charging--charge_port" className="btn btn--modal_btn">
                    {this.props.vehicleChargeDoor ? 'Close Charge Port' : 'Open Charge Port'}
                  </button>
              </div>
            </div>
          </Modal>
          <li className="item--control_btn"><button onClick={this.showChargeModal} id="modal--charging_open" className="btn btn--control_btn">Charging</button></li>
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
      localOptionsProp: state.state.localOptions
    }
  }
export default connect(mapStateToProps)(ChargingModal);