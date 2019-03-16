import React, { Component } from 'react';

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

  render(){
    return(
      <div>
          <Modal show={this.state.showMedia} handleClose={this.hideMediaModal} >
            <div className="modal-content">
              <div className="modal--close">
                <button id="modal--media_close" onClick={this.hideMediaModal} className="modal--close_button"><i className="fas fa-times"></i></button>
              </div>
              <div className="modal--media_controls">
                <button className="media-volume_up btn btn--modal_btn">Volume Up</button>
                <button className="media-volume_down btn btn--modal_btn">Volume Down</button>
                <button className="media-control_button media-back" id="play_prev_btn"><i className="fas fa-backward"></i></button>
                <button className="media-control_button media-play"><i className="fas fa-play-circle"></i></button>
                <button className="media-control_button media-next" id="play_next_btn"><i className="fas fa-forward"></i></button>
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