import React, { Component } from 'react';

class ClimateModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: 70
    };
    this.handleClimateChange = this.handleClimateChange.bind(this);
  }

  showClimateModal = () => {
    this.setState({ showClimate: true });
  }

  hideClimateModal = () => {
    this.setState({ showClimate: false });
  }

  handleClimateChange (evt) {
    this.setState({ value: evt.target.value });
  }

  render(){
    return(
      <div>
        <Modal show={this.state.showClimate} handleClose={this.hideClimateModal}>
          <div className="modal-content">
            <div className="modal--close">
              <button onClick={this.hideClimateModal} id="modal--climate_close" className="modal--close_button"><i className="fas fa-times"></i></button>
            </div>
            <div className="modal--climate_controls">
              <p id="climate--temp_level" className="modal--level_text">Climate: {this.state.value}F</p>
              <input type="range" min="40" max="85" value={this.state.value} onChange={this.handleClimateChange} id="climate--temp_slider" className="modal--slider"/>
              <button id="climate--control" className="btn btn--modal_btn">Turn Climate Control On</button>
              <div id="climate--seat_warmers" className="climate--seat_warmers">
                <div className="climate--seats climate--front_seats">
                    <button id="climate--seat_fl" className="climate--seat_btn"><i className="climate--img fas fa-fire-alt"></i></button>
                    <button id="climate--seat_fr" className="climate--seat_btn"><i className="climate--img fas fa-fire-alt"></i></button>
                </div>
                <div className="climate--seats climate--back_seats">
                    <button id="climate--seat_bl" className="climate--seat_btn"><i className="climate--img fas fa-fire-alt"></i></button>
                    <button id="climate--seat_bm" className="climate--seat_btn"><i className="climate--img fas fa-fire-alt"></i></button>
                    <button id="climate--seat_br" className="climate--seat_btn"><i className="climate--img fas fa-fire-alt"></i></button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <li className="item--control_btn"><button onClick={this.showClimateModal} id="modal--climate_open" className="btn btn--control_btn">Climate</button></li>
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

export default (ClimateModal);