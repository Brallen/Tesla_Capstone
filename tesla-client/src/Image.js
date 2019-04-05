import React, { Component } from 'react';
import { connect } from 'react-redux';

import Model3 from './Assets/Images/Tesla-model-3.png';
import ModelX from './Assets/Images/Tesla-model-x.png';
import ModelS from './Assets/Images/Tesla-model-s.png';


class Image extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }

  render(){
    return(
      <div>
        <div className="container--car_image">
          {JSON.stringify(this.props.vehicleOptionCodes).includes('MDL3') ? <img src={Model3} alt=""/> : null } 
          {JSON.stringify(this.props.vehicleOptionCodes).includes('MDLX') ? <img src={ModelX} alt=""/> : null } 
          {JSON.stringify(this.props.vehicleOptionCodes).includes('MDLS') ? <img src={ModelS} alt=""/> : null } 
          {JSON.stringify(this.props.vehicleOptionCodes).includes('MS03') ? <img src={ModelS} alt=""/> : null } 
          {JSON.stringify(this.props.vehicleOptionCodes).includes('MS04') ? <img src={ModelS} alt=""/> : null } 
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleOptionCodes: state.state.vehicleDataObject.option_codes
  }
}

export default connect(mapStateToProps)(Image);