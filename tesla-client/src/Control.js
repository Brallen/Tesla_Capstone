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
    this.showError = this.showError.bind(this);
	this.summonBackwards = this.summonBackwards.bind(this);
	this.summonForwards = this.summonForwards.bind(this);
	this.summonAbort = this.summonAbort.bind(this);
  }

  componentDidMount(){
    this.setState({
      localOptions: this.props.localOptionsProp,
	  vehicleDataObject: this.props.vehicleDataProp
    });
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

  showError(text){
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showErrorPrompt: true,
        errorText: text
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
    var self = this;
    /* api call here */
    axios.post('/honk', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, we don't need anything
    })
    .catch(function (error) {
      self.showError("Error: Could not honk the vehicle horn");
    });
  }

  flashLightsButton(){
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();
    var self = this;
    /* api call here */
    axios.post('/flashLights', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, we dont need anything
    })
    .catch(function (error) {
      self.showError("Error: Could not flash the vehicle lights");
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
    var self = this;
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
        })
        .catch(function (error) {
          self.showError("Error: Could not close the Sunroof");
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
        })
        .catch(function (error) {
          self.showError("Error: Could not open the Sunroof");
        });
      }
  }

  summonBackwards(){
	axios.post('/summonBackward', {
		email: this.props.emailProp,
		auth: JSON.stringify(this.state.localOptions),
		latitude: this.state.vehicleDataObject.drive_state.latitude,
		longitude: this.state.vehicleDataObject.drive_state.longitude
	})
	.then(function(response){
		//console.log(response);
	})
	.catch(function(error){
		//console.log("Error - SummonBackward Command: " + error);
	});
	//alert("Summon Backwards pressed");
  }

  summonForwards(){
	//alert(this.props.emailProp);
	axios.post('/summonForward', {
		email: this.props.emailProp,
		auth: JSON.stringify(this.state.localOptions),
		latitude: this.state.vehicleDataObject.drive_state.latitude,
		longitude: this.state.vehicleDataObject.drive_state.longitude
	})
	.then(function(response){
		//console.log(response);
	})
	.catch(function(error){
		//console.log("Error - SummonForward Command: " + error);
	});
	//alert("Summon Forwards pressed");
  }

  summonAbort(){
	axios.post('/summonAbort',{
		email:this.props.emailProp,
		auth: JSON.stringify(this.state.localOptions),
	})
	.then(function(response){
		//console.log(response);
	})
	.catch(function(error){
	  //console.log("Error - SummonAbort Command: " + error);
	});
	//alert("Summon Aborted");
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
                      {(this.props.optionCodes.includes('RFP2')) ?
                        <li className="item--modal_btn">
                          <button className="btn btn--modal_btn" onClick={this.SunroofButton} id="sunroof">
                            {this.props.sunroofOpenProp ? 'Close' : 'Open'} Sunroof
                          </button>
                        </li>
                        : null}
					  {(!this.props.optionCodes.includes('MDL3')) ?
					    <div>
						  <li className="item--modal_btn"><button className="btn btn--modal_btn" onMouseDown={this.summonForwards} onMouseUp={this.summonAbort} id="enginetoggle_btn">Summon Forward</button></li>
	                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onMouseDown={this.summonBackwards} onMouseUp={this.summonAbort} id="lock">Summon Backwards</button></li>
						</div>
					  : null}
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
      optionCodes: state.state.vehicleDataObject.option_codes,
      sunroofOpenProp: state.state.sunroofOpen,
      localOptionsProp: state.state.localOptions,
	  vehicleDataProp: state.state.vehicleDataObject,
	  emailProp: state.state.email,
      //REMOVE THIS BELOW AFTER TESTING COMPLETE
      passwordEntered: state.state.accountPass,
      showControl: state.state.showControlModal
    }
  }

export default connect(mapStateToProps)(ControlModal);
