import React, { Component } from 'react';
import { connect } from 'react-redux';

import Teslar from './Assets/Images/teslar.png';

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
          <img src={Teslar} alt=""/>
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
