import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import axios from 'axios';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      localOptions: {},
      asleep: true
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.refreshVehicleData = this.refreshVehicleData.bind(this);
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

  refreshVehicleData(){
    var self = this;
    //first thing to check is if the vehicle is asleep
    if(this.props.initialVehicleObject.state === 'asleep'){
      axios.post('/wakeup', {
        authToken: JSON.stringify(this.state.localOptions)
      })
      .then(function (response) {
        var newStore = store.getState();
        //if we get a good response then set the update timer interval to 10 seconds instead of 2
        newStore.state.refreshInterval = 10;
        
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
            initialVehicleLoginObject: response.data,
            refreshInterval: newStore.state.refreshInterval
          }
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      axios.post('/vehicleData', {
        authToken: JSON.stringify(this.state.localOptions)
      })
      .then(function (response) {
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
            vehicleDataObject: response.data
          }
        })
          //alert(JSON.stringify(response));
      })
      .catch(function (error) {
        console.log(error);
      });
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
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalTimer: state.state.refreshTime,
    globalTimerInterval: state.state.refreshInterval,
    vehicleDataName: state.state.vehicleDataObject.display_name,
    vehicleDataObject: state.state.vehicleDataObject,
    localOptionsProp: state.state.localOptions,
    initialVehicleObject: state.state.initialVehicleLoginObject
  }
}

export default connect(mapStateToProps)(Timer);