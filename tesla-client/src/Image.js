import React, { Component } from 'react';
import CarImage from './Assets/Images/Tesla-model-3.png';
import {store} from './store/index.js';

class Image extends Component{
  render(){
    return(
      <div>
        <div className="container--car_image">
          <img src={CarImage} alt=""/>
        </div>
      </div>
    );
  }
}
export default (Image);