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
            destination: "",
            target:"",
            station1: null,
            station2: null,
            station3: null,
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

    setPoints = (destination, target) =>{
        this.setState(()=>({
            destination: destination,
                target: target
        }))
    }

    // showRoute = (selected) => {
    //     this.setState({
    //         route: selected
    //     })
    // }

    getRoutes = (destination, target) => {
        // const { pickup_address } = destination;
        // const { putdown_address } = target;
        axios.post("http://localhost:8080/Dispatch/addressValidation", {
            "pickup_address": "2130 Fulton St",
            "pickup_city": "San Francisco",
            "pickup_zip": "94117",
            "deliver_address": "1600 Holloway Ave",
            "deliver_city": "San Francisco",
            "deliver_zip": "94132"
        })
            .then(response => {
                console.log(response);
                console.log(response.data);
                // this.setState({
                //     routes: response.data ? response.data : [],
                // });
            })
            .catch(error => {
                console.log("err in fetch route -> ", error);
            })
            .then(function () {
                // always executed
            });
    }

    // getLocations = (v) => {
    //     const markers = this.props.userMarkers;
    //     for (var i = 0; i < markers.length; i++) {
    //         if (v === markers[i].label) {
    //             return {lat: markers[i].lat, lng: markers[i].lng};
    //         }
    //     }
    //     return "";
    // }


    render(){
        const {steps, destination, target} = this.state
        const {station1, station2, station3} = this.state

        return (
            <div className='main'>
                <div className="left-side">

                    <Register />

                    <UserAddress curr_step={steps}
                                 setSteps={this.handleSteps}
                                 showPoints={this.setPoints}
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
                    <Map des={destination} tar={target} station1={station1} station2={station2} station3={station3}/>
                </div>
            </div>
        );
    }
}
export default Main;
