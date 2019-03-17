import React, { Component } from 'react';
import { connect } from 'react-redux';
import {store} from './store/index.js';

class ChargingModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showCharge: false,
      value: this.props.vehicleCharge
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
    var newStore = store.getState();
    newStore.state.vehicleDataObject.charge_state.charge_limit_soc = this.state.value;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
    this.setState({ value: evt.target.value });

    //api call here? Maybe delay the call every time handleClimateChange is called and call it a few seconds afterwards
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
                    id="charging--charge_slider" 
                    className="modal--slider"/>

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
      vehicleCharge: state.state.vehicleDataObject.charge_state.charge_limit_soc
    }
  }
export default connect(mapStateToProps)(ChargingModal);