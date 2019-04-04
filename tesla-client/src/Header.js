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
        accountName: '',
        accountPass: '',
        loggedIn: false,
        showLogin: true,
        mobileAccess: true,
        localOptions: {
            authToken: '',
            vehicleID: '',
            vehicle_id: '',
            tokens: []
        },
        accountToken: '',
        initialVehicleLoginObject: {},
        refreshTime: 5,
        refreshInterval: 5,
        vehicleDataObject: {
          display_name: 'Waking up vehicle...',
          climate_state: {},
          charge_state: {},
          gui_settings: {},
          vehicle_state: {},
          vehicle_config: {},
          drive_state: {}
        }
      }
    });
  }

  render(){
    return(
      <div>
        <header className="container--header">
          <div className="container--car_info">
              <h1>{this.props.vehicleDataName}</h1>
              <p>Battery Level: {this.props.vehicleDataBatteryLevel}%</p>
              <p>Estimated Range: {this.props.vehicleDataRangeLeft.toFixed(0)} Miles</p>
              <div class="container--logout_menu">
                <button className="btn logout-button" onClick={() => this.logout()}>Logout</button>
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
    vehicleDataRangeLeft: state.state.vehicleDataObject.charge_state.est_battery_range
  }
}

export default connect(mapStateToProps)(Header);