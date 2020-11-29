import React, {Component} from 'react';
import UserInput from "./UserInput";
import Map from"./Map"
import UserAddress from "./UserAddress";
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
            destination: {lat: 37.776290, lng: -122.431323},
            target: {lat: 37.757936, lng: -122.409895}
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


    render(){
        const {steps, destination, target} = this.state

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
                    <Map des={destination} tar={target}/>
                </div>
            </div>
        );
    }
}
export default Main;
