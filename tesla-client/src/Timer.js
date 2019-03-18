import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.refreshVehicleData = this.refreshVehicleData.bind(this);
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }

  refreshVehicleData(){
    /*api call goes here to refresh vehicle data
      inside the .then we get the store and replace the vehicleObjectData
      with the new vehicleObjectData and then dispatch our action
      to update the store */
      var newStore = store.getState();
      
      store.dispatch({
        type: 'UPDATE_OBJECT',
        payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
        }
      })

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
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalTimer: state.state.refreshTime,
    globalTimerInterval: state.state.refreshInterval,
    vehicleDataName: state.state.vehicleDataObject.display_name
  }
}

export default connect(mapStateToProps)(Timer);