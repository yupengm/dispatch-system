import React, {Component} from 'react';
import Register from "./Register";
import UserAddress from "./UserAddress";
import UserInput from "./UserInput";
import Recommendation from "./Recommendation";
import Login from "./Login";
import CreditCard from "./CreditCard";
import Confirmation from "./Confirmation";
import Tracking from "./Tracking";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { withRouter } from "react-router-dom";
import {List} from 'antd'

class LeftSideForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps : 1,
            length: 0,
            width: 0,
            height: 0,
            weight: 0,
            features: [],
            value: 0,
            destination: "",
            target:"",
            routes:[{stationName:"SanFranciscoStateUniversity",
                deliverType:"1", // 1 for robot
                totalTime:"24",
                distance:"25.3",
                pickUpGeoX:"37.7227669",
                pickUpGeoY:"-122.4767213",
                putDownGeoX:"-122.4517272",
                putDownGeoY:"37.77526539999999"},
                {stationName:"SanFranciscoStateUniversity",
                    deliverType:"2", // 2 for drone
                    pickUpGeoX:"37.7227669",
                    pickUpGeoY:"-122.4767213",
                    putDownGeoX:"-122.4517272",
                    putDownGeoY:"37.77526539999999"},
                {stationName:"SanFranciscoStateUniversity",
                    deliverType:"1",
                    totalTime:"90",
                    distance:"2344",
                    pickUpGeoX:"37.7227669",
                    pickUpGeoY:"-122.4767213",
                    putDownGeoX:"-122.4517272",
                    putDownGeoY:"37.77526539999999"}],
            selectedOption:""
        }
    }

    componentDidMount() {
        //gather all info
        // console.log(this.props..length, "data de length")
        console.log("component did from left side form")
        if(this.props.timeAndDistance){
            let data = this.props.timeAndDistance
            console.log(data)
            let routesOptions = []
            for (let i = 0; i < data.length; i++) {
                let datainfo = {
                    stationName: this.props.stations[i].stationName,
                    deliverType: this.props.stations[i].methodCode, // 1 for robot
                    totalTime: data[i].time,
                    distance: data[i].distance,
                    pickUpGeoX: this.props.origin.lat,
                    pickUpGeoY: this.props.origin.lng,
                    putDownGeoX: this.props.dropOff.lat,
                    putDownGeoY: this.props.dropOff.lng
                }
                console.log(datainfo)
                routesOptions.push(datainfo)
            }
            console.log(routesOptions)
            this.setState({
                routes:routesOptions
            })
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
            length: values.length,
            width: values.width,
            height: values.height,
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
        if(currentStep !==1 && currentStep<=4){
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

    gotoLogin = () => {
        this.setState({
            steps: 10 //login page code
        })
    }

    loggedin = () => {
        this.setState({
            steps: 4 // successfully logged in
        })
    }
    gotoRegister = () =>{
        this.setState({
            steps: 11 //register page code
        })
    }

    setPoints = (destination, target) =>{
        this.setState(()=>({
            destination: destination,
            target: target
        }))
    }

    selected = (selectedOption) => {
        console.log()
        this.setState({
            selectedOption: this.state.routes[selectedOption],
        })
    }

    render() {
        const {steps, options} = this.state
        console.log(this.props.timeAndDistance, this.props.stations)
        return (
            <div className="left-side">

                {/*<Register />*/}

                <UserAddress curr_step={steps}
                             setSteps={this.handleSteps}
                             showAddress = {this.props.showAddress}
                             pickup = {this.props.value.pickup}
                             deliver = {this.props.value.deliver}
                />


                <UserInput curr_step={steps}
                           setSteps={this.handleSteps}
                           handleChange={this.handleChange}
                           weight={this.state.weight}
                           length={this.state.length}
                           width ={this.state.width}
                           height = {this.state.height}
                           feature={this.state.feature}
                           value={this.state.value}
                           getListOfStations = {this.props.getListOfStations}
                           goback={this._prev}
                />


                <Recommendation curr_step={steps}
                                setSteps={this.handleSteps}
                                gotoLogin={this.gotoLogin}
                                goback={this._prev}
                                routes={this.state.routes}
                                changeFn={this.selected}
                                organizeRoute={this.props.organizeRoute}
                />

                <Login curr_step={steps}
                       loggedin={this.loggedin}
                       gotoRegister={this.gotoRegister}
                />

                <CreditCard curr_step={steps}
                          setSteps={this.handleSteps}
                />

                <Confirmation curr_step={steps}
                          setSteps={this.handleSteps}
                />

                <Tracking curr_step={steps}
                          setSteps={this.handleSteps}
                />

                <Register curr_step={steps}
                          setSteps={this.handleSteps}
                          gotoLogin={this.gotoLogin}
                />

                <CSSTransitionGroup
                    transitionName="location-cards"
                    transitionAppear={true}
                    transitionAppearTimeout={400}
                    transitionEnterTimeout={400}
                >

                </CSSTransitionGroup>
                {/*{this.previousButton}*/}
            </div>
        );
    }
}

export default withRouter(LeftSideForm);