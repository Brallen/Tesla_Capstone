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
    this.openMenu = this.openMenu.bind(this);
  }

  logout(){
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showLogoutPrompt: true
      }
    })
  }

  openMenu(){
    var newStore = store.getState();
    newStore.state.showLogoutButton = !newStore.state.showLogoutButton;
    store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          showLogoutButton: newStore.state.showLogoutButton
        }
      })
  }

  render(){
    return(
      <div>
        <header className="container--header">
          <div className="container--car_info">
              <h1>{this.props.vehicleDataName}</h1>
              {this.props.vehicleLoaded ? 
                <p>{(this.props.vehicleCharging === 'Charging') ? <i className="fas fa-bolt"/> : null} Battery Level: {this.props.vehicleDataBatteryLevel}%</p>
              : null }
              {this.props.vehicleLoaded ? 
                <p>Estimated Range: {this.props.vehicleDataRangeLeft.toFixed(0)} Miles</p>
              : null }
              <div className="container--logout_menu">
                <button onClick={() => this.logout()}>
                    <i className="fas fa-sign-out-alt"></i>
                </button>
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
    vehicleCharging: state.state.vehicleDataObject.charge_state.charging_state,
    logoutButtonProp: state.state.showLogoutButton
  }
}

export default connect(mapStateToProps)(Header);