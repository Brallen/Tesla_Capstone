import React, { Component } from 'react';
import {connect} from 'react-redux';
import {store} from './store/index.js';
import Timer from './Timer.js'
import axios from 'axios'

class LoginModal extends Component {
  //Component constructor
  constructor(props){
    super(props);
    this.state = {
      show: true,
      email: '',
      password: '',
      authToken: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange (evt) {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange (evt) {
    this.setState({ password: evt.target.value });
  }

  //this function dispatches an EXAMPLE action to our store
  exampleDispatchFunc(){
    store.dispatch({
      type: 'ENTER_ACCOUNT_INFO',
      payload: {}
    })
    //alert(JSON.stringify(store.getState()));
  }


  loginFunction = () => {
    var self = this;
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(function (response) {
      self.setState({ authToken: response.data });
      self.vehicleLoginFunction();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
    this.loginFunction();
  }

  vehicleLoginFunction = () => {
    var self = this;
    axios.post('/vehicleID', {
      authToken: this.state.authToken
    })
    .then(function (response) {
      //alert(JSON.stringify(response.data.response));
      alert(JSON.stringify(response));
      self.setState({ vehicleID: response.data.id_s });
      self.setState({ vehicle_id: response.data.vehicle_id });
      self.setState({ tokens: response.data.tokens });
      self.setState({ vehicle_name: response.data.display_name });
        alert("TEST LOGIN\nYour credentials:\nemail: "+self.state.email+"\npassword: "+self.state.password+"\nauthToken: "+
        self.state.authToken+"\nvehicleID: "+self.state.vehicleID+"\nvehicle_id: "+self.state.vehicle_id+"\ntokens: "+self.state.tokens+"\n")
    })
    .catch(function (error) {
     console.log(error);
    });
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
      <div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <div class="modal container--modal_login">
          <div class="modal-content">
          <p id='login-error'></p>
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Tesla Email" name="email" required id="email" onChange={this.handleEmailChange}/>
            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Tesla Password" name="password" required id="password" onChange={this.handlePasswordChange}/>
            <button type="submit" onClick={this.hideModal} class="btn btn--modal_btn" id="login">Login</button>
          </div>
          </div>
        </Modal>
        
      </div>
    )
  }
}

/*
  this maps the global stores components that we want access to in our component. As you can see
  we only pass examplePropOne and examplePropTwo to this component, meaning we will be unable to 
  access that field of our global store object in this component. 
*/
const mapStateToProps = (state) => {
  return {
    accountName: state.state.accountName,
    accountPass: state.state.accountPass,
    accountToken: state.state.accountToken
    //examplePropThree: state.state.examplePropThree
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' :'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

//connect our mapStateToProps and our App component and export
export default connect(mapStateToProps)(LoginModal);
