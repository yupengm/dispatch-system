import React, {Component} from 'react';
import UserInput from "./UserInput";
import Map from"./Map"
import UserAddress from "./UserAddress";
import axios from 'axios';
import Login from "./Login";
import Register from "./Register";
import Tracking from "./Tracking";

// Main Component
class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            steps : 1,
            size: "",
            weight: "",
            features: [],
            value: 0,
            target:"",
            destination: "",
            origin: {lat: null, lng: null},
            dropOff: {lat: null, lng: null},
            station: null,
            route: null,
            routeList: []
        }
    }

    handleSteps = ()=> {
        this.setState(prevState=>{
            return{
                steps: prevState.steps+1
            }
        })
    }

    handleChange=(values)=> {
        console.log(values)
        const {name, value} = values
        this.setState({
            size : values.size,
            weight: values.weight,
            value:values.value
        })
        console.log(this.state)
    }

    _prev = ()=> {
        let currentStep = this.state.steps
        // If the current step is 2 or 3, then subtract one on "previous" button click
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
            steps: currentStep
        })
    }

    get previousButton(){
        let currentStep = this.state.steps;
        // If the current step is not 1, then render the "previous" button
        if(currentStep !==1){
            return (
                <button
                    className="ant-btn ant-btn-primary"
                    type="button" onClick={this._prev}>
                    Previous
                </button>
            )
        }
        // ...else return nothing
        return null;
    }

    // showRoute = (selected) => {
    //     this.setState({
    //         route: selected
    //     })
    // }

    addressValidate = (target, destination) => {
        axios.get('http://localhost:8080/Dispatch/addressValidation', {
            params:{
                pickup_address: target,
                deliver_address: destination,
            }
        })
            .then(response => {
                console.log(response);
                console.log(response.data);
                this.setState({
                    origin: {lat: response.data.pickUpGeoLocationX, lng: response.data.pickUpGeoLocationY},
                    dropOff: {lat: response.data.putDownGeoLocationX, lng: response.data.putDownGeoLocationY},
                });
            }).catch(error => {
                if (error.status === "477"){
                    console.log("Address is not in the service area")
                } else {
                    console.log("Address doesn't exist")
                }
                console.log("err in addressValidate -> ", error);
            }).then(function () {
                // always executed
            });
    }

    getPrice = () => {
        let routeList = this.state;
        axios.get('http://localhost:8080/Dispatch/getPrice', {
            params:{
                station: this.state.station1,
                equipment: 'robot',
                // Distance: ,
                // deliverTime: ,
                Weight: this.state.weight,
                Size: this.state.size,
            }
        })
            .then(response => {
                console.log(response);
                const newItem = {
                    station: response.data.station,
                    equipment: response.data.equipment,
                    tag: response.data.tag,
                    price: response.data.price,
                    time: response.data.time,
                };
                routeList.push(newItem);
            })
        return routeList
    }

    render(){
        const {steps, destination, target} = this.state
        const {station1, station2, station3} = this.state

        return (
            <div className='main'>
                <div className="left-side">

                    <Register />

                    <UserAddress curr_step={steps}
                                 setSteps={this.handleSteps}
                                 showAddress={this.addressValidate}
                    />

                    <UserInput curr_step={steps}
                                setSteps={this.handleSteps}
                               handleChange={this.handleChange}
                               weight={this.state.weight}
                               size={this.state.size}
                               feature={this.state.feature}
                               value={this.state.value}
                    />


                    {this.previousButton}

                </div>
                <div>
                    <Map des={this.state.dropOff} origin={this.state.origin} station={this.state.station} />
                </div>
            </div>
        );
    }
}
export default Main;
