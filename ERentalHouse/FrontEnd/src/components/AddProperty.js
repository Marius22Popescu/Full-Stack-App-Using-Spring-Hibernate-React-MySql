import React, { Component } from 'react';

class AddProperty extends Component {

    constructor(props){
        super(props)
        this.state={
            city:'',
            description:'',
            price:'',
            state:'',
            streetAddress:'',
            type:''
        }
    }
    //get the value from the ui in the city state
    handlerCityChange = event=>{
        this.setState({city:event.target.value}
            )
    }
    //get the value from the ui in the description state
    handlerDescriptionChange = event=>{
        this.setState({description:event.target.value}
            )
    }
    //get the value from the ui in the price state
    handlerPriceChange = event=>{
        this.setState({price:event.target.value}
            )
    }
    //get the value from the ui in the state state
    handlerStateChange = event=>{
        this.setState({state:event.target.value}
            )
    }
    //get the value from the ui in the price state
    handlerStreetChange = event=>{
        this.setState({streetAddress:event.target.value}
            )
    }
    //get the value from the ui in the price state
    handlerTypeChange = event=>{
        this.setState({type:event.target.value}
            )
    }
    //handle the action of submit button
    handleSubmit = (event) => {
        console.log('Here ading prop');
        event.preventDefault(); //prevents the event from refresh
        this.props.registerSuccess( //send info from user input to the user page
            this.state.city,
            this.state.description,
            this.state.price,
            this.state.state,
            this.state.streetAddress,
            this.state.type
        );
        this.props.history.push("/user"); //go to the user page after saving a property
    }
    //handle the action for back button
    handleBack = ()=> {
        this.props.history.push("/user");
    }
    //handle the action for home button
    handleHome = ()=> {
        this.props.history.push("/");
    }
    //method that will display a property, will be called in the render for each property
    render() {
            //put the state in the variable; instead of using this.state for each variable
            const {city, description, price, state, streetAddress, type} = this.state
        return (
            <div class="form-container">
                
            <form>
                <div style={{ marginTop: 100 }}>
             <h3>Add Property</h3>
             </div>
             <div>
                 <label>City</label>
                 <input type = "text" value={city} onChange={this.handlerCityChange}/>
             </div>
             <div>
                 <label>State</label>
                 <input type = "text" value={state} onChange={this.handlerStateChange}/>
             </div>
             <div>
                 <label>Price </label>
                 <input type = "text" value={price} onChange={this.handlerPriceChange}/>
             </div>
             <div>
                 <label>Street Address</label>
                 <input type = "text" value={streetAddress} onChange={this.handlerStreetChange}/>
             </div>
             <div>
                 <label>Description</label>
                 <input type = "text" value={description} onChange={this.handlerDescriptionChange}/>
             </div>
             <div>
                 <label>Type</label>
                 <input type = "text" value ={type} onChange={this.handlerTypeChange}/>
             </div>
                <button onClick={this.handleBack}> Back</button>
                <button onClick={this.handleSubmit}>Submit</button>
                <button onClick={this.handleHome}>Home</button>
            </form>
            </div>
        );
    }
}
export default AddProperty;