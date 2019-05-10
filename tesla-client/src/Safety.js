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
		this.speedLimitButton = this.speedLimitButton.bind(this);
		this.speedLimitClearPinButton = this.speedLimitClearPinButton.bind(this);
		this.sentryModeButton = this.sentryModeButton.bind(this);
		this.valetModeButton = this.valetModeButton.bind(this);
		this.resetValetPinButton = this.resetValetPinButton.bind(this);
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
		}).then(function (response) {
				//if it's a good response, state is already updated!
		}).catch(function (error) {
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

	speedLimitButton() {
		//so the timer doesnt refresh directly after an async api call
		this.refreshGlobalTimerWhenAction();
		/* call the pin prompt modal */
		store.dispatch({
			type: 'UPDATE_OBJECT',
			payload: {
				showPinPrompt: true,
				showSafetyModal: false,
				pinSpeedLimitActivate: true
			}
		})
		//the api call itself is made in the pinPrompt.js file
	}

	speedLimitClearPinButton() {
		//so the timer doesnt refresh directly after an async api call
		this.refreshGlobalTimerWhenAction();
		/* call the pin prompt modal */
		store.dispatch({
			type: 'UPDATE_OBJECT',
			payload: {
				showPinPrompt: true,
				showSafetyModal: false,
				pinSpeedLimitClear: true
			}
		})
		//the api call itself is made in the pinPrompt.js file
	}

	sentryModeButton() {

		this.refreshGlobalTimerWhenAction();
		var self = this;
		var onoff;

		if (this.props.sentryModeActive) onoff = false;
		else onoff = true;

		axios.post('/setSentryMode', {
			auth: JSON.stringify(this.state.localOptions),
			onoff: onoff
		}).then(function (response) {
			var newStore = store.getState();
			newStore.state.vehicleDataObject.vehicle_state.sentry_mode = onoff;
			store.dispatch({
				type: 'UPDATE_OBJECT',
				payload: {
						vehicleDataObject: newStore.state.vehicleDataObject
				}
			})
		}).catch(function (error) {
			if (onoff) self.showError("Error: Could not activate sentry mode");
			else self.showError("Error: Could not deactivate sentry mode");
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

	valetModeButton() {
		//so the timer doesnt refresh directly after an async api call
		this.refreshGlobalTimerWhenAction();

		var self = this;
		var onoff;

		if (this.props.valetModeActive) onoff = false;
		else onoff = true;

		if (!onoff || this.props.valetPinNeeded) {
			/* call the pin prompt modal */
			store.dispatch({
				type: 'UPDATE_OBJECT',
				payload: {
					showPinPrompt: true,
					showSafetyModal: false,
					pinValetActivate: true
				}
			})
			//the api call itself is made in the pinPrompt.js file
		}
		else {
			axios.post('/setValetMode', {
				auth: JSON.stringify(this.state.localOptions),
				onoff: onoff,
				pin: ""
			}).then(function (response) {
				var newStore = store.getState();
				newStore.state.vehicleDataObject.vehicle_state.valet_mode = true;
				store.dispatch({
					type: 'UPDATE_OBJECT',
					payload: {
						vehicleDataObject: newStore.state.vehicleDataObject
					}
				})
			}).catch(function (error) {
				self.showError("Error: Could not activate sentry mode");
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
	}

	resetValetPinButton() {
		this.refreshGlobalTimerWhenAction();
		var self = this;

		axios.post('/resetValetPin', {
			auth: JSON.stringify(this.state.localOptions),
		}).then(function (response) {
			var newStore = store.getState();
			newStore.state.vehicleDataObject.vehicle_state.valet_pin_needed = true;
			store.dispatch({
				type: 'UPDATE_OBJECT',
				payload: {
					vehicleDataObject: newStore.state.vehicleDataObject
				}
			})
		}).catch(function (error) {
			self.showError("Error: Could not clear valet PIN");
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

						{!this.props.speedLimitActive ?
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
								<button onClick={this.speedLimitButton} id="safety--speed_limit_activate" className="btn btn--modal_btn">Activate Speed Limit</button>
									</div>
										:
									<div>
									<p>Speed Limit: {this.props.speedLimit} mph</p>
								<button onClick={this.speedLimitButton} id="safety--speed_limit_activate" className="btn btn--modal_btn">Deactivate Speed Limit</button>
							</div>
						}

						{ this.props.speedLimitPinSet ?
							<button onClick={this.speedLimitClearPinButton} id="safety--speed_limit_clear" className="btn btn--modal_btn">Clear Speed Limit PIN</button>
							: null
						}

						{ this.props.sentryModeActive ?
							<button onClick={this.sentryModeButton} id="safety--sentry_mode" className="btn btn--modal_btn">Deactivate Sentry Mode</button>
							: <button onClick={this.sentryModeButton} id="safety--sentry_mode" className="btn btn--modal_btn">Activate Sentry Mode</button>
						}

						{ this.props.valetModeActive ?
							<button onClick={this.valetModeButton} id="safety--valet_mode" className="btn btn--modal_btn">Deactivate Valet Mode</button>
							: <button onClick={this.valetModeButton} id="safety--valet_mode" className="btn btn--modal_btn">Activate Valet Mode</button>
						}

						{ (!this.props.valetPinNeeded && !this.props.valetModeActive) ?
							<button onClick={this.resetValetPinButton} id="safety--reset_valet_pin" className="btn btn--modal_btn">Clear Valet Pin</button>
							: null
						}

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
		speedLimitMin: state.state.vehicleDataObject.vehicle_state.speed_limit_mode.min_limit_mph,
		speedLimitActive: state.state.vehicleDataObject.vehicle_state.speed_limit_mode.active,
		speedLimitPinSet: state.state.vehicleDataObject.vehicle_state.speed_limit_mode.pin_code_set,
		sentryModeActive: state.state.vehicleDataObject.vehicle_state.sentry_mode,
		valetModeActive: state.state.vehicleDataObject.vehicle_state.valet_mode,
		valetPinNeeded: state.state.vehicleDataObject.vehicle_state.valet_pin_needed
	}
}
export default connect(mapStateToProps)(SafetyModal);
