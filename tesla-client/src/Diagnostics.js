import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';

class Diagnostics extends Component{
  constructor(props) {
    super(props);
    this.state = {
      localOptions: {}
    };
    this.hideDiagnosticsModal = this.hideDiagnosticsModal.bind(this);
    this.toggleVehicleState = this.toggleVehicleState.bind(this);
    this.toggleChargeState = this.toggleChargeState.bind(this);
    this.toggleClimateState = this.toggleClimateState.bind(this);
    this.toggleDriveState = this.toggleDriveState.bind(this);
    this.toggleVehicleConfig = this.toggleVehicleConfig.bind(this);
    this.toggleGUISettings = this.toggleGUISettings.bind(this);
  }
  
  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
  }

  hideDiagnosticsModal = () => {
    var newStore = store.getState();
    newStore.state.showDiagnosticsModal = false;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showDiagnosticsModal: newStore.state.showDiagnosticsModal
      }
    })
  }

  toggleVehicleState(){
    var newStore = store.getState();
    newStore.state.toggleVehicleState = !newStore.state.toggleVehicleState;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        toggleVehicleState: newStore.state.toggleVehicleState,
        toggleDriveState: false,
        toggleChargeState: false,
        toggleClimateState: false,
        toggleVehicleConfig: false,
        toggleGUISettings: false
      }
    })
  }
  toggleDriveState(){
    var newStore = store.getState();
    newStore.state.toggleDriveState = !newStore.state.toggleDriveState;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        toggleVehicleState: false,
        toggleDriveState: newStore.state.toggleDriveState,
        toggleChargeState: false,
        toggleClimateState: false,
        toggleVehicleConfig: false,
        toggleGUISettings: false
      }
    })
  }
  toggleChargeState(){
    var newStore = store.getState();
    newStore.state.toggleChargeState = !newStore.state.toggleChargeState;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        toggleVehicleState: false,
        toggleDriveState: false,
        toggleChargeState: newStore.state.toggleChargeState,
        toggleClimateState: false,
        toggleVehicleConfig: false,
        toggleGUISettings: false
      }
    })
  }
  toggleClimateState(){
    var newStore = store.getState();
    newStore.state.toggleClimateState = !newStore.state.toggleClimateState;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        toggleVehicleState: false,
        toggleDriveState: false,
        toggleChargeState: false,
        toggleClimateState: newStore.state.toggleClimateState,
        toggleVehicleConfig: false,
        toggleGUISettings: false
      }
    })
  }
  toggleVehicleConfig(){
    var newStore = store.getState();
    newStore.state.toggleVehicleConfig = !newStore.state.toggleVehicleConfig;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        toggleVehicleState: false,
        toggleDriveState: false,
        toggleChargeState: false,
        toggleClimateState: false,
        toggleVehicleConfig: newStore.state.toggleVehicleConfig,
        toggleGUISettings: false
      }
    })
  }
  toggleGUISettings(){
    var newStore = store.getState();
    newStore.state.toggleGUISettings = !newStore.state.toggleGUISettings;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        toggleVehicleState: false,
        toggleDriveState: false,
        toggleChargeState: false,
        toggleClimateState: false,
        toggleVehicleConfig: false,
        toggleGUISettings: newStore.state.toggleGUISettings
      }
    })
  }


render(){
    return(
    <div>
        <Modal show={this.props.show} handleClose={this.hideLogoutModal} >
            <div className="modal-content">
                <div className="modal--close">
                    <button onClick={this.hideDiagnosticsModal}id="modal--diagnostics_close" className="modal--close_button"><i className="fas fa-times"></i></button>
                </div>

                <ul className="list--modal_btn">
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.toggleVehicleState} id="enginetoggle_btn">View Vehicle State</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.toggleDriveState} id="lock">View Drive State</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.toggleChargeState} id="honk">View Charge State</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.toggleClimateState} id="flashlights_btn">View Climate States</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.toggleVehicleConfig} id="openfrunk_btn">View Vehicle Config</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.toggleGUISettings} id="opentrunk_btn">View GUI Settings</button></li>

                  </ul>
                {this.props.toggleVehicleState ? <pre>Vehicle State: {JSON.stringify(this.props.vehicleData.vehicle_state, null, 4)}</pre>  : null}
                {this.props.toggleDriveState ? <p>Drive State: {JSON.stringify(this.props.vehicleData.drive_state, null, 4)}</p> : null}
                {this.props.toggleChargeState ? <p>Charge State: {JSON.stringify(this.props.vehicleData.charge_state, null, 4)}</p> : null}
                {this.props.toggleClimateState ? <p>Climate State: {JSON.stringify(this.props.vehicleData.climate_state, null, 4)}</p> : null}
                {this.props.toggleVehicleConfig ? <p>Vehicle Config: {JSON.stringify(this.props.vehicleData.vehicle_config, null, 4)}</p> : null}
                {this.props.toggleGUISettings ? <p>GUI Settings: {JSON.stringify(this.props.vehicleData.gui_settings, null, 4)}</p> : null}
            </div>
        </Modal>
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
    localOptionsProp: state.state.localOptions,
    show: state.state.showDiagnosticsModal,
    vehicleData: state.state.vehicleDataObject,
    toggleVehicleState: state.state.toggleVehicleState,
    toggleDriveState: state.state.toggleDriveState,
    toggleChargeState: state.state.toggleChargeState,
    toggleClimateState: state.state.toggleClimateState,
    toggleVehicleConfig: state.state.toggleVehicleConfig,
    toggleGUISettings: state.state.toggleGUISettings
  }
}

export default withCookies(connect(mapStateToProps)(Diagnostics));