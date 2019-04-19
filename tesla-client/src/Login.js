import React, { Component } from 'react';
import {connect} from 'react-redux';
import {store} from './store/index.js';
import {withCookies} from 'react-cookie';
import axios from 'axios'

class LoginModal extends Component {
  //Component constructor
  constructor(props){
    super(props);
    this.state = {
      show: true,
      email: '',
      password: '',
      authToken: '',
      refreshToken: '',
      localVehicleObject: {}
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.setLocalOptions = this.setLocalOptions.bind(this);
    this.handleRemember = this.handleRemember.bind(this);
    this.handleEnterPressed = this.handleEnterPressed.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    const { cookies } = this.props;
    let userCookie = cookies.get("token");
    let refreshCookie = cookies.get("refreshToken");
    if(userCookie != null && refreshCookie != null){
      this.setState({ authToken: userCookie, refreshToken: refreshCookie }, this.vehicleLoginCookie);
    }
  }

  handleEmailChange (evt) {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange (evt) {
    this.setState({ password: evt.target.value });
  }

  handleEnterPressed (evt) {
    var code = evt.keyCode || evt.which;
    if(code === 13)
    {
      this.loginFunction();
    }
  }

  handleRemember (evt) {
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
          rememberMeChecked: evt.target.checked
      }
    })
  }


  hideModal = () => {
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        showLogin: false
      }
    });
  }

  logout(){
    //delete our user cookie
    const { cookies } = this.props;
    cookies.remove('token', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    //reset client state
    store.dispatch({
      type: 'LOGOUT'
    });
  }

  loginFunction = () => {
      const { cookies } = this.props;
      var self = this;

      axios.post('/login', {
        email: self.state.email,
        password: self.state.password
      })
      .then(function (response) {
        //set loginFailed as false so we don't display an error
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
            loginFailed: false
          }
        });
        self.setState({ authToken: response.data.authToken, refreshToken: response.data.refreshToken }, self.vehicleLoginFunction);
        //if remember me is checked we will set cookies
        if(self.props.rememberMeChecked === true){
          cookies.set('token', response.data.authToken, { path: '/' });
          cookies.set('refreshToken', response.data.refreshToken, { path: '/' });
        }
      })
      .catch(function (error) {
        //set loginFailed as true so we can display an error
        store.dispatch({
          type: 'UPDATE_OBJECT',
          payload: {
            loginFailed: true
          }
        });
        //reset values of our login inputs
        self.setState({
          email: '',
          password: ''
        });
        console.log(error);
      });
  }

  vehicleLoginCookie = () => {
    var self = this;
    const { cookies } = this.props;
    axios.post('/refreshToken', {
      refreshToken: self.state.refreshToken
    })
    .then(function (response) {
      //if we do refresh, store our new cookies and update state
      self.setState({ authToken: response.data.authToken }, self.vehicleLoginFunction);
      //if remember me is checked we will set cookies
        cookies.set('token', response.data.authToken, { path: '/' });
        cookies.set('refreshToken', response.data.refreshToken, { path: '/' });
    })
    .catch(function (error) {
      //possibly add a login failed here
      self.logout();
      console.log(error);
    });
  }

  vehicleLoginFunction = () => {
    var self = this;
    //log in
    var newStore = store.getState();
    newStore.state.email = self.state.email;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        email: newStore.state.email
      }
    });
    axios.post('/vehicleID', {
      authToken: self.state.authToken
    })
    .then(function (response) {
      self.setState({ 
        localVehicleObject: response.data 
      });
      store.dispatch({
          type: 'LOGIN',
          payload: {
              accountToken: self.state.authToken,
              loggedIn: true,
              initialVehicleLoginObject: response.data
          }
      })
      self.setLocalOptions();
    })
    .catch(function (error) {
      console.log(error);
      self.logout();
    });
    //after all is said and done, discard email and password
    this.setState({
      email: '',
      password: ''
    });
    this.hideModal();

  }


  setLocalOptions(){
    var newStore = store.getState();
    newStore.state.localOptions.authToken = this.state.authToken;
    newStore.state.localOptions.vehicleID = this.state.localVehicleObject.id_s;
    newStore.state.localOptions.vehicle_id = this.state.localVehicleObject.vehicle_id;
    newStore.state.localOptions.tokens = this.state.localVehicleObject.tokens;
    store.dispatch({
      type: 'UPDATE_OBJECT',
      payload: {
        localOptions: newStore.state.localOptions
      }
    })
  }

  /*
    in the render, we can access all the functions of a component inside with
    this.functionName() wrapped in brackets like {this.function()}, this can be seen in the
    onClick functionality of the buttons.

    To access our varaibles passed down from the global store to the functions component state
    we use this.props.whateverFieldHere as seen in the H2 tags
  */
  render(){
    return(
            <Modal show={this.props.showLoginProp} handleClose={this.hideModal}>
            <div>
                <div className="container--header">
                    <div className="container--car_info">
                        <h1>Remote Login</h1>
                    </div>
                </div>
                <div className="modal-content">
                <p id="login-error">{this.props.loginFailed ? "Invalid Username or Password! " : ""}</p>
                    <div className="login-form-text">
                        <label htmlFor="email">Email: </label>
                        <input type="text"
                          placeholder="Enter Tesla Email"
                          name="email"
                          required id="email"
                          onChange={this.handleEmailChange}
                          value={this.state.email}/>
                        <br />
                        <label htmlFor="password">Password: </label>
                        <input type="password"
                          placeholder="Enter Tesla Password"
                          name="password"
                          required id="password"
                          onKeyPress={this.handleEnterPressed}
                          onChange={this.handlePasswordChange}
                          value={this.state.password}/>
                        <br />
                        <input id="checkbox"
                          type="checkbox"
                          label='Remember Me'
                          checked={this.props.rememberMeChecked}
                          onChange={this.handleRemember}/>
                        <label htmlFor="Remember"> Remember Me</label>
                    </div>
                    <button type="submit" onClick={this.loginFunction} className="btn btn--modal_btn" id="login">Login</button>

                </div>
            </div>
            </Modal>
    );
  }
}

/*
  this maps the global stores components that we want access to in our component. As you can see
  we only pass examplePropOne and examplePropTwo to this component, meaning we will be unable to
  access that field of our global store object in this component.
*/
const mapStateToProps = (state) => {
  return {
    email: state.state.email,
    accountToken: state.state.accountToken,
    loggedIn: state.state.loggedIn,
    vehicleDataObject: state.state.vehicleDataObject,
    localOptionsProp: state.state.localOptions,
    showLoginProp: state.state.showLogin,
    rememberMeChecked: state.state.rememberMeChecked,
    loginFailed: state.state.loginFailed
  }
}

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'block' : 'none';
    return (
        <div className="modal container--modal_login" style={{display: showHideClassName}}>
        {children}

    </div>
    );
  };

//connect our mapStateToProps and our App component and export
export default withCookies(connect(mapStateToProps)(LoginModal));
