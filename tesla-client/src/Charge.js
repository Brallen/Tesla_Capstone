import React, { Component } from 'react';
import { connect } from 'react-redux';
import {store} from './store/index.js';

class ChargingModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showCharge: false,
      maxCharge: this.props.vehicleCharge
    };
    this.handleChargeChange = this.handleChargeChange.bind(this);
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
  handleChargeChange (evt) {
    var newStore = store.getState();
    newStore.state.vehicleDataObject.charge_state.charge_limit_soc = this.state.maxCharge;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
    this.setState({ maxCharge: parseFloat(evt.target.value) });
  }

  applyChargeSettings(){
    //make API call here to send the max charge setting
    //see comment above handleChargeChange()
    alert('temp - applying max charge setting')
  }



  chargePortButton(){
    /* make api call here */
    var newStore = store.getState();
    newStore.state.vehicleDataObject.charge_state.charge_port_door_open = !newStore.state.vehicleDataObject.charge_state.charge_port_door_open;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
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
                <p id="charging--charge_level" className="modal--level_text">Max Charge: {this.props.vehicleCharge}%</p>
                  <input type="range" 
                    min={this.props.vehicleChargeMin} 
                    max={this.props.vehicleChargeMax} 
                    value={this.props.vehicleCharge} 
                    onChange={this.handleChargeChange} 
                    step={0.1}
                    id="charging--charge_slider" 
                    className="modal--slider"/>
                  <button onClick={this.chargePortButton} id="charging--charge_port" className="btn btn--modal_btn">
                    {this.props.vehicleChargeDoor ? 'Close Charge Port' : 'Open Charge Port'}
                  </button>
                  <button onClick={this.applyChargeSettings} id="charging--apply_settings" className="btn btn--modal_btn">
                    Apply Settings
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
      vehicleCharge: state.state.vehicleDataObject.charge_state.charge_limit_soc
    }
  }
export default connect(mapStateToProps)(ChargingModal);