import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import axios from 'axios';

class ControlModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      sunroofCheck: false,
      localOptions: {}
    };
    this.refreshGlobalTimerWhenAction = this.refreshGlobalTimerWhenAction.bind(this);
    this.startEngineButton = this.startEngineButton.bind(this);
    this.lockButton = this.lockButton.bind(this);
    this.honkHornButton = this.honkHornButton.bind(this);
    this.flashLightsButton = this.flashLightsButton.bind(this);
    this.openFrunkButton = this.openFrunkButton.bind(this);
    this.openTrunkButton = this.openTrunkButton.bind(this);
    this.SunroofButton = this.SunroofButton.bind(this);
  }
  
  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
    //alert(JSON.stringify(this.state.localOptions))
  }
  
  componentDidUpdate(){
  }
  
  //call this function inside every control
  refreshGlobalTimerWhenAction(){
    var newStore = store.getState();
    newStore.state.refreshTime = this.props.globalTimerInterval;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        refreshTime: newStore.state.refreshTime
      }
    })
  }

  


  startEngineButton(){
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();
    /* call the password prompt modal */
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showPasswordPrompt: true,
        showControlModal: false
      }
    })
    //the api call itself is made in the passwordPrompt.js file
    
  }

  lockButton(){
    //dispatch the confirmation prompt and tell it we are going to be locking or unlocking
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showConfirmationPrompt: true,
        confirmationPromptLock: true,
        //remove the panel below the new modal we are bringing up
        //if the user presses the x, it brings back the control modal
        showControlModal: false
      }
    })
    /* api call actually happens in confirmation modal */
  }

  honkHornButton(){
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();
    /* api call here */
    axios.post('/honk', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, update local state
      alert("Vehicle Honked");
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      alert(error.response.data + ' - ' + error.response.statusText);
    });
  }

  flashLightsButton(){
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();
    /* api call here */
    axios.post('/flashLights', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, update local state
      alert("Lights Flashed");
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      alert(error.response.data + ' - ' + error.response.statusText);
    });
  }

  openFrunkButton(){
    //dispatch the confirmation prompt and tell it it's for the frunk
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showConfirmationPrompt: true,
        confirmationPromptFrunk: true,
        //remove the panel below the new modal we are bringing up
        //if the user presses the x, it brings back the control modal
        showControlModal: false
      }
    })
    /* api call actually happens in confirmation modal */
  
  }

  openTrunkButton(){
    //dispatch the confirmation prompt and tell it it's for the trunk
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showConfirmationPrompt: true,
        confirmationPromptTrunk: true,
        //remove the panel below the new modal we are bringing up
        //if the user presses the x, it brings back the control modal
        showControlModal: false
      }
    })
    /* api call actually happens in confirmation modal */
    
  }

  SunroofButton(){
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();
    //check to make sure the sunroof is present and not null
    if(this.props.sunroofPresentProp){
      //if the sunroof is open at all then we send a close command
      if(this.props.sunroofPercent > 0){
        axios.post('/closeSunroof', {
          auth: JSON.stringify(this.state.localOptions)
        })
        .then(function (response) {
          //if it's a good response, update local state
          store.dispatch({
            type: 'UPDATE_OBJECT',
            payload: {
              sunroofOpen: false
            }
          })
          //alert("Sunroof has been closed");
        })
        .catch(function (error) {
          alert(error.response.data + ' - ' + error.response.statusText);
        });
      }else{
        //if its not open then send an open command
        axios.post('/openSunroof', {
          auth: JSON.stringify(this.state.localOptions)
        })
        .then(function (response) {
          //if it's a good response, update local state
          store.dispatch({
            type: 'UPDATE_OBJECT',
            payload: {
              sunroofOpen: true
            }
          })
          //alert("Sunroof has been opened");
        })
        .catch(function (error) {
          //alert(JSON.stringify(error))
          alert(error.response.data + ' - ' + error.response.statusText);
        });
      }
    }else{
      alert("Uh oh, this vehicle has no sunroof!");
    }
  }




  hideControlModal = () => {
    var newStore = store.getState();
    newStore.state.showControlModal = false;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showControlModal: newStore.state.showControlModal
      }
    })
  }


  render(){
    return(
      <div>
          <Modal show={this.props.showControl} handleClose={this.hideControlModal} >
              <div className="modal-content">
                  <div className="modal--close">
                      <button onClick={this.hideControlModal}id="modal--control_close" className="modal--close_button"><i className="fas fa-times"></i></button>
                  </div>
                  <ul className="list--modal_btn">
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.startEngineButton} id="enginetoggle_btn">Start Engine</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.lockButton} id="lock">{this.props.vehicleLocked ? 'Unlock' : 'Lock'}</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.honkHornButton} id="honk">Honk Horn</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.flashLightsButton} id="flashlights_btn">Flash Lights</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.openFrunkButton} id="openfrunk_btn">Open Frunk</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.openTrunkButton} id="opentrunk_btn">Open Trunk</button></li>
                      {this.props.sunroofPresentProp ? 
                        <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.SunroofButton} id="sunroof">{this.props.sunroofOpenProp ? 'Close' : 'Open'} Sunroof</button></li>
                        :
                        null
                      }
          
                  </ul>
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
      vehicleLocked: state.state.vehicleDataObject.vehicle_state.locked,
      globalTimerInterval: state.state.refreshInterval,
      sunroofPercent: state.state.vehicleDataObject.vehicle_state.sun_roof_percent_open,
      sunroofPresentProp: state.state.sunroofPresent,
      sunroofOpenProp: state.state.sunroofOpen,
      localOptionsProp: state.state.localOptions,
      //REMOVE THIS BELOW AFTER TESTING COMPLETE
      passwordEntered: state.state.accountPass,
      showControl: state.state.showControlModal
    }
  }

export default connect(mapStateToProps)(ControlModal);