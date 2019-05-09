import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import axios from 'axios';

class PinPrompt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			localOptions: {},
			pin: ''
		};
		this.hidePinModal = this.hidePinModal.bind(this);
		this.handlePinChange = this.handlePinChange.bind(this);
		this.submit = this.submit.bind(this);
		this.showError = this.showError.bind(this);
	}

	componentDidMount(){
	    this.setState({
	        localOptions: this.props.localOptionsProp
	    });
    }

	showError(text){
      	store.dispatch({
	        type: 'UPDATE_OBJECT',
	        payload: {
	          	showErrorPrompt: true,
	          	showPinPrompt: false,
				showSafetyModal: true,
	          	errorText: text
	        }
      	})
    }

	handlePinChange(evt) {
		this.setState({ pin: evt.target.value })
	}

	hidePinModal = () => {
		store.dispatch({
			type: 'UPDATE_OBJECT',
			payload: {
				showPinPrompt: false,
				showSafetyModal: true
			}
		})
		//remove password from field
		this.setState({ pin: '' });
	}

	submit = () => {
		var self = this;

		if (this.state.pin === '') this.showError("PIN number required.");

		else if (this.state.pin.length !== 4) this.showError("PIN must be four digits.");

		else if (isNaN(this.state.pin)) this.showError("PIN can only contain numerals.");

		else if (this.props.pinSpeedLimitActivate) {
			if (this.props.speedLimitActive) {
				axios.post('/deactivateSpeedLimit', {
					auth: JSON.stringify(this.state.localOptions),
					pin: parseInt(this.state.pin)
				}).then(function(response) {
					var newStore = store.getState();
					newStore.state.vehicleDataObject.vehicle_state.speed_limit_mode.active = false;
					store.dispatch({
		                type: 'UPDATE_OBJECT',
		                payload: {
		                    vehicleDataObject: newStore.state.vehicleDataObject
		                }
		            })
				}).catch(function(err) {
					self.showError("Error: Could not deactivate the speed limit");
				});
			}
			else {
				axios.post('/activateSpeedLimit', {
					auth: JSON.stringify(this.state.localOptions),
					pin: parseInt(this.state.pin)
				}).then(function(response) {
					var newStore = store.getState();
					newStore.state.vehicleDataObject.vehicle_state.speed_limit_mode.active = true;
					store.dispatch({
		                type: 'UPDATE_OBJECT',
		                payload: {
		                    vehicleDataObject: newStore.state.vehicleDataObject
		                }
		            })
				}).catch(function(err) {
					self.showError("Error: Could not activate the speed limit");
				});
			}
			store.dispatch({
		        type: 'UPDATE_OBJECT',
		        payload: {
					pinSpeedLimitActivate: false
		        }
	      	})
		}

		else if (this.props.pinSpeedLimitClear) {
			axios.post('/clearSpeedLimitPin', {
				auth: JSON.stringify(this.state.localOptions),
				pin: parseInt(this.state.pin)
			}).then(function(response) {
				var newStore = store.getState();
				newStore.state.vehicleDataObject.vehicle_state.speed_limit_mode.pin_code_set = false;
				store.dispatch({
	                type: 'UPDATE_OBJECT',
	                payload: {
	                    vehicleDataObject: newStore.state.vehicleDataObject
	                }
	            })
			}).catch(function(err) {
				self.showError("Error: Could not clear the speed limit pin");
			});
			store.dispatch({
		        type: 'UPDATE_OBJECT',
		        payload: {
					pinSpeedLimitClear: false
		        }
	      	})
		}

		this.hidePinModal();
	}

	render() {
		return(
			<div>
				<Modal show={this.props.show} handleClose={this.hidePasswordModal} >
					<div className="modal-content">
						<div className="modal--close">
							<button id="modal--confirm_close" className="modal--close_button">
								<i className="fas fa-times" onClick={this.hidePinModal}></i>
							</button>
						</div>
						<div className="modal--pin-entry">
							<p id="pin--text">
								{ (!this.props.speedLimitPinSet) ?
									"Please set a PIN to activate the speed limit."
									: null }
								{ (this.props.speedLimitPinSet) ?
									"Please enter your speed limit pin."
									: null }
							</p>
							<br />
							<div className="login-form-text">
								<label htmlFor="enter--pin">PIN: </label>
								<input type="password" placeholder="Enter PIN" name="pin" required id="pin" size="4"
									onChange={this.handlePinChange} value={this.state.pin}/>
							</div>
							<button id="pin--submit-pin" className="btn btn--modal_btn" onClick={this.submit}>Submit</button>
						</div>
					</div>
				</Modal>
			</div>
		)
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
		show: state.state.showPinPrompt,
		speedLimitActive: state.state.vehicleDataObject.vehicle_state.speed_limit_mode.active,
		pinSpeedLimitActivate: state.state.pinSpeedLimitActivate,
		speedLimitPinSet: state.state.vehicleDataObject.vehicle_state.speed_limit_mode.pin_code_set,
		pinSpeedLimitClear: state.state.pinSpeedLimitClear
    }
  }
export default connect(mapStateToProps)(PinPrompt);
