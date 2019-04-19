import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import axios from 'axios';

class PasswordCheck extends Component{
  constructor(props) {
    super(props);
    this.state = {
      localOptions: {},
      password: ''
    };
    this.hidePasswordModal = this.hidePasswordModal.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.startVehicle = this.startVehicle.bind(this);
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
        showPasswordPrompt: false,
        errorText: text
      }
    })
  }

  handlePasswordChange (evt) {
    this.setState({ password: evt.target.value });
  }

  hidePasswordModal = () => {
    var newStore = store.getState();
    newStore.state.showPasswordPrompt = false;
    newStore.state.showControlModal = true;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showPasswordPrompt: newStore.state.showPasswordPrompt,
        showControlModal: newStore.state.showControlModal
      }
    })
    //remove password from field
    this.setState({ password: '' });
  }

  startVehicle = () => {
    var self = this;
    axios.post('/startEngine', {
        auth: JSON.stringify(this.state.localOptions),
        pass: this.state.password
    })
    .then(function (response) {
      self.showError("You have two minutes to start driving the vehicle");
    })
    .catch(function (error) {
      self.showError("Error: Could not start vehicle");
    });
    this.hidePasswordModal();
  }


render(){
    return(
    <div>
        <Modal show={this.props.show} handleClose={this.hidePasswordModal} >
            <div className="modal-content">
                <div className="modal--close">
                    <button id="modal--confirm_close" className="modal--close_button">
                        <i className="fas fa-times" onClick={this.hidePasswordModal}></i>
                    </button>
                </div>
                <div className="modal--confirm_controls">
                    <p id="confirm--text">Enter your Tesla account password to start the vehicle.</p>
                    <br />
                    <div className="login-form-text">
                        <label htmlFor="confirm--password">Password: </label>
                        <input type="password" placeholder="Enter Tesla Password" name="password" required id="password" 
                            onChange={this.handlePasswordChange} value={this.state.password}/>
                    </div>
                    <button id="confirm--make_confirmation" className="btn btn--modal_btn" onClick={this.startVehicle}>Start Vehicle</button>
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
        <div className='modal container--modal_confirm' style={{display: showHideClassName}}>
            {children}
        </div>
    );
};

const mapStateToProps = (state) => {
  return {
    localOptionsProp: state.state.localOptions,
    show: state.state.showPasswordPrompt
  }
}

export default connect(mapStateToProps)(PasswordCheck);