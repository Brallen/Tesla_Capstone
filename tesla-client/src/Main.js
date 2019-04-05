import React, { Component } from 'react';
import LoginModal from './Login';
import Image from './Image';
import ControlModal from './Control';
import MediaModal from './Media';
import ClimateModal from './Climate';
import ChargingModal from './Charge';
import Timer from './Timer'
import {store} from './store/index.js';
import {connect} from 'react-redux';

import PasswordPrompt from './PasswordPrompt.js';
import LogoutPrompt from './LogoutPrompt.js';

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
    this.testFunc = this.testFunc.bind(this);
  }

  alertStoreFunc(){
    alert(JSON.stringify(store.getState()));
  }

  testFunc(){
    var newStore = store.getState();
    newStore.state.showPasswordPrompt = true;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showPasswordPrompt: newStore.state.showPasswordPrompt
      }
    })
  }


  render(){
    return(
      <div>
        <main className="container--main_section">
          <Image/>
          <div className="container--control_btn">
            <ul className="list--control_btn" id="modal--control_open"><ControlModal/></ul>
            <ul className="list--control_btn" id="modal--media_open"><MediaModal/></ul>
            <ul className="list--control_btn" id="modal--climate_open"><ClimateModal/></ul>
            <ul className="list--control_btn" id="modal--charging_open"><ChargingModal/></ul>  
            <ul className="list--control_btn" id="modal--do_what_i_want">
              <li className="item--control_btn">
                <button onClick={this.alertStoreFunc} id="modal--store" className="btn btn--control_btn">Get State</button>
                <button onClick={this.testFunc} id="modal--test" className="btn btn--control_btn">Test Button</button>
              </li>
            </ul>  
          </div>

          
          <LoginModal/>
          <Timer />
          <PasswordPrompt/>
          <LogoutPrompt/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountName: state.state.accountName,
    accountPass: state.state.accountPass,
    accountToken: state.state.accountToken,
    vehicleDataName: state.state.vehicleDataObject.display_name,
    loginState: state.state.initialVehicleLoginObject,
    vehicleSunroof: state.state.vehicleDataObject.vehicle_state.sun_roof_percent_open
  }
}



export default connect(mapStateToProps)(Main);