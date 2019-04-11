import React, { Component } from 'react';
import { connect } from 'react-redux';
import {store} from './store/index.js';

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      show: true
    };
    this.logout = this.logout.bind(this);
  }

  logout(){
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showLogoutPrompt: true
      }
    })
  }

  render(){
    return(
      <div>
        <header className={`container--header ${this.state.modalIsShowing ? "modal-showing" : ""}`}>
          <div className="container--car_info">
              <h1>{this.props.vehicleDataName}</h1>
              {this.props.vehicleLoaded ? 
                <p>Battery Level: {this.props.vehicleDataBatteryLevel}%</p>
              : null }
              {this.props.vehicleLoaded ? 
                <p>Estimated Range: {this.props.vehicleDataRangeLeft.toFixed(0)} Miles</p>
              : null }
              <div className="container--logout_menu">
                <button className="btn logout-button" onClick={() => this.logout()}>Sign Out</button>
              </div>
          </div>
        </header>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleDataName: state.state.vehicleDataObject.display_name,
    vehicleDataBatteryLevel: state.state.vehicleDataObject.charge_state.usable_battery_level,
    vehicleDataRangeLeft: state.state.vehicleDataObject.charge_state.est_battery_range,
    vehicleLoaded: state.state.initialVehicleLoaded,
    modalIsShowing: state.state.modalIsShowing
  }
}

export default connect(mapStateToProps)(Header);