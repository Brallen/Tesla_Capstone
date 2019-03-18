import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';

class MediaModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showMedia: false,
      localOptions: {}
    };
    this.refreshGlobalTimerWhenAction = this.refreshGlobalTimerWhenAction.bind(this);
    this.volumeDown = this.volumeDown.bind(this);
    this.volumeUp = this.volumeUp.bind(this);
    this.trackForward = this.trackForward.bind(this);
    this.trackBackward = this.trackBackward.bind(this);
    this.trackPlayPause = this.trackPlayPause.bind(this);
  }

  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
    //alert(JSON.stringify(this.state.localOptions))
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

  showMediaModal = () => {
    this.setState({ showMedia: true });
  }

  hideMediaModal = () => {
    this.setState({ showMedia: false });
  }

  volumeUp(){
    this.refreshGlobalTimerWhenAction();
    /* api call here */
    alert("temp - volume up");
  }

  volumeDown(){
    this.refreshGlobalTimerWhenAction();
    /* api call here */
    alert("temp - volume down");
  }

  trackForward(){
    this.refreshGlobalTimerWhenAction();
    /* api call here */
    alert("temp - track forward");
  }

  trackBackward(){
    this.refreshGlobalTimerWhenAction();
    /* api call here */
    alert("temp - track backward");
  }

  trackPlayPause(){
    this.refreshGlobalTimerWhenAction();
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
                <button className="media-control_button media-play" onClick={this.trackPlayPause}><i className="fas fa-playpause"></i></button>
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

  const mapStateToProps = (state) => {
    return {
      globalTimerInterval: state.state.refreshInterval,
      localOptionsProp: state.state.localOptions
    }
  }

export default connect(mapStateToProps)(MediaModal);