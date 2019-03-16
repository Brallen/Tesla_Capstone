import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';

class ControlModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showControl: false
    };
  }

  lockButton(){
    /* api call here */
    var newStore = store.getState();
    newStore.state.vehicleDataObject.vehicle_state.locked = !newStore.state.vehicleDataObject.vehicle_state.locked;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        vehicleDataObject: newStore.state.vehicleDataObject
      }
    })
  }

  showControlModal = () => {
    this.setState({ showControl: true });
  }

  hideControlModal = () => {
    this.setState({ showControl: false });
  }

  render(){
    return(
      <div>
          <Modal show={this.state.showControl} handleClose={this.hideControlModal} >
              <div className="modal-content">
                  <div className="modal--close">
                      <button onClick={this.hideControlModal}id="modal--control_close" className="modal--close_button"><i className="fas fa-times"></i></button>
                  </div>
                  <ul className="list--modal_btn">
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" id="enginetoggle_btn">Start Engine</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" onClick={this.lockButton} id="lock">{this.props.vehicleLocked ? 'Unlock' : 'Lock'}</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" id="honk">Honk Horn</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" id="flashlights_btn">Flash Lights</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" id="openfrunk_btn">Open Frunk</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" id="opentrunk_btn">Open Trunk</button></li>
                      <li className="item--modal_btn"><button className="btn btn--modal_btn" id="sunroof">Open Sunroof</button></li>
                  </ul>
              </div>
          </Modal>

          <li className="item--control_btn"><button onClick={this.showControlModal} id="modal--control_open" className="btn btn--control_btn">Controls</button></li>
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
      vehicleLocked: state.state.vehicleDataObject.vehicle_state.locked
    }
  }

export default connect(mapStateToProps)(ControlModal);