import React, { Component } from 'react';
import LoginModal from './Login';
import Image from './Image';
import ControlModal from './Control';
import MediaModal from './Media';
import ClimateModal from './Climate';
import ChargingModal from './Charge';
import {store} from './store/index.js';
import {connect} from 'react-redux';

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  alertStoreFunc(){
    alert(JSON.stringify(store.getState()));
  }

  testFunc(){
    var newStore = store.getState();
    newStore.state.vehicleDataObject.gui_settings.gui_temperature_units = 'F';
    newStore.state.vehicleDataObject.vehicle_state.sun_roof_percent_open = 10;
    newStore.state.vehicleDataObject.display_name = 'sunroof now exists and climate set to F';
    //alert(JSON.stringify(newStore.state.vehicleDataObject));
    /*
      you cannot dispatch a whole new state object as it will cause everything to fall
      out of scope that is reading the state.
    */
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
    vehicleSunroof: state.state.vehicleDataObject.vehicle_state.sun_roof_percent_open
  }
}



export default connect(mapStateToProps)(Main);