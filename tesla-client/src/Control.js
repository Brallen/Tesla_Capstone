import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import axios from 'axios';

class ControlModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showControl: false,
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
    this.openSunroofButton = this.openSunroofButton.bind(this);
    this.checkSunroofState = this.checkSunroofState.bind(this);
  }
  
  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
    //alert(JSON.stringify(this.state.localOptions))
  }
  
  componentDidUpdate(){
    this.checkSunroofState();
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
    /* api call here */
    axios.post('/startEngine', {
      auth: JSON.stringify(this.state.localOptions),
      pass: this.props.passwordEntered
    })
    .then(function (response) {
      
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      alert(error.response.data + ' - ' + error.response.statusText);
    });
  }

  lockButton(){
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();

    //if it is locked, pass unlock
    if(this.props.vehicleLocked === true){
      axios.post('/unlock', {
        auth: JSON.stringify(this.state.localOptions)
      })
      .then(function (response) {
        //if it's a good response, update local state
        var newStore = store.getState();
        newStore.state.vehicleDataObject.vehicle_state.locked = !newStore.state.vehicleDataObject.vehicle_state.locked;
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
          }
        })
      })
      .catch(function (error) {
        //alert(JSON.stringify(error))
        alert(error.response.data + ' - ' + error.response.statusText);
      });
    }
    if(this.props.vehicleLocked === false){
      axios.post('/lock', {
        auth: JSON.stringify(this.state.localOptions)
      })
      .then(function (response) {
        //if it's a good response, update local state
        var newStore = store.getState();
        newStore.state.vehicleDataObject.vehicle_state.locked = !newStore.state.vehicleDataObject.vehicle_state.locked;
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
          vehicleDataObject: newStore.state.vehicleDataObject
          }
        })
      })
      .catch(function (error) {
        //alert(JSON.stringify(error))
        alert(error.response.data + ' - ' + error.response.statusText);
      });
    }
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
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();
    /* api call here */
    axios.post('/openTrunk', {
      auth: JSON.stringify(this.state.localOptions),
      which: "frunk"
    })
    .then(function (response) {
      //if it's a good response, update local state
      alert("Frunk Opened");
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      alert(error.response.data + ' - ' + error.response.statusText);
    });
  }

  openTrunkButton(){
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();
    /* api call here */
    axios.post('/openTrunk', {
      auth: JSON.stringify(this.state.localOptions),
      which: "trunk"
    })
    .then(function (response) {
      //if it's a good response, update local state
      alert("Trunk Opened");
    })
    .catch(function (error) {
      //alert(JSON.stringify(error))
      alert(error.response.data + ' - ' + error.response.statusText);
    });
  }

  openSunroofButton(){
    //so the timer doesnt refresh directly after an async api call
    this.refreshGlobalTimerWhenAction();
    //check the sunroof state and determine if it exists or not
    this.checkSunroofState();
    //check to make sure the sunroof is present and not null
    if(this.state.sunroofCheck){
      //if the sunroof is open at all then we send a close command
      if(this.props.sunroofPercent > 0){
        axios.post('/closeSunroof', {
          auth: JSON.stringify(this.state.localOptions)
        })
        .then(function (response) {
          //if it's a good response, update local state
          this.setState({ 
            sunroofCheck: false 
          });
          alert("Sunroof has been closed");
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
          this.setState({ 
            sunroofCheck: true
          });
          alert("Sunroof has been opened");
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

  checkSunroofState(){
    var newStore = store.getState();
    //find a way to set the sunroofcheck without an infinite loop
    if(newStore.state.vehicleDataObject.vehicle_state.sun_roof_percent_open != null){
      //this.setState({sunroofCheck: true});
    }else{
      //this.setState({sunroofCheck: false});
    }
  }




  showControlModal = () => {
    this.setState({ showControl: true });
  }

  hideControlModal = () => {
    this.setState({ showControl: false });
  }


  render(){
    return(
      <div>
          <Modal show={this.state.showControl} handleClose={this.hideControlModal} >
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
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.openSunroofButton} id="sunroof">{this.state.sunroofCheck ? 'Close' : 'Open'} Sunroof</button></li>
                  </ul>
              </div>
          </Modal>

          <li className="item--control_btn"><button onClick={this.showControlModal} id="modal--control_open" className="btn btn--control_btn">Controls</button></li>
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
      localOptionsProp: state.state.localOptions,
      //REMOVE THIS BELOW AFTER TESTING COMPLETE
      passwordEntered: state.state.accountPass
    }
  }

export default connect(mapStateToProps)(ControlModal);