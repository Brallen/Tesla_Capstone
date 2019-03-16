import React, { Component } from 'react';
import {store} from './store/index.js';

class Timer extends React.Component {
  constructor() {
    super();
    this.timeReset = 10;
    this.state = { time: {}, seconds: this.timeReset };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.startTimer();
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    //let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: this.secondsToTime(this.state.seconds) });
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      //set the local state of this component to 15 seconds
      this.setState((state, props) => {
        return {seconds: this.timeReset};
      });
      //dispatch examplePropOne and Two to the global store
      store.dispatch({
        type: 'EXAMPLE-THREE',
        payload: {
          
        }
      })
    }
  }

  render() {
    return(
      <div>
        Resetting global states in: {this.state.time.s} seconds
      </div>
    );
  }
}

export default (Timer);