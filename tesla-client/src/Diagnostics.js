import React, { Component } from 'react';
import {store} from './store/index.js';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';

class Diagnostics extends Component{
  constructor(props) {
    super(props);
    this.state = {
      localOptions: {}
    };
    this.hideDiagnosticsModal = this.hideDiagnosticsModal.bind(this);
  }
  
  componentDidMount(){
    this.setState({ 
      localOptions: this.props.localOptionsProp
    });
  }

  hideDiagnosticsModal = () => {
    var newStore = store.getState();
    newStore.state.showDiagnosticsModal = false;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showDiagnosticsModal: newStore.state.showDiagnosticsModal
      }
    })
  }


render(){
    return(
    <div>
        <Modal show={this.props.show} handleClose={this.hideLogoutModal} >
            <div className="modal-content-diagnostics">
                <div className="modal--close">
                    <button onClick={this.hideDiagnosticsModal}id="modal--diagnostics_close" className="modal--close_button"><i className="fas fa-times"></i></button>
                </div>
                <p>Vehicle State: {JSON.stringify(this.props.vehicleData.vehicle_state, null, 4)}</p> <br />
                <p>Drive State: {JSON.stringify(this.props.vehicleData.drive_state, null, 4)}</p> <br />
                <p>Charge State: {JSON.stringify(this.props.vehicleData.charge_state, null, 4)}</p> <br />
                <p>Climate State: {JSON.stringify(this.props.vehicleData.climate_state, null, 4)}</p> <br />
                <p>Vehicle Config: {JSON.stringify(this.props.vehicleData.vehicle_config, null, 4)}</p> <br />
                <p>GUI Settings: {JSON.stringify(this.props.vehicleData.gui_settings, null, 4)}</p> <br />
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
    localOptionsProp: state.state.localOptions,
    show: state.state.showDiagnosticsModal,
    vehicleData: state.state.vehicleDataObject
  }
}

export default withCookies(connect(mapStateToProps)(Diagnostics));