import React, { Component } from 'react';

class ChargingModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showCharge: false,
      value: 80
    };
    this.handleChargeChange = this.handleChargeChange.bind(this);
  }

  showChargeModal = () => {
    this.setState({ showCharge: true });
  }

  hideChargeModal = () => {
    this.setState({ showCharge: false });
  }

  handleChargeChange (evt) {
    this.setState({ value: evt.target.value });
  }

  chargePortButton = () => {
    
  }

  render(){
    return(
      <div>
          <Modal show={this.state.showCharge} handleClose={this.hideChargeModal}>
            <div className="modal-content">
              <div className="modal--close">
                <button onClick={this.hideChargeModal}id="modal--charging_close" className="modal--close_button"><i className="fas fa-times"></i></button>
              </div>
              <div className="modal--charging_controls">
                <p id="charging--charge_level" className="modal--level_text">Max Charge: {this.state.value}%</p>
                  <input type="range" min="0" max="100" value={this.state.value} onChange={this.handleChargeChange} id="charging--charge_slider" className="modal--slider"/>
                  <button onClick={this.chargePortButton} id="charging--charge_port" className="btn btn--modal_btn">Open Port</button>
              </div>
            </div>
          </Modal>
          <li className="item--control_btn"><button onClick={this.showChargeModal} id="modal--charging_open" className="btn btn--control_btn">Charging</button></li>
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

export default (ChargingModal);