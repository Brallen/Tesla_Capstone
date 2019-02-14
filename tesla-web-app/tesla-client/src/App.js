import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import tesla from './Tesla-model-3.png';
import './index.css';

class TeslaApp extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <BackButton/>
                <VehicleInformation/>
                <VehicleImage/>
                <QuickActions/>
                <FooterButtons/>
            </div>
        );
    }
}


class Header extends React.Component {
    render() {
        return (
            <div>
                <head>
                <meta charset='utf-8' />
                <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                <title>Tesla Capstone</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.6.3/css/all.css' integrity='sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/' crossorigin='anonymous' />
                <link rel='stylesheet' type='text/css' media='screen' href='main.css' />
                </head>
            </div>
        );
    }
}

class BackButton extends React.Component {
    render() {
        return (
            <div>
                <main className='container--main_section' />
                <div className='container--back_button' >
                <i className='fas fa-arrow-left' />
                </div>
            </div>
        );
    }
}

class VehicleImage extends React.Component {
    render() {
        return (
                <div className='container--car_image'>
                <img src={tesla} alt='logo'/>
                </div>
        );
    }
}

class VehicleInformation extends React.Component {
    render() {
        return (
                <div className='container--car_info'>
                <h1>Car Title</h1>
                <p>88% remaining</p>
                </div>

        );
    }
}

class QuickActions extends React.Component {
    render() {
        return (
            <div>
                <div className='container--quick_action'>
                <ul className='list--quick_action'>
                <li className='item--quick_action'><button className='btn btn--quick_action'>Lock</button></li>
                <li className='item--quick_action'><button className='btn btn--quick_action'>Unlock</button></li>
                <li className='item--quick_action'><button className='btn btn--quick_action'>Turn on</button></li>
                <li className='item--quick_action'><button className='btn btn--quick_action'>Turn off</button></li>
                </ul>
                </div>
            </div>
        );
    }
}

class FooterButtons extends React.Component {
    render() {
        return (
            <div>
                <footer className='container--control_btn'>
                <div className='container--control_btn' />
                <ul className='list--control_btn'>
                <li className='item--control_btn'><button className='btn btn--control_btn'>Overview</button></li>
                <li className='item--control_btn'><button className='btn btn--control_btn'>Controls</button></li>
                <li className='item--control_btn'><button className='btn btn--control_btn'>Climate</button></li>
                <li className='item--control_btn'><button className='btn btn--control_btn'>Summon</button></li>
                <li className='item--control_btn'><button className='btn btn--control_btn'>Diagnostics</button></li>
                <li className='item--control_btn'><button className='btn btn--control_btn'>My Fleet</button></li>
                </ul>
                </footer>
            </div>
        );
    }
}

export default TeslaApp;
