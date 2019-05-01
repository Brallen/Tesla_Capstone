import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';
import Prism from "prismjs";
import "./Assets/Styles/prism.css";
import "prismjs/components/prism-json"

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
    //put this in the render function to access the entire application state for debugging
    //<button className="btn btn--modal_btn_diagnostics" onClick={this.toggleAppState}>Entire App State (TEST)</button>
  }
  
  componentDidMount(){
    Prism.highlightAll();
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
  }

  hideDiagnosticsModal = () => {
    let newStore = store.getState();
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
            toggleAppState: false,
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
        toggleAppState: false,
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
        toggleAppState: false,
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
        toggleAppState: false,
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
        toggleAppState: false,
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
        toggleAppState: false,
        toggleGUISettings: newStore.state.toggleGUISettings
      }
    })
  }
  toggleAppState(){
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
        toggleGUISettings: false,
        toggleAppState: true
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
                <div className="diagnostics-buttons">
                    <button className="btn btn--modal_btn_diagnostics" onClick={this.toggleVehicleState}>Vehicle State</button>
                    <button className="btn btn--modal_btn_diagnostics" onClick={this.toggleDriveState}>Drive State</button>
                    <button className="btn btn--modal_btn_diagnostics" onClick={this.toggleChargeState}>Charge State</button>
                    <button className="btn btn--modal_btn_diagnostics" onClick={this.toggleClimateState}>Climate States</button>
                    <button className="btn btn--modal_btn_diagnostics" onClick={this.toggleVehicleConfig}>Vehicle Config</button>
                    <button className="btn btn--modal_btn_diagnostics" onClick={this.toggleGUISettings}>GUI Settings</button>

                </div>
                
                {this.props.toggleVehicleState ? <pre className="language-json" dangerouslySetInnerHTML={{__html: "Vehicle State: " + Prism.highlight(JSON.stringify(this.props.vehicleData.vehicle_state, null, 4), Prism.languages.json)}}></pre>: null}
                {this.props.toggleDriveState ? <pre className="language-json" dangerouslySetInnerHTML={{__html: "Drive State: " + Prism.highlight(JSON.stringify(this.props.vehicleData.drive_state, null, 4), Prism.languages.json)}}></pre>: null}
                {this.props.toggleChargeState ? <pre className="language-json" dangerouslySetInnerHTML={{__html: "Charge State: " + Prism.highlight(JSON.stringify(this.props.vehicleData.charge_state, null, 4), Prism.languages.json)}}></pre>: null}
                {this.props.toggleClimateState ? <pre className="language-json" dangerouslySetInnerHTML={{__html: "Climate State: " + Prism.highlight(JSON.stringify(this.props.vehicleData.climate_state, null, 4), Prism.languages.json)}}></pre>: null}
                {this.props.toggleVehicleConfig ? <pre className="language-json" dangerouslySetInnerHTML={{__html: "Vehicle Config: " + Prism.highlight(JSON.stringify(this.props.vehicleData.vehicle_config, null, 4), Prism.languages.json)}}></pre>: null}
                {this.props.toggleGUISettings ? <pre className="language-json" dangerouslySetInnerHTML={{__html: "GUI Settings: " + Prism.highlight(JSON.stringify(this.props.vehicleData.gui_settings, null, 4), Prism.languages.json)}}></pre>: null}
                {this.props.toggleAppState ? <pre className="language-json" dangerouslySetInnerHTML={{__html: "App State: " + Prism.highlight(JSON.stringify(this.props.stateProp, null, 4), Prism.languages.json)}}></pre>: null}
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
    toggleGUISettings: state.state.toggleGUISettings,
    toggleAppState: state.state.toggleAppState,
    stateProp: state.state
  }
}

export default withCookies(connect(mapStateToProps)(Diagnostics));