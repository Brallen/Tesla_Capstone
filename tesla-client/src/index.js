import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store/index.js';
import './Assets/Styles/main.css';
import Header from './Header';
import Main from './Main';
import Timer from './Timer'

ReactDOM.render(
    //provider allows our App that is wrapped inside of it to 
    //have access to our store
    <Provider store={store}>
        <Header />
        <Main />
        <Timer />
    </Provider>, 
    document.getElementById('root')
);
