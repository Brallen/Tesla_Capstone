import React, { Component } from 'react';
import { connect } from 'react-redux';
import {store} from './store/index.js';
import Slider from 'react-rangeslider';
import axios from 'axios';
import 'react-rangeslider/lib/index.css';

class SafetyModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			localOptions: {}
		};
		this.refreshGlobalTimerWhenAction = this.refreshGlobalTimerWhenAction.bind(this);
		this.setSpeedLimitFront = this.setSpeedLimitFront.bind(this);
		this.setSpeedLimitBack = this.setSpeedLimitBack.bind(this);
		//this.SpeedLimitButton = this.SpeedLimitButton.bind(this);
		//this.clearSpeedLimitPin = this.clearSpeedLimitPin.bind(this);
		//this.valetModeButton = this.valetModeButton.bind(this);
		//this.resetValetPin = this.resetValetPin.bind(this);
		//this.sentryModeButton = this.sentryModeButton.binf(this);
		this.showError = this.showError.bind(this);
	}

	componentDidMount() {
		this.setState({
			localOptions: this.props.localOptionsProp
		});
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

	hideSafetyModal = () => {
		var newStore = store.getState();
		newStore.state.showSafetyModal = false;
		store.dispatch({
			type: 'UPDATE_OBJECT',
			payload: {
				showChargingModal: newStore.state.showChargingModal
			}
		})
	}

	/*
	 * this runs every time the slider is moved
	 * this is because in order for the view to be updated client side we need to
	 * update the corresponding data. This means if we call the API in this function
	 * we are going to be flooding the server with API commands
	 */
	setSpeedLimitFront (value) {
	  this.refreshGlobalTimerWhenAction();
	  var newStore = store.getState();
	  this.setState({
		speedLimit: parseInt(value)
	  });
	  newStore.state.vehicleDataObject.vehicle_state.speed_limit_mode.current_limit_mph = parseInt(value);
	  store.dispatch({
		type: 'UPDATE_OBJECT',
		payload: {
		  vehicleDataObject: newStore.state.vehicleDataObject
		}
	  })
	}

	setSpeedLimitBack(){
      	this.refreshGlobalTimerWhenAction();
      	var self = this;
      	//make API call here to send the speed limit setting
      	//see comment above setSpeedLimitFront()
      	axios.post('/setSpeedLimit', {
	        auth: JSON.stringify(this.state.localOptions),
	        limit: parseInt(this.state.speedLimit)
	    })
	    .then(function (response) {
	      	//if it's a good response, state is already updated!
	    })
	    .catch(function (error) {
	      	self.showError("Error: Could not set speed limit");
	        //error lets repull our data and ensure its back to normal
	        var newStore = store.getState();
	        newStore.state.refreshTime = 1;
	        store.dispatch({
	          	type: 'UPDATE_OBJECT',
	          	payload: {
	            	refreshTime: newStore.state.refreshTime
	          	}
	        })
	    });
	}

	render(){
		return(
			<div>
				<Modal show={this.props.showSafety} handleClose={this.hideSafetyModal}>
					<div className="modal-content">
						<div className="modal--close">
							<button onClick={this.hideSafetyModal}id="modal--charging_close" className="modal--close_button"><i className="fas fa-times"></i></button>
						</div>
						<div>
							<div className="modal--safety_controls">
								<p id="charging--speedlimit_level" className="modal--level_text">Speed Limit: {parseInt(this.props.speedLimit)} mph</p>
							  	<div className="modal--slider">
									<Slider
										value={this.props.speedLimit}
										min={this.props.speedLimitMin}
										max={this.props.speedLimitMax}
										onChange={this.setSpeedLimitFront}
										onChangeComplete={this.setSpeedLimitBack}
										tooltip={false}
										step={1}/>
							  	</div>
							</div>
						</div>
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
		globalTimerInterval: state.state.refreshInterval,
        localOptionsProp: state.state.localOptions,
      	showSafety: state.state.showSafetyModal,
		speedLimit: state.state.vehicleDataObject.vehicle_state.speed_limit_mode.current_limit_mph,
		speedLimitMax: state.state.vehicleDataObject.vehicle_state.speed_limit_mode.max_limit_mph,
		speedLimitMin: state.state.vehicleDataObject.vehicle_state.speed_limit_mode.min_limit_mph
    }
  }
export default connect(mapStateToProps)(SafetyModal);
