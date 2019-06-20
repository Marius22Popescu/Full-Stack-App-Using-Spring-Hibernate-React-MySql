import React, { Component } from 'react';
import axios from 'axios';  //in order to connect backend with the frontend

class User extends React.Component {
    //declaring variables
   constructor(props){
    super(props)
    this.state={
        username:'',
        property: '',
        data:''
    };
}
//is fire after the render
componentDidMount = () => {
        let url = this.props.username + '/and/' + this.props.password;  //connect with the backend
        axios.get('http://localhost:8080/api/user/' + url).then(
             (response) => {
                 this.setState({data: response.data});       //get the respons from db and set the state in the variables
                 this.setState({property: response.data.propety});  //copy the user properties from db to the property variable
             }).catch ( (error) => {
                 console.log(error)
                });       
    }    
    //handle the edit button
    handleEdit = (hID) => {
        //is calling withRouther from App.js and ask to push to /editProperty 
        //and pass the hID variable through state to /edidProperty page
        this.props.history.push({ pathname: "/editProperty", state: {id: hID}}); //assign in the stae hID to id
    }
    //handle the Delete property button
    handleDelete = (hId) => {   
        //pass the hId to the doDelete method and send through props to the App.js parent    
        this.props.doDelete(hId);
    }
    //handle the Add Property button
    handleNewProp = () => {
        //is calling withRouther from App.js and ask to push to /addProperty
        this.props.history.push("/addProperty");
    }
    //handle the menu button action
    handleHome = () => {
        //is calling withRouther from App.js and ask to push to /
        this.props.history.push("/");
    }
    //method that will display a property, will be called in the render for each property
    showProperty = () => {
        return(
            <div>
                {
                Array.from(this.state.property).map( home => ( 
                    // display the home price, city, state...                
                    <p3>{home.price}, {home.city}, {home.state}, {home.description}, {home.address} 
                    {/* display the edit button; pass the home id to the handleEdit method when clicking edit */}
                    <button type="submit" onClick={() => {this.handleEdit(home.id)}}>Edit</button>
                    {/* display the delet button; pass the home id to the handleDelete method when clicking dellete*/}
                    <button type="submit" onClick={() => {this.handleDelete(home.id)}}>Delete</button><br/></p3>
                ))}
            </div>
        );
    }
    //display the ui and get the user inputs; it is the first method that will be called
    render() {

        return (
            <div>
                       
            <h2> Welcome Mr. {this.state.data.username} </h2>
            <h3> Your listed properties are: </h3>
            
            <div>       
                <h3>{this.showProperty()}</h3>
            </div>
            <div>
            <button type="submit" onClick={this.handleNewProp}>Post new property</button>
            <button type="submit" onClick={this.handleHome}>Home</button>
            </div>
            </div>
        );
    }
}
export default User;