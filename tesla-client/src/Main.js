import React, { Component } from 'react';
import LoginModal from './Login';
import Image from './Image';
import ControlModal from './Control';
import MediaModal from './Media';
import ClimateModal from './Climate';
import ChargingModal from './Charge';
import Diagnostics from './Diagnostics';
import Header from './Header';
import Timer from './Timer'
import {store} from './store/index.js';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';
import PasswordPrompt from './PasswordPrompt.js';
import LogoutPrompt from './LogoutPrompt.js';
import ConfirmationPrompt from './ConfirmationModal.js';

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
    this.testFunc = this.testFunc.bind(this);
    this.showControls = this.showControls.bind(this);
    this.showMedia = this.showMedia.bind(this);
    this.showClimate = this.showClimate.bind(this);
    this.showCharging = this.showCharging.bind(this);
    this.showDiagnostics = this.showDiagnostics.bind(this);
  }

  alertStoreFunc(){
    alert(JSON.stringify(store.getState()));
  }

  testFunc(){
    let { cookies } = this.props;
    let useCookie = cookies.get("token");
    let useCookieRefresh = cookies.get('refreshToken');
    alert("auth token: " + useCookie);
    alert("refresh token: " + useCookieRefresh);
  }

  showControls(){
    var newStore = store.getState();
    newStore.state.showControlModal = true;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showControlModal: newStore.state.showControlModal
      }
    })
  }

  showMedia(){
    var newStore = store.getState();
    newStore.state.showMediaModal = true;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showMediaModal: newStore.state.showMediaModal
      }
    })
  }


  showClimate(){
    var newStore = store.getState();
    if(this.props.vehicleClimateUnit === 'F'){
      newStore.state.unitDecider = false;
    }
    if(this.props.vehicleClimateUnit === 'C'){
      newStore.state.unitDecider = true;
    }
    newStore.state.showClimateModal = true;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showClimateModal: newStore.state.showClimateModal,
        unitDecider: newStore.state.unitDecider
      }
    })
  }

  showCharging(){
    var newStore = store.getState();
    newStore.state.showChargingModal = true;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showChargingModal: newStore.state.showChargingModal
      }
    })
  }

  showDiagnostics(){
    var newStore = store.getState();
    newStore.state.showDiagnosticsModal = true;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showDiagnosticsModal: newStore.state.showDiagnosticsModal
      }
    })
  }


  render(){
    return(
      <div>
        <Header/>
        <main className="container--main_section">
          <Image/>
          <div className="container--control_btn">
            <ul className="list--control_btn">
              {this.props.vehicleLoaded ? 
                <li className="item--control_btn"><button onClick={this.showControls} id="modal--control_open" className="btn btn--control_btn">Controls</button></li>
              : null}
              {this.props.vehicleLoaded ? 
                <li className="item--control_btn"><button onClick={this.showMedia}id="modal--media_open" className="btn btn--control_btn">Media</button></li>
              : null}
              {this.props.vehicleLoaded ? 
                <li className="item--control_btn"><button onClick={this.showClimate} id="modal--climate_open" className="btn btn--control_btn">Climate</button></li>
              : null}
              {this.props.vehicleLoaded ? 
                <li className="item--control_btn"><button onClick={this.showCharging} id="modal--charging_open" className="btn btn--control_btn">Charging</button></li>
              : null}
              {this.props.vehicleLoaded ? 
                <li className="item--control_btn"><button onClick={this.showDiagnostics} id="modal--store" className="btn btn--control_btn">Diagnostics</button></li>
              : null}
              {this.props.vehicleLoaded ? 
                <li className="item--control_btn"><button onClick={this.testFunc} id="modal--test" className="btn btn--control_btn">Test Button</button></li>
              : null}
              
            </ul>  
          </div>
          <Diagnostics/>
          <ChargingModal/>
          <MediaModal/>
          <ClimateModal/>
          <ControlModal/>
          <LoginModal/>
          <Timer />
          <PasswordPrompt/>
          <LogoutPrompt/>
          <ConfirmationPrompt/>
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
    vehicleSunroof: state.state.vehicleDataObject.vehicle_state.sun_roof_percent_open,
    vehicleClimateUnit: state.state.vehicleDataObject.gui_settings.gui_temperature_units,
    vehicleLoaded: state.state.initialVehicleLoaded
  }
}



export default withCookies(connect(mapStateToProps)(Main));