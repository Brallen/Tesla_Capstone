import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import axios from 'axios';
import {withCookies} from 'react-cookie';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      localOptions: {},
      asleep: true,
      mobileAccess: true
    };
    this.timer = 0;
    
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.refreshVehicleData = this.refreshVehicleData.bind(this);
    this.checkMobileAccess = this.checkMobileAccess.bind(this);
    this.logout = this.logout.bind(this);
    this.startTimer();
  }

  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
    //alert(JSON.stringify(this.state.localOptions))
  }

  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }


  logout(){
    //delete our user cookie
    const { cookies } = this.props;
    cookies.remove('token', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    //reset client state
    store.dispatch({
      type: 'LOGOUT'
    });
  }

  checkMobileAccess(){
    axios.post('/mobileAccess', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          mobileAccess: response.data
        }
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  refreshVehicleData(){
    //first let's make sure we're logged in
    if(this.props.loggedInProp){
      //check if mobile access is enabled
      this.checkMobileAccess();
      if(this.props.mobileAccessProp === true){
        //then check is if the vehicle is asleep
        if(this.props.initialVehicleObject.state === 'asleep' && this.props.waitingForWake === false){
          axios.post('/wakeup', {
            authToken: JSON.stringify(this.state.localOptions)
          })
          .then(function (response) {
            var newStore = store.getState();
            //if we get a good response then set the update timer interval to 10 seconds instead of default
            //and turn off waiting for wake again
            newStore.state.refreshInterval = 10;
            newStore.state.waitingForWake = false;
            store.dispatch({
              type: 'UPDATE_OBJECT',
              payload: {
                initialVehicleLoginObject: response.data,
                refreshInterval: newStore.state.refreshInterval,
                waitingForWake: newStore.state.waitingForWake
              }
            })
          })
          .catch(function (error) {
            console.log(error);
            //if we get an error set waiting for wake back to false
            store.dispatch({
              type: 'UPDATE_OBJECT',
              payload: {
                waitingForWake: false
              }
            })
          });
          //set waiting for wake to ensure we dont spam the wake command
          var newStore = store.getState();
          newStore.state.vehicleDataObject.display_name = 'Waking Vehicle Up..';
          store.dispatch({
            type: 'UPDATE_OBJECT',
            payload: {
              waitingForWake: true,
              vehicleDataObject: newStore.state.vehicleDataObject
            }
          })
        //if the vehicle is not asleep then we pull updates for the data
        }
        if(this.props.initialVehicleObject.state === 'online' || this.props.vehicleDataObject.state === 'online'){
          axios.post('/vehicleData', {
            auth: JSON.stringify(this.state.localOptions)
          })
          .then(function (response) {
            var newStore = store.getState();
            newStore.state.initialVehicleLoginObject.state = response.data.state;
            newStore.state.refreshInterval = 10;
            newStore.state.initialVehicleLoaded = true;
            //doing this special stuff because we need to see if the sun roof exists
            if(JSON.stringify(response.data.option_codes).includes('RFP2')){
              newStore.state.sunroofPresent = true;
            }else{
              newStore.state.sunroofPresent = false;
            }
            if(parseInt(response.data.vehicle_state.sun_roof_percent_open) > 0){
              newStore.state.sunroofOpen = true;
            }else{
              newStore.state.sunroofOpen = false;
            }
            store.dispatch({
              type: 'UPDATE_OBJECT',
              payload: {
                vehicleDataObject: response.data,
                /*write the state of the vehicle to the initial state that we check so we
                  can see when the vehicle goes to sleep and then wake it up automatically again*/
                initialVehicleLoginObject: newStore.state.initialVehicleLoginObject,
                refreshInterval: newStore.state.refreshInterval,
                sunroofPresent: newStore.state.sunroofPresent,
                sunroofOpen: newStore.state.sunroofOpen,
                initialVehicleLoaded: newStore.state.initialVehicleLoaded
              }
            })
              //alert(JSON.stringify(response));
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    var seconds = parseInt(this.props.globalTimer-1);
    var newStore = store.getState();
    newStore.state.refreshTime = seconds;
    //for showing time as the vehicle name
      //newStore.state.vehicleDataObject.display_name = seconds;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        refreshTime: newStore.state.refreshTime
      }
    })
    // Check if we're at zero.
    if (seconds <= 0) { 
      this.refreshVehicleData();
      newStore.state.refreshTime = this.props.globalTimerInterval;
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          refreshTime: newStore.state.refreshTime,
        }
      })
    }
  }

  render() {
    return(
      <div>
        <Modal show={!this.props.mobileAccessProp} handleClose={this.hideModal}>
              <div className="container--header">
                  <div className="container--car_info">
                      <h1>No Mobile Access</h1>
                  </div>
              </div>
              <div className="modal-content">
                  <p>You currently have mobile access diabled for this car, which, sadly, renders this application useless.</p>
                  <button className="btn btn--modal_btn" id="loginAgain" onClick={() => this.logout()}>Login with another account</button>
              </div>
        </Modal>
      </div>
    );
  }
}


const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'block' : 'none';
  return (
      <div className='modal container--modal_login' style={{display: showHideClassName}}>
      {children}
      <button onClick={handleClose}>
        Close
      </button>
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    globalTimer: state.state.refreshTime,
    loggedInProp: state.state.loggedIn,
    globalTimerInterval: state.state.refreshInterval,
    vehicleDataName: state.state.vehicleDataObject.display_name,
    vehicleDataObject: state.state.vehicleDataObject,
    localOptionsProp: state.state.localOptions,
    initialVehicleObject: state.state.initialVehicleLoginObject,
    mobileAccessProp: state.state.mobileAccess,
    vehicleOptionCodes: state.state.vehicleDataObject.option_codes,
    waitingForWake: state.state.waitingForWake
  }
}

export default withCookies(connect(mapStateToProps)(Timer));