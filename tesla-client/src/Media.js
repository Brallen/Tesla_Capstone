import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import axios from 'axios';

class MediaModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      localOptions: {}
    };
    this.refreshGlobalTimerWhenAction = this.refreshGlobalTimerWhenAction.bind(this);
    this.volumeDown = this.volumeDown.bind(this);
    this.volumeUp = this.volumeUp.bind(this);
    this.trackForward = this.trackForward.bind(this);
    this.trackBackward = this.trackBackward.bind(this);
    this.trackPlayPause = this.trackPlayPause.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount(){
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


  hideMediaModal = () => {
    var newStore = store.getState();
    newStore.state.showMediaModal = false;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showMediaModal: newStore.state.showMediaModal
      }
    })
  }

  volumeUp(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    /* api call here */
    axios.post('/volumeUp', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, we don't need to do anything
    })
    .catch(function (error) {
      self.showError("Error: Could not toggle volume up");
    });
  }

  volumeDown(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    /* api call here */
    axios.post('/volumeDown', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, we don't need to do anything
    })
    .catch(function (error) {
      self.showError("Error: Could not toggle volume down");
    });
  }

  trackForward(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    /* api call here */
    axios.post('/nextSong', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, we don't need to do anything
    })
    .catch(function (error) {
      self.showError("Error: Could not toggle track forward");
    });
  }

  trackBackward(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    /* api call here */
    axios.post('/prevSong', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, we don't need to do anything
    })
    .catch(function (error) {
      self.showError("Error: Could not toggle track backwards");
    });
  }

  trackPlayPause(){
    this.refreshGlobalTimerWhenAction();
    var self = this;
    /* api call here */
    axios.post('/toggleMusic', {
      auth: JSON.stringify(this.state.localOptions)
    })
    .then(function (response) {
      //if it's a good response, we don't need to do anything
    })
    .catch(function (error) {
      self.showError("Error: Could not play/pause the track");
    });
  }

  render(){
    return(
      <div>
          <Modal show={this.props.showMedia} handleClose={this.hideMediaModal} >
            <div className="modal-content">
              <div className="modal--close">
                <button id="modal--media_close" onClick={this.hideMediaModal} className="modal--close_button"><i className="fas fa-times"></i></button>
              </div>
              <div className="modal--media_controls">
                <button className="media-volume_up btn btn--modal_btn" onClick={this.volumeUp}>Volume Up</button>
                <button className="media-volume_down btn btn--modal_btn" onClick={this.volumeDown}>Volume Down</button>
                <button className="media-control_button media-back" id="play_prev_btn" onClick={this.trackBackward}><i className="fas fa-backward"></i></button>
                <button className="media-control_button media-play" onClick={this.trackPlayPause}><i className="fas fa-playpause"></i></button>
                <button className="media-control_button media-next" id="play_next_btn" onClick={this.trackForward}><i className="fas fa-forward"></i></button>
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
      showMedia: state.state.showMediaModal
    }
  }

export default connect(mapStateToProps)(MediaModal);