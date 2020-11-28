import React, {Component} from 'react';
import UserSetting from "./UserInput";
import Map from"./Map"
import UserAddress from "./UserAddress";
import Tracking from "./Tracking";
import UserInput from "./UserInput";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps : 1,
            size: "",
            weight: "",
            features: [],
            value: 0
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


    render(){
        const {steps} = this.state

        return (
            <div className='main'>
                <div className="left-side">
                    <UserInput curr_step={steps}
                                setSteps={this.handleSteps}
                               handleChange={this.handleChange}
                               weight={this.state.weight}
                               size={this.state.size}
                               feature={this.state.feature}
                               value={this.state.value}
                    />
                    <UserAddress curr_step={steps}
                                 setSteps={this.handleSteps}
                    />

                    {this.previousButton}
                </div>
                <div>
                    <Map />
                </div>
            </div>
        );
    }
}
export default Main;
