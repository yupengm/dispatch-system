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
            steps : this.props.curr_step == 6 ? 6 : 1,
            length: 0,
            width: 0,
            height: 0,
            weight: 0,
            features: [],
            value: 0,
            destination: "",
            target:"",
            routes:[],
            stations:[],
            selectedOption:""
        }
    }

    getListOfStationsFromLeftSideForm = (stations)=>{
        let mystations = []
        mystations.push(stations)
        this.setState({
            stations: mystations
        })
        console.log(this.state.stations)
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        //gather all info

        console.log("component did from left side form", this.props.timeAndDistance, this.state.stations[0])
        //
        // if(prevProps.timeAndDistance != this.props.timeAndDistance) {
        //     let data = this.props.timeAndDistance
        //     console.log(data)
        //     console.log(data.length)
        //     let routesOptions = []
        //     for (let i = 0; i < data.length; i++) {
        //         let datainfo = {
        //             stationName: this.state.stations[0][i].stationName,
        //             deliverType: this.state.stations[0][i].methodCode, // 1 for robot
        //             totalTime: data[i].time,
        //             distance: data[i].distance,
        //             pickUpGeoX: this.props.origin.lat,
        //             pickUpGeoY: this.props.origin.lng,
        //             putDownGeoX: this.props.dropOff.lat,
        //             putDownGeoY: this.props.dropOff.lng
        //         }
        //         console.log(datainfo)
        //         routesOptions.push(datainfo)
        //     }
        //     console.log(routesOptions)
        //     this.setState({
        //         routes:routesOptions
        //     })
        //     this.props.handleRoute(routesOptions)
        // }

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

    // selected = (selectedOption) => {
    //     console.log(this.state.routes[selectedOption])
    //     this.setState({
    //         selectedOption: this.state.routes[selectedOption],
    //     })
    //
    //     //draw the route
    //     let data = this.state.routes[selectedOption]
    //     this.props.getOptionFromUser(data)
    // }

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
                           getListOfStationsFromLeftSideForm = {this.getListOfStationsFromLeftSideForm}
                           goback={this._prev}
                />


                <Recommendation curr_step={steps}
                                setSteps={this.handleSteps}
                                gotoLogin={this.gotoLogin}
                                goback={this._prev}
                                routeOptions={this.props.routeOptions}
                                routes={this.props.routes}
                                changeFn={this.props.selected}
                                organizeRoute={this.props.organizeRoute}
                                optionSubmit={this.props.optionSubmit}
                />

                <Login curr_step={steps}
                       loggedin={this.loggedin}
                       gotoRegister={this.gotoRegister}
                       authenticate={this.props.authenticate}
                />

                <CreditCard curr_step={steps}
                            setSteps={this.handleSteps}
                            order={this.props.order}
                />

                <Confirmation curr_step={steps}
                              setSteps={this.handleSteps}
                              order_number={this.props.order_number}
                              order_route={this.props.order_route}
                              length={this.state.length}
                              width ={this.state.width}
                              height = {this.state.height}
                              weight={this.props.weight}
                              deliver={this.props.deliver}
                              pickup={this.props.pickup}
                              user={this.props.user}
                />

                <Tracking curr_step={steps}
                          setSteps={this.handleSteps}
                          orderNum={this.props.orderNum}
                          saveTracking={this.props.saveTracking}
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