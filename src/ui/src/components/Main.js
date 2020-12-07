import React, {Component} from 'react';
import UserInput from "./UserInput";
import Map from"./Map"
import LeftSideForm from "./LeftSideForm";
import { withRouter } from "react-router-dom";
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
            pickup:null,
            deliver: null,
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

    // handleAddress = ()=>{

    handleSteps = ()=> {
        this.setState(prevState=>{
            return{
                steps: prevState.steps+1
            }
        })
    }

    // setPickup = () =>{
    //     this.setState({
    //         pick
    //     })
    // }


    addressValidate = (target, destination) => {
        this.setState({
            pickup:target,
            deliver:destination
        })

        axios({
            method: 'post',
            url: '/Dispatch/addressValidation',
            data: {
                pickup_address: target.address1A,
                pickup_city: target.city,
                pickup_zip: target.zipadd,
                deliver_address: destination.address1A,
                deliver_city: destination.city,
                deliver_zip: destination.zipadd
            }
        }).then(response => {
                console.log(response);
                console.log(response.data);
                this.setState({
                    // pickup: target,
                    // deliver: destination,
                    origin: {lat: parseFloat(response.data.pickUpGeoLocationX), lng: parseFloat(response.data.pickUpGeoLocationY)},
                    dropOff: {lat: parseFloat(response.data.putDownGeoLocationX), lng: parseFloat(response.data.putDownGeoLocationY)},
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


                    <Register />


                 <LeftSideForm
                                curr_step={steps}
                                 setSteps={this.handleSteps}
                                 showAddress={this.addressValidate}
                                 value = {this.state}/>

                    {/*<UserAddress curr_step={steps}*/}
                    {/*             setSteps={this.handleSteps}*/}
                    {/*             showAddress={this.addressValidate}*/}
                    {/*/>*/}

                    <UserInput curr_step={steps}
                                setSteps={this.handleSteps}
                               handleChange={this.handleChange}
                               weight={this.state.weight}
                               size={this.state.size}
                               feature={this.state.feature}
                               value={this.state.value}
                    />


                    {this.previousButton}

                <div>
                    {/*<Map route={[{lat: 37.78741078914182, lng: -122.43674218604595}, {lat: 37.776290, lng: -122.431323}, {lat: 37.757936, lng: -122.409895} ]}*/}
                    {/*     drone={[]}*/}
                    {/*     origin={this.state.origin} des={this.state.dropOff} station={this.state.station}*/}
                    {/*/>*/}
                    <Map route={[{lat: 37.78741078914182, lng: -122.43674218604595}, this.state.origin, this.state.dropOff ]}
                         drone={[{lat: 37.78741078914182, lng: -122.43674218604595}, this.state.origin, this.state.dropOff]}
                         stations={[{lat: 37.78741078914182, lng: -122.43674218604595},{lat: 37.74575075621106, lng: -122.43330895872147},{lat: 37.76475172762295, lng: -122.48394906175754}]}
                         origin={this.state.origin} des={this.state.dropOff} station={this.state.station}
                    />
                </div>
            </div>
        );
    }
}
export default Main;
