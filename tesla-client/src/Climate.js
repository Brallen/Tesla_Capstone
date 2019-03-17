import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';

class ClimateModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: this.props.vehicleClimateNum,
      multiplier: 1,
      frontLeft: this.props.seatLeft,
      frontRight: this.props.seatRight,
      rearLeft: this.props.seatLeftRear,
      rearCenter: this.props.seatMidRear,
      rearRight: this.props.seatRightRear
    };
    this.handleClimateChange = this.handleClimateChange.bind(this);
    this.frontLeftHeater = this.frontLeftHeater.bind(this);
    this.frontRightHeater = this.frontRightHeater.bind(this);
    this.rearRightHeater = this.rearRightHeater.bind(this);
    this.rearLeftHeater = this.rearLeftHeater.bind(this);
    this.rearMidHeater = this.rearMidHeater.bind(this);
  }

  showClimateModal = () => {
    this.setState({ showClimate: true });
  }

  hideClimateModal = () => {
    this.setState({ showClimate: false });
  }

  handleClimateChange (evt) {
    var newStore = store.getState();
    newStore.state.vehicleDataObject.climate_state.driver_temp_setting = this.state.value;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
    this.setState({ value: evt.target.value });

    //api call here? Maybe delay the call every time handleClimateChange is called and call it a few seconds afterwards
  }

  climateOnButton(){
    /* make api call here */
    var newStore = store.getState();
    newStore.state.vehicleDataObject.climate_state.is_climate_on = !newStore.state.vehicleDataObject.climate_state.is_climate_on;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
  }


  /*
      *************** Front left heater button **************
  */
  frontLeftHeater(){
    switch(this.state.frontLeft){
      case 0:
      case 1:
      case 2:
        this.setState({ frontLeft: this.state.frontLeft+1});
        break;
      case 3:
      default:
        this.setState({ frontLeft: 0 });
        break;
    }
    
      // API CALL HERE
      var newStore = store.getState();
      newStore.state.vehicleDataObject.climate_state.seat_heater_left = this.state.frontLeft;
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })
  }


    /*
        *************** Front right heater button **************
    */
  frontRightHeater(){
    switch(this.state.frontRight){
      case 0:
      case 1:
      case 2:
        this.setState({ frontRight: this.state.frontRight+1});
        break;
      case 3:
      default:
        this.setState({ frontRight: 0 });
        break;
    }
    
      // API CALL HERE
      var newStore = store.getState();
      newStore.state.vehicleDataObject.climate_state.seat_heater_right = this.state.frontRight;
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })
  }


  /*
      *************** Rear right heater button **************
  */
  rearRightHeater(){
    switch(this.state.rearRight){
      case 0:
      case 1:
      case 2:
        this.setState({ rearRight: this.state.rearRight+1});
        break;
      case 3:
      default:
        this.setState({ rearRight: 0 });
        break;
    }
    
      // API CALL HERE
      var newStore = store.getState();
      newStore.state.vehicleDataObject.climate_state.seat_heater_rear_right = this.state.rearRight;
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })
  }

  /*
      *************** Rear left heater button **************
  */
 rearLeftHeater(){
  switch(this.state.rearLeft){
    case 0:
    case 1:
    case 2:
      this.setState({ rearLeft: this.state.rearLeft+1});
      break;
    case 3:
    default:
      this.setState({ rearLeft: 0 });
      break;
  }
  
    // API CALL HERE
    var newStore = store.getState();
    newStore.state.vehicleDataObject.climate_state.seat_heater_rear_left = this.state.rearLeft;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
  }

  /*
      *************** Rear middle heater button **************
  */
 rearMidHeater(){
  switch(this.state.rearMid){
    case 0:
    case 1:
    case 2:
      this.setState({ rearMid: this.state.rearMid+1});
      break;
    case 3:
    default:
      this.setState({ rearMid: 0 });
      break;
  }
  
    // API CALL HERE
    var newStore = store.getState();
    newStore.state.vehicleDataObject.climate_state.seat_heater_rear_center = this.state.rearMid;
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
        <Modal show={this.state.showClimate} handleClose={this.hideClimateModal}>
          <div className="modal-content">
            <div className="modal--close">
              <button onClick={this.hideClimateModal} id="modal--climate_close" className="modal--close_button"><i className="fas fa-times"></i></button>
            </div>
            <div className="modal--climate_controls">
              <p id="climate--temp_level" className="modal--level_text">Climate: {this.props.vehicleClimateNum}{this.props.vehicleClimateUnit}</p>

              <input type="range" 
                min={this.props.vehicleClimateMin} //these are in celsius
                max={this.props.vehicleClimateMax} 
                value={this.props.vehicleClimateNum} 
                onChange={this.handleClimateChange} 
                id="climate--temp_slider" 
                className="modal--slider"/>

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

        <li className="item--control_btn"><button onClick={this.showClimateModal} id="modal--climate_open" className="btn btn--control_btn">Climate</button></li>
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
      vehicleClimateMax: state.state.vehicleDataObject.climate_state.max_avail_temp,
      vehicleClimateMin: state.state.vehicleDataObject.climate_state.min_avail_temp,
      vehicleClimateUnit: state.state.vehicleDataObject.gui_settings.gui_temperature_units,
      seatLeft: state.state.vehicleDataObject.climate_state.seat_heater_left,
      seatRight: state.state.vehicleDataObject.climate_state.seat_heater_right,
      seatLeftRear: state.state.vehicleDataObject.climate_state.seat_heater_rear_left,
      seatMidRear: state.state.vehicleDataObject.climate_state.seat_heater_rear_center,
      seatRightRear: state.state.vehicleDataObject.climate_state.seat_heater_rear_right
    }
  }

export default connect(mapStateToProps)(ClimateModal);