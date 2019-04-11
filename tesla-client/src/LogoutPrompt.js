import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';

class LogoutCheck extends Component{
  constructor(props) {
    super(props);
    this.state = {
      localOptions: {}
    };
    this.hideLogoutModal = this.hideLogoutModal.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
  }

  hideLogoutModal = () => {
    var newStore = store.getState();
    newStore.state.showLogoutPrompt = false;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showLogoutPrompt: newStore.state.showLogoutPrompt
      }
    })
  }

  logout = () => {
    //delete our user cookie
    const { cookies } = this.props;
    cookies.remove('token', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    //reset client state
    store.dispatch({
      type: 'LOGOUT'
    })

  }


render(){
    return(
    <div>
        <Modal show={this.props.show} handleClose={this.hideLogoutModal} >
            <div className="modal-content">
                <div className="modal--close">
                    <button id="modal--confirm_close" className="modal--close_button">
                        <i className="fas fa-times" onClick={this.hideLogoutModal}></i>
                    </button>
                </div>
                <div className="modal--confirm_controls">
                    <p id="confirm--text">Are you sure you want to sign out of the application?</p>
                    <br />
                    <button id="confirm--make_confirmation" className="btn btn--modal_btn" onClick={this.logout}>Sign out</button>
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
    show: state.state.showLogoutPrompt
  }
}

export default withCookies(connect(mapStateToProps)(LogoutCheck));