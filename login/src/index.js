import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
=======
class App extends React.Component {
  state = {
   response: '',
   password: '',
   responseToPost: '',
   username: '',
 };
 componentDidMount() {
   this.callApi()
     .then(res => this.setState({ response: res.express }))
     .catch(err => console.log(err));
 }
 callApi = async () => {
   const response = await fetch('/api/hello');
   const body = await response.json();
   if (response.status !== 200) throw Error(body.message);
   return body;
 };
 handleSubmit = async e => {
   e.preventDefault();
   const response = await fetch('/api/world', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(this.state),
     //body: JSON.stringify({ password: this.state.password }),
   });
   const body = await response.text();
   this.setState({ responseToPost: body });
 };
  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
       <form onSubmit={this.handleSubmit}>
         <p>
           <strong>Login:</strong>
         </p>
         Username: <input name = "username" type="text" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
         Password: <input name = "password" type ="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>
         <button type="submit">Submit</button>
       </form>
       <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));
>>>>>>> 8647c029d5b82640cd780989977cccd5d28acf7d
