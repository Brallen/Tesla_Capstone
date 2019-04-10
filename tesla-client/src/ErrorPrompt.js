import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';

class ErrorPrompt extends Component{
  constructor(props) {
    super(props);
    this.state = {
      localOptions: {}
    };
    this.hideErrorModal = this.hideErrorModal.bind(this);
  }
  
  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
  }

  hideErrorModal = () => {
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showErrorPrompt: false
      }
    })
  }




render(){
    return(
    <div>
        <Modal show={this.props.show} handleClose={this.hideErrorModal} >
            <div className="modal-content">
                <div className="modal--close">
                    <button id="modal--confirm_close" className="modal--close_button">
                        <i className="fas fa-times" onClick={this.hideErrorModal}></i>
                    </button>
                </div>
                <div className="modal--confirm_controls">
                    <p id="confirm--text">{this.props.errorText}</p>
                    <br />
                    <button id="confirm--make_confirmation" className="btn btn--modal_btn" onClick={this.hideErrorModal}>Ok</button>
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
    show: state.state.showErrorPrompt,
    errorText: state.state.errorText
  }
}

export default withCookies(connect(mapStateToProps)(ErrorPrompt));