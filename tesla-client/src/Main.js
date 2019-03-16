import React, { Component } from 'react';
import LoginModal from './Login';
import Image from './Image';
import ControlModal from './Control';
import MediaModal from './Media';
import ClimateModal from './Climate';
import ChargingModal from './Charge';
import {store} from './store/index.js';
import {connect} from 'react-redux';

class Main extends Component{

  testFunc(){
    alert(JSON.stringify(store.getState()));
  }

  render(){
    return(
      <div>
        <main className="container--main_section">
          <Image/>
          <div className="container--control_btn">
            <ul className="list--control_btn" id="modal--control_open"><ControlModal/></ul>
            <ul className="list--control_btn" id="modal--media_open"><MediaModal/></ul>
            <ul className="list--control_btn" id="modal--climate_open"><ClimateModal/></ul>
            <ul className="list--control_btn" id="modal--charging_open"><ChargingModal/></ul>  
            <ul className="list--control_btn" id="modal--do_what_i_want">
              <li className="item--control_btn">
                <button onClick={this.testFunc} id="modal--media_open" className="btn btn--control_btn">GIVE ME THE STORE</button>
              </li>
            </ul>  
          </div>
          <LoginModal/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountName: state.state.accountName,
    accountPass: state.state.accountPass,
    accountToken: state.state.accountToken
    //examplePropThree: state.state.examplePropThree
  }
}

export default connect(mapStateToProps)(Main);