import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      show: true
    };
  }
  render(){
    return(
      <div>
        <header className="container--header">
          <div className="container--car_info">
              <h1>{this.props.vehicleDataName}</h1>
              <p>Battery Level: {this.props.vehicleDataBatteryLevel}%</p>
          </div>
        </header>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleDataName: state.state.vehicleDataObject.display_name,
    vehicleDataBatteryLevel: state.state.vehicleDataObject.charge_state.usable_battery_level
  }
}

export default connect(mapStateToProps)(Header);