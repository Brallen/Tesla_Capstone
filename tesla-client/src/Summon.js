import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import { axios } from 'axios';

class SummonModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      localOptions: {}
    };
    this.refreshGlobalTimerWhenAction = this.refreshGlobalTimerWhenAction.bind(this);
    this.hideSummonModal = this.hideSummonModal.bind(this);
    this.showError = this.showError.bind(this);
    this.summonBackwards = this.summonBackwards.bind(this);
    this.summonForwards = this.summonForwards.bind(this);
    this.summonAbort = this.summonAbort.bind(this);
  }

  componentDidMount(){
    this.setState({
      localOptions: this.props.localOptionsProp
    });
  }

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

  hideSummonModal = () => {
    var newStore = store.getState();
    newStore.state.showSummonModal = false;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showSummonModal: newStore.state.showSummonModal
      }
    })
  }

  showError(text){
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showErrorPrompt: true,
        showControlModal: false,
        errorText: text
      }
    })
  }

  summonBackwards(){
    axios.post('/summonBackward', {
      //update these to send correct info
    })
    .then(function(response){

    })
    .catch(function(error){

    });
    //alert("Summon Backwards pressed");
  }

  summonForwards(){
    axios.post('/summonForward', {

    })
    .then(function(response){

    })
    .catch(function(error){

    });
    //alert("Summon Forwards pressed");
  }

  summonAbort(){
    axios.post('/summonAbort')
    .then(function(response){

    })
    .catch(function(error){

    });
    //alert("Summon Aborted");
  }

  //The Modal - need to include in Main.js for link
  render(){
    return(
      <div>
        <Modal show={this.props.showControl} handleClose={this.hideSummonModal} >
              <div className="modal-content">
                  <div className="modal--close">
                      <button onClick={this.hideSummonModal}id="modal--control_close" className="modal--close_button"><i className="fas fa-times"></i></button>
                  </div>
                  <ul className="list--modal_btn">
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onMouseDown={this.summonForwards} onMouseUp={this.summonAbort} id="enginetoggle_btn">Summon Forward</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onMouseDown={this.summonBackwards} onMouseUp={this.summonAbort} id="lock">Summon Backwards</button></li>
                  </ul>
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
    showControl: state.state.showSummonModal
  }
}

export default connect(mapStateToProps)(SummonModal);
