import React,{Component} from 'react';
import {Route, Switch, withRouter} from "react-router-dom"; //in order to switch between pages
import axios from 'axios';  //in order to connect backend with the frontend 
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import Admin from './components/Admin';
import AddProperty from './components/AddProperty';
import EditProperty from './components/EditProperty';
import EditUser from './components/EditUser';
import ChoseCity from './components/ChoseCity';
import FilterPrice from './components/FilterPrice';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        currentUser : null,
        isLoading: false,
        username: null,
        password: null,
        uId:null ,
        properties: null,
        properties2: null
    }

    this.loadCurrentUser = this.loadCurrentUser.bind(this); //bind state methods with methods
    this.handleLogin = this.handleLogin.bind(this);
}
//this method will get a user from db
loadCurrentUser = (username, password) => { 
    this.setState({
        isLoading: true,
        username: username, //assign the parameter variable to the state variable
        password: password
    })
    let url = username + '/and/' + password;  //connect with the backend
    axios.get('http://localhost:8080/api/user/' + url).then(
        response => {
             this.setState({data: response.data});  //get the respons from db and set the state in the variables
             this.setState({uId: response.data.id});
             this.props.history.push("/user");
         }).catch (error => {
             console.log(error)
             alert("Wrong credentials."); //Alert the user
             this.props.history.push("/login"); //Push back to the login page 
            });
}
//this method will save a new user in the db
saveNewUser = (username, password, email, phone, address) => {  
  this.setState=({
    username: username, //assign the parameter variable to the state variable
    password: password,
    email: email,
    phone: phone,
    address: address
}); //send the info in the body of post method
    axios.post('http://localhost:8080/api/user', //connect with the backend
    { //put the variables inside the post body
      username: username,
      password: password,
      email: email,
      ph_number: phone,
      address: address,
      type: 0
    }) 
   .then(  
      (response) => {
          this.setState({data: response.data});  
      }).catch ((error) => {
          console.log(error.response)
         });
}
//this method will save a new property in the db
saveNewProperty = (city, description, price, state, streetAddress, type) => {  
  this.setState=({     
    city: city,   //assign the parameter variable to the state variable
    description: description,
    price: price,
    state: state,
    streetAddress: streetAddress,
    type: type
}); //send the info in the body of post method
    axios.post('http://localhost:8080/api/property/' + this.state.uId,  //connect with the backend
    { //put the variables inside the post body
    city: city, 
    description: description,
    price: price,
    state: state,
    streetAddress: streetAddress,
    type: 1
    }) 
   .then(  
      (response) => {
          this.setState({data: response.data});  
      }).catch ((error) => {
          console.log(error.response)
         });
}
//this method will delete a property from db
deleteProperty = (hId) =>{
  axios.delete('http://localhost:8080/api/property/'+hId) //connect with the backend
  .then(response => {
    console.log("successfully deleted");
}).catch( error => {
  console.log("Not work delet property.")
})
}
//this method will delete a user from db
deleteUser = (uId) =>{
  axios.delete('http://localhost:8080/api/user/'+uId) //connect with the backend
  .then(response => {
    console.log("successfully deleted");
}).catch( error => {
  console.log("Not work delete user.")
})
}
//this method will get all the propertie from db filterig by city and send to /ChoseCity page
displayByCity = (citychange) => {
axios.get('http://localhost:8080/api/property/city/' + citychange).then(  //connect with the backend
    response => {
         this.setState({properties: response.data});  //get the respons from db and set the state in the variables
         this.props.history.push({
           pathname: "/cityChange", //push to cityChange price
          state: {data: response.data}});
     }).catch (error => {
         console.log(error)
         alert("City not found"); //Alert the user
         this.props.history.push("/"); //Push back to the home page 
        });
}
//this method will get all the propertie from db filterig by price and send to /FilterPrice page
displayByPrice = (pricechange) => {
  console.log(pricechange);
axios.get('http://localhost:8080/api/property/price/' + pricechange).then(  //connect with the backend
    response => {
         this.setState({properties: response.data});  //get the respons from db and set the state in the variables
         this.props.history.push({
           pathname: "/filterPrice",  //push to /filterPrice page
          state: {data: response.data}});
         console.log(response.data[0]);
     }).catch (error => {
         console.log(error)
         alert("We do not found properies less than this price"); //Alert the user
         this.props.history.push("/"); //Push back to the home page 
        });
}
//this method will edit a existing property in the db
editProperty = (city, description, price, state, streetAddress, type, id) => {
  axios.put('http://localhost:8080/api/property/edit/' + id, {  //connect with the backend
    city: city, 
    description: description,
    price: price,
    state: state,
    streetAddress: streetAddress,
    type: type,
    id: id
  }).then( response => {
      console.log("Property edited.");
  }).catch( error => {
    console.log("Not work edit property.")
  })
}
//this method will edit a existing user in the db
editUser = (username, password, email, phone, address, id) => {
  axios.put('http://localhost:8080/api/user/' + id, {  //connect with the backend
  username: username, 
  password: password,
  email: email,
  phone: phone,
  address: address,
  id: id

  }).then( response => {
      console.log("User edited.");
  }).catch( error => {
    console.log("Not work edit user.")
  })
}
//handle the action for login button 
handleLogin = (username, password) => {  
    
    if (username === 'b' && password === '12345'){
      this.props.history.push("/admin"); //go to admin page
    }
    else
       //go to user page
     { this.loadCurrentUser(username, password); //load the user from db
     }
};
//handle the action for the register button
handleRegister = () =>{    
  this.props.history.push("/register");
};

  render(){
    return (
      //define switch cases in order to route betwen pages ang get the user inputs
      //first the program is going here and get the user inputs inside the variable
<div>
    <Switch>  
      {/* this is the starting page; pass the test and passP objects from home page to App.js */}
      <Route exact path= "/" render = {(props) => <Home test={this.displayByCity} passP={this.displayByPrice} {...props}/>}>
      </Route>                
      {/* redirect to the login page, bind the Login and Submit buttons with the metods*/}  
      <Route path="/login" render =  
        {(props) => <Login onLogin={this.handleLogin} onRegister={this.handleRegister}{...props} />}>
      </Route>
      {/* get the user inputs inside the username and password variables and redirect to the /user page;
       get the house id from the doDelete object from /user page and pass to the deleteProperty method 
       get the property id from doEdit object from /user page and pass to the editProperty method*/}
      <Route path="/user" render = 
        {(props) => <User username={this.state.username} password={this.state.password} 
        doDelete={this.deleteProperty} doEdit={this.editProperty} {...props} />}>  
      </Route>
      {/* get the user inputs inside the username and password variables and redirect to the /admin page 
      get the house id from the doDelete object from /admin page and pass to the deleteProperty */}
      <Route path="/admin" render = 
        {(props) => <Admin username={this.state.username} password={this.state.password} doDelete={this.deleteProperty} 
        // get the user id from the doDeleteU object from /admin page and pass to the deleteUser
        doDeleteU={this.deleteUser} {...props} />}>
      </Route>
      {/* redirect to the /register page, get returning parameters from registerSuccess object from /register page and pass to the saveNewUser method */}
      <Route path="/register" render = 
        {(props) => <Register registerSuccess={this.saveNewUser} {...props} />}>     
      </Route>
      {/* redirect to the /addProperty page, get returning parameters from registerSuccess object from /addProperty page and pass to the saveNewUser method */}
      <Route path="/addProperty" render = 
        {(props) => <AddProperty registerSuccess={this.saveNewProperty} {...props} />}>     
      </Route>
      {/* redirect to the /editProperty page, get returning parameters from editSuccess object from /editProperty page and pass to the editProperty method */}
      <Route path="/editProperty" render = 
        {(props) => <EditProperty editSuccess={this.editProperty} {...props} />}>     
      </Route>
      {/* redirect to the /editUser page, get returning parameters from editSuccess object from /editUser page and pass to the editUser method */}
      <Route path="/editUser" render = 
        {(props) => <EditUser editSuccess={this.editUser} {...props} />}>     
      </Route>
      {/* redirect to the /choseCity page; get returning parameters from passCity object from /App page and pass to the showProperty method in /cityChange method*/}
      <Route path="/cityChange" render = 
        {(props) => <ChoseCity passCity={this.showProperty} {...props}/>}>
      </Route>
      {/* redirect to the /filterPrice page; get returning parameters from passPass object from /App page and pass to the showProperty method in FilterPrice page */}
      <Route path="/filterPrice" render = 
        {(props) => <FilterPrice passPrice={this.showProperty} {...props}/>}>
      </Route>
    </Switch>
</div> 
    );
  }
}
export default withRouter(App);