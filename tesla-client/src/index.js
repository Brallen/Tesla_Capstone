import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';
import {store} from './store/index.js';
import './Assets/Styles/main.css';
import Main from './Main';

ReactDOM.render(
    //provider allows our App that is wrapped inside of it to 
    //have access to our store
    <CookiesProvider>
        <Provider store={store}>
            <Main />
        </Provider>
    </CookiesProvider>, 
    document.getElementById('root')
);
