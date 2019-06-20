import React, { Component } from 'react';
import axios from 'axios';  //in order to connect backend with the frontend

class Admin extends Component {

    //declaring variables
    constructor(props){
    super(props)
    this.state={
        data: '',
        users: ''
    };
}
//method that is fire after the render
componentDidMount = () => { 
    //get properties from db
    console.log()
    axios.get('http://localhost:8080/api/property').then(    //connect with the backend
         (response) => {
             this.setState({data: response.data});       //get the respons from db and set the state in the variables
             
         }).catch ( (error) => {
             console.log(error)
            });  
            console.log(this.state.data); 
    //get users from db
    axios.get('http://localhost:8080/api/user').then(    //connect with the backend
         (response2) => {
             this.setState({users: response2.data});       //get the respons from db and set the state in the variables
             
         }).catch ( (error) => {
             console.log(error)
            });         
}  
//handle the menu button action
handleHome = () => {
    this.props.history.push("/");
}
//handle the Delete property button
handleDelete = (hId) => {   
    //pass the hId to the doDelete method and send through props to the App.js parent    
    this.props.doDelete(hId);
}
//handle the Delete user button
handleDeleteU = (uId) => {   
    //pass the hId to the doDelete method and send through props to the App.js parent    
    this.props.doDeleteU(uId);
}
//handle the edit property button
handleEditP = (hID) => {
    //is calling withRouther from App.js and ask to push to /editProperty 
    //and pass the hID variable through state to /edidProperty page
    this.props.history.push({ pathname: "/editProperty", state: {id: hID}}); //assign in the stae hID to id
}
//handle the edit user button
handleEditU = (uID) => {
    //is calling withRouther from App.js and ask to push to /editUser 
    //and pass the uID variable through state to /edidUser page
    this.props.history.push({ pathname: "/editUser", state: {id: uID}}); //assign in the stae hID to id
}
//method that will display all properties, will be called in the render
showProperty = () => {
    return(
        <div>
            {
            Array.from(this.state.data).map( home => (                 
                <p3>
                   {/* display the home price, city, state... */}
                   {home.id}, {home.city}, {home.state},$ {home.price},{home.streetAddress}, {home.description}
                   {/* display the edit button; pass the home id to the handleEdit method when clicking edit */}
                   <button type="submit" onClick={() => {this.handleEditP(home.id)}}>Edit</button>
                   {/* display the delet button; pass the home id to the handleDelete method when clicking dellete*/}
                   <button type="submit" onClick={() => {this.handleDelete(home.id)}}>Delete</button><br/>
                </p3>
            ))}
        </div>
    );
}
//method that will display all users, will be called in the render
showUser = () => {
    return(
        <div>
            {
            Array.from(this.state.users).map( user => (                 
                <p3>
                   {/* display the user id, username, email... */}
                   {user.id}, {user.username}, {user.email}, {user.address}, 
                   {/* display the edit button; pass the user id to the handleEditU method when clicking edit */}
                   <button type="submit" onClick={() => {this.handleEditU(user.id)}}>Edit</button>
                   {/* display the delet button; pass the user id to the handleDeleteU method when clicking dellete*/}
                   <button type="submit" onClick={() => {this.handleDeleteU(user.id)}}>Delete</button><br/>
                </p3>
            ))}
        </div>
    );
}
//display the ui and get the user inputs; it is the first method that will be called
    render() {
        return (
            
            <div>
                <h1>Admin Page</h1>
                <button type="submit" onClick={this.handleHome}>Home</button>
                <h2>All users:</h2>
                <div>
                    <h3>{this.showUser()}</h3>  {/* call the showUser method */}
                </div>
                <h2>All properties: </h2>
                <div>
                    <h3>{this.showProperty()}</h3>  {/* call the showProperty method */}
                </div>         
            </div>
        );
    }
}
export default Admin;