import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

class Register extends Component {

    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            firstname:'',
            lastname:'',
            email:'',
            phone:'',
            address:''
        }
    }
    //get the value from the ui in the firstname state
    handlerFirstnameChange = event=>{
        this.setState({firstname:event.target.value}
            )
    }
    //get the value from the ui in the username state
    handlerLastnameChange = event=>{
        this.setState({username:event.target.value}
            )
    }
    //get the value from the ui in the email state
    handlerEmailChange = event=>{
        this.setState({email:event.target.value}
            )
    }
    //get the value from the ui in the phone state
    handlerPhoneChange = event=>{
        this.setState({phone:event.target.value}
            )
    }
    //get the value from the ui in the address state
    handlerAddressChange = event=>{
        this.setState({address:event.target.value}
            )
    }
    //get the value from the ui in the username state
    handlerUsernameChange = event=>{
        this.setState({username:event.target.value}
            )
    }
    //get the value from the ui in the pasword state
    handlerPasswordChange = event=>{
        this.setState({password:event.target.value})
    }
    //handle the action of submit button
    handleSubmit = (event) => {
        event.preventDefault(); //prevents the event fromm refresh
        this.props.registerSuccess( //send info from user input to the login page
            this.state.username,
            this.state.password,
            this.state.email,
            this.state.phone,
            this.state.address
        );
        this.props.history.push("/");
    }
    //handle the action for menu button
    handleHome = ()=> {
        this.props.history.push("/");
    }
    //display the ui and get the user inputs; it is the first method that will be called
    render() {
        //put the state in the variable; instead of using this.state for each variable
        const {username, password, firstname, lastname, email, phone, address} = this.state
        return (
            <div class="form-container">
            <form>
                <div style={{ marginTop: 100 }}>
                    <h3>User Registration</h3>
                </div>
                <div>
                    <label>First Name</label>
                    <input type = "text" value={firstname} onChange={this.handlerFirstnameChange}/>
                </div>
                <div>
                     <label>Username</label>
                    <input type = "text" value={username} onChange={this.handlerLastnameChange}/>
                </div>
                <div>
                    <label>Phone no. </label>
                    <input type = "text" value={phone} onChange={this.handlerPhoneChange}/>
                </div>
                <div>
                    <label>Email    </label>
                    <input type = "text" value={email} onChange={this.handlerEmailChange}/>
                </div>
                <div>
                    <label>Address   </label>
                    <input type = "text" value={address} onChange={this.handlerAddressChange}/>
                </div>
                <div>
                    <label>Password  </label>
                    <input type = "password" value ={password} onChange={this.handlerPasswordChange}/>
                </div>
                    <button onClick={this.handleSubmit}>Submit</button>
                    <button onClick={this.handleHome}>Home</button>
                </form>
            </div>
        );
     }  
}
export default Register;