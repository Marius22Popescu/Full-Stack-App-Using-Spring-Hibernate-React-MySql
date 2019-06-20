import React, { Component } from 'react';
import Axios from 'axios'; //will connect the back end with front end
import debug from 'debug';
import Register from '../components/Register';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

class Login extends Component {
   //declaring variables
   constructor(props){
       super(props)
       this.state={
           username:'',
           password:''
       };
   }
   //declaring methods(handlers) for ui text inputs
   //get the value from the ui in the username state
   handlerUsernameChange = event=>{
       this.setState({username:event.target.value}
           )
   }
   //get the value from the ui in the pasword state
   handlerPasswordChange = event=>{
       this.setState({password:event.target.value})
   }

    handleChange = (e, data) => {                           //?????????????????????????
        this.setState({[e.target.name]: e.target.value});
};

//handle the action for the login button
handleSubmit = (event) => {
    event.preventDefault(); 
    this.props.onLogin(this.state.username, this.state.password);
};
//handle the action for home button
handleHome = ()=> {
    this.props.history.push("/");
}
   //display the ui and get the user inputs; it is the first method that will be called 
   render() {
    
       const {username, password} = this.state
       return (
       <Router>
        <form onSubmit={this.handleSubmit}>

         <h2>Login</h2>
            <h3>Please enter your username and password</h3>
            
           <div>
               <label>Username</label>
               <input type = "text" value={username} onChange={this.handlerUsernameChange}/>
           </div>
           <div>
               <label>Password</label>
               <input type = "password" value ={password} onChange={this.handlerPasswordChange}/>
           </div>
           <button type="submit" onClick={this.handleSubmit}>Submit</button>   
           <button type="submit" onClick={this.handleHome}>Home</button>
           </form>
        </Router>
       );
    }  
}
export default Login;