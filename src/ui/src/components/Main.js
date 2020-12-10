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
            user:null,
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
            routeList: [],
            stations:[],
            timeAndDistance:[],
            routeOptions:[],
            routes: [],
            drawDroneOrRobot:-1,
            order_route:null,
            order_payment:null,
            order_number:null
        }
    }

    order = (order_info) =>{
        this.setState({
            order_payment: order_info
        })
        let request = {
            emailId: this.state.user,
            box:{
                weight: this.state.weight,
                size: this.state.size
            },
            route: this.state.order_route,
            payment:order_info
        }

        axios({
            method: 'post',
            url: '/Dispatch/submit_order',
            data: request
        }).then((response) => {
            console.log(request,"&",response);
            this.setState({
                order_number: response.data.OrderNumber
            })
        }, (error) => {
            console.log(error);
        });
    }

    authenticate= (user_email)=>{
        this.setState({
            user: user_email
        })
    }

    handleRoute = (data) =>{
        this.setState({
            routes: data
        })
    }

    handleSteps = ()=> {
        this.setState(prevState=>{
            return{
                steps: prevState.steps+1
            }
        })
    }

    selected = (selectedOption) => {
        let data = this.state.routeOptions[selectedOption]
        console.log(data)
        let order_route = {
            ...data,
            price: this.state.routes[selectedOption].price,
            routePoly:"sdf"
        }
        this.setState({
            selectedOption: this.state.routeOptions[selectedOption],
            order_route:order_route
        })

        //draw the route

        this.getOptionFromUser(data)
    }

    getOptionFromUser = (option) =>{
        let userOption = this.state.stations[0].filter( station=>{
            return station.stationName == option.stationName
        })
        console.log(userOption, this.state.stations)


        this.setState({
            station:{
                lat: userOption[0].geoLocationX,
                lng: userOption[0].geoLocationY
            },
            // set drawing Drone
            // drawDrone:userOption
            drawDroneOrRobot: option.deliverType == 2 ? 1 : 0
        })
    }

    getListOfStations = (stations, weight, size)=>{
        let mystations = []
        mystations.push(stations)
        this.setState({
            stations: mystations,
            weight:weight,
            size:size
        })
        console.log(this.state.stations)
    }

    getTimeAndDistance = (data) => {
        console.log(data)

            this.setState({
                timeAndDistance: data,
            })
        this.organizeRoute(data)
    }

    organizeRoute = (data) => {
        //gather all info
        console.log(data.length, "data de length")
        console.log(data)
        let routesOptions = []
        for (let i = 0; i < data.length; i++) {
            const datainfo = {
                stationName: this.state.stations[0][i].stationName,
                deliverType: this.state.stations[0][i].methodCode, // 1 for robot
                totalTime: (data[i].time/60).toFixed(2),
                distance: (data[i].distance/1000).toFixed(2),
                pickUpGeoX: this.state.origin.lat,
                pickUpGeoY: this.state.origin.lng,
                putDownGeoX: this.state.dropOff.lat,
                putDownGeoY: this.state.dropOff.lng
            }
            if(this.state.stations[0][i].methodCode == 1){
                routesOptions.push(datainfo)
            } else if(this.state.stations[0][i].methodCode == 2){
                routesOptions.push(datainfo)
            } else if(this.state.stations[0][i].methodCode ==3){
                datainfo.deliverType = 1
                routesOptions.push(datainfo)
                const datainfo2 = {...datainfo}
                datainfo2.deliverType = 2
                routesOptions.push(datainfo2)
            } else {
                continue
            }

            console.log(datainfo)

        }
        console.log(routesOptions)
        this.setState({
            routeOptions:routesOptions
        })

        this.fetchData(routesOptions)
    }

    fetchData = route => {
        //get route data from Map component
        axios.post("/Dispatch/getPrice", route)
            .then(response => {
                console.log("Get response from backend", response);
                this.setState({
                    routes: response.data,//response is Price object
                })
            })
            .catch(error => {
                console.log('err in fetch options ->', error.message);
            })
    }

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
                                 value = {this.state}
                                getListOfStations={this.getListOfStations}
                                organizeRoute={this.organizeRoute}
                                stations={this.state.stations}
                                timeAndDistance={this.state.timeAndDistance}
                                origin={this.state.origin}
                                dropOff={this.state.dropOff}
                                selected={this.selected}
                                routes={this.state.routes}
                                routeOptions={this.state.routeOptions}
                                authenticate={this.authenticate}
                                order={this.order}
                                order_number={this.state.order_number}
                                order_route={this.state.order_route}
                                size={this.state.size}
                                weight={this.state.weight}
                                pickup={this.state.pickup}
                                deliver={this.state.deliver}
                                user={this.state.user}
                                />

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
                    <Map route={[this.state.station, this.state.origin, this.state.dropOff ]}
                         drone={[this.state.station, this.state.origin, this.state.dropOff]}
                         drawDroneOrRobot={this.state.drawDroneOrRobot}
                         stations={this.state.stations}
                         getTimeAndDistance={this.getTimeAndDistance}
                         organizeRoute={this.organizeRoute}
                         origin={this.state.origin} des={this.state.dropOff} station={this.state.station}
                    />
                </div>
            </div>
        );
    }
}
export default Main;
