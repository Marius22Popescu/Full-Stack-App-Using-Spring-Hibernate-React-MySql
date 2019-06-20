import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import {Carousel} from 'react-responsive-carousel';
import axios from 'axios';  //in order to connect backend with the frontend


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            citychange: '',
            priceLess: ''
        }
    }
    //method that is fire after the render
    componentDidMount = () => { 
        axios.get('http://localhost:8080/api/property').then(    //connect with the backend
             (response) => {
                 this.setState({data: response.data});       //get the respons from db and set the state in the variables                
             }).catch ( (error) => {
                 console.log(error)
                });  
                console.log('im here');
                console.log(this.state.data);     
    }  
    //method that will display a property, will be called in the render for each property
    showProperty = () => {
        return(
            <div>
                {
                Array.from(this.state.data).map( home => (                 
                    <p3>
                        <div style={{ marginTop: 10 }}>
                       $ {home.price}, {home.city}, {home.state}, {home.description}, {home.address} <br/>
                       <img size = 'small'
                                src=  {`/pictures/${home.id}.jpg`} width="1100" height="800"/> <br/>
                        </div>
                    </p3>
                ))}
            </div>
        );
    } 
    //handle the action of submit button
    handleLogin = (event) => {
        this.props.history.push("/login");
    }
    //handle the action of submit button
    handleRegister = (event) => {
        this.props.history.push("/register");
    }
    //get the value from the ui in the citychange
    handlerCityChange = (event)=>{
    this.setState({citychange:event.target.value})
    }
    //handle the action for the SubmitCity button
    handleSubmitCity = (event) => {
    event.preventDefault(); 
    this.props.test(this.state.citychange);  //create test object and assign the state to cityChange
    }
    //get the value from the ui in the priceLess
    handlerPriceChange = (event)=>{
        this.setState({priceLess:event.target.value})
        }
    //handle the action for the SubmitFbyPrice button
    handleSubmitFbyPrice = (event) => {
    event.preventDefault(); 
    console.log(this.state.priceLess);
    this.props.passP(this.state.priceLess);  //create passP object and assign the state to priceLess   
    };

    //display the ui and get the user inputs; it is the first method that will be called
    render() {
        return (
            
            <div>
                <h1>eRental House </h1>
                <button onClick={this.handleLogin}>Login</button>
                <button onClick={this.handleRegister}>Register</button><br/>
                <label> Filter by city :</label>
                <input type = "text" value={this.citychange} onChange={this.handlerCityChange}/>
                <button type="submit" onClick={this.handleSubmitCity}>Submit</button><br/>
                <label>Price less than:</label>
                <input type = "text" value={this.priceLess} onChange={this.handlerPriceChange}/>
                <button type="submit" onClick={this.handleSubmitFbyPrice}>Submit</button>
                <div>
                <h3>{this.showProperty()}</h3>   
                </div>        
            </div> 

        );
    }
}
export default Home;