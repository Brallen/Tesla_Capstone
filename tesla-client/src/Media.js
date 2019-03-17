import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';

class MediaModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showMedia: false
    };
  }

  showMediaModal = () => {
    this.setState({ showMedia: true });
  }

  hideMediaModal = () => {
    this.setState({ showMedia: false });
  }

  volumeUp(){
    /* api call here */
    alert("temp - volume up");
  }

  volumeDown(){
    /* api call here */
    alert("temp - volume down");
  }

  trackForward(){
    /* api call here */
    alert("temp - track forward");
  }

  trackBackward(){
    /* api call here */
    alert("temp - track backward");
  }

  trackPlayPause(){
    /* api call here */
    alert("temp - play / paused");
  }

  render(){
    return(
      <div>
          <Modal show={this.state.showMedia} handleClose={this.hideMediaModal} >
            <div className="modal-content">
              <div className="modal--close">
                <button id="modal--media_close" onClick={this.hideMediaModal} className="modal--close_button"><i className="fas fa-times"></i></button>
              </div>
              <div className="modal--media_controls">
                <button className="media-volume_up btn btn--modal_btn" onClick={this.volumeUp}>Volume Up</button>
                <button className="media-volume_down btn btn--modal_btn" onClick={this.volumeDown}>Volume Down</button>
                <button className="media-control_button media-back" id="play_prev_btn" onClick={this.trackBackward}><i className="fas fa-backward"></i></button>
                <button className="media-control_button media-play" onClick={this.trackPlayPause}><i className="fas fa-play-circle"></i></button>
                <button className="media-control_button media-next" id="play_next_btn" onClick={this.trackForward}><i className="fas fa-forward"></i></button>
              </div>
            </div>
          </Modal>

          <li className="item--control_btn"><button onClick={this.showMediaModal}id="modal--media_open" className="btn btn--control_btn">Media</button></li>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'block' : 'none';
    return (
        <div className='modal' style={{display: showHideClassName}}>
        {children}
        <button onClick={handleClose}>
          Close
        </button>
    </div>
    );
  };

export default (MediaModal);