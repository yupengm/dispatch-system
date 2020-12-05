import React, {Component} from 'react';
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
            pickup:{
                address1A: "",
                address2A: "",
                city: "",
                zip: ""
            },
            deliver:{
                address1A: "",
                address2A: "",
                city: "",
                zip: ""
            },
            target:"",
            destination: "",
            origin: {lat: null, lng: null},
            dropOff: {lat: null, lng: null},
            station1: null,
            station2: null,
            station3: null,
            route: null,
            routeList: []
        }
    }

    handleAddress = ()=>{

    }


    addressValidate = (target, destination, target_val, destination_val) => {
        this.setState({
            pickup:target_val,
            deliver:destination_val
        })
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
    }


    render(){
        const {steps, destination, target} = this.state
        const {station1, station2, station3} = this.state


        return (
            <div className='main'>


                 <LeftSideForm
                                curr_step={steps}
                                 setSteps={this.handleSteps}
                                 showAddress={this.addressValidate}/>

                    {/*<UserAddress curr_step={steps}*/}
                    {/*             setSteps={this.handleSteps}*/}
                    {/*             showAddress={this.addressValidate}*/}
                    {/*/>*/}

                <div>
                    <Map des={this.state.dropOff} tar={this.state.origin} station1={station1} station2={station2} station3={station3}/>
                </div>
            </div>
        );
    }
}
export default withRouter(Main);
