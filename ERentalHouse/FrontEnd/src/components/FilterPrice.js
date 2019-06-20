import React, { Component } from 'react';

class FilterPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }
    //set the state of data from props location state
    componentDidMount = () => {
        if(this.props.location.state) {
            this.setState({ data: this.props.location.state.data})
        }
    }
    //handle the home button action
    handleHome = () => {
    this.props.history.push("/");
    }
    //method that will display a property, will be called in the render for each property
    showProperty = (event) => {
        console.log(this.state.data);
    
        return(
            <div>
                {
                Array.from(this.state.data).map( home => (                 
                    <p3>
                        <div style={{ marginTop: 60 }}>
                       $ {home.price}, {home.city}, {home.state}, {home.description}, {home.address} <br/>
                       <img size = 'small'
                                src=  {`/pictures/${home.id}.jpg`} width="1100" height="800"/> <br/>
                        </div>
                    </p3>
                ))}
            </div>
        );
    } 

    render() {
        return (
            <div>
                <h3>Yor selected properties by price are:</h3>
                <button type="submit" onClick={this.handleHome}>Home</button>
                <h3>{this.showProperty()}</h3>
            </div>
        );
    }
}
export default FilterPrice;