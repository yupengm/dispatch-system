/* global google */
import React, { Component } from "react";
import {Map, Polyline, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import customMarker from '../assets/images/flag.png';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // showingInfoWindow: false,
            // activeMarker: {},
            // selectedPlace: {},
            showMarkers: true,
            mapCenter: {lat: 37.763880, lng: -122.446083},
            zoom: 13,
            station1: {lat: 37.78741078914182, lng: -122.43674218604595},
            station2: {lat: 37.74575075621106, lng: -122.43330895872147},
            station3: {lat: 37.76475172762295, lng: -122.48394906175754},
            // destination: {lat: 37.776290, lng: -122.431323},
            // origin: {lat: 37.757936, lng: -122.409895}
            destination: null,
            origin: null,
            mapProps: null,
            map: null,
            directionsDisplay:null,
            directionsService:null,
            polyline: null,
            res:[],
            markers: []
        }
        this.handleRobot = this.handleRobot.bind(this);
        this.handleDrone = this.handleDrone.bind(this);
        this.calculateRoute = this.calculateRoute.bind(this)
    }

    handleChange = (mapProps, map) =>{
        this.setState({
            mapProps:mapProps,
            map:map
        })
    }

    handleRobot(mapProps, map) {
        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer();
        this.setState({
            mapProps:mapProps,
            map:map
        })
        this.calculateAndDisplayRoute(map);
        if(this.props.curr.lat !== ""){
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(this.props.curr.lat), parseFloat(this.props.curr.lng)),
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            });
            console.log("this is inside if", this.props.curr);
        }
        console.log(this.props.curr);
    }

    handleDrone(mapProps, map) {
        this.drawPolyline(map);
        if(this.props.curr.lat !== ""){
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(this.props.curr.lat), parseFloat(this.props.curr.lng)),
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            });
            console.log("this is inside if", this.props.curr);
        }
        console.log(this.props.curr);
    }

    drawPolyline (map) {
        if(this.state.polyline!=null){
            this.state.polyline.setMap(null)
            this.state.polyline = null
        }
        let directionsService = this.state.directionsService;
        let directionsDisplay = this.state.directionsDisplay;
        if(directionsService != null || directionsDisplay != null){
            directionsService = null
            directionsDisplay.setMap(null)
            directionsDisplay = null
        }

        const polyline = new google.maps.Polyline({
            strokeColor: "#9500ff",
            strokeOpacity: 0.5,
            strokeWeight: 5,
        });
        // var marker = this.state.marker
        // if(marker!=null){
        //     marker.setMap(null)
        //     marker = null
        // }


        let markers = this.state.markers
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

        for (let i = 0; i < this.props.drone.length; i++) {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.props.drone[i].lat, this.props.drone[i].lng),
                map: map,
                label: String.fromCharCode(65+i)
            });
            markers.push(marker)
        }

        this.setState({
            markers: markers
        })

        // const marker1 = new google.maps.Marker()
        // const marker2 = new google.maps.Marker()
        // const marker3 = new google.maps.Marker()
        // const station = new google.maps.LatLng(this.props.drone[0].lat,this.props.drone[0].lng)
        // const origin = new google.maps.LatLng(this.props.drone[1].lat,this.props.drone[1].lng)
        // const dest = new google.maps.LatLng(this.props.drone[2].lat,this.props.drone[2].lng)
        // let data = this.props.drone.map((dr)=>{
        //     return {lat: dr.lat, lng: dr.lng}
        // })
        // console.log(data)
        // marker1.setPosition(data)
        // marker2.setPosition(origin)
        // marker3.setPosition(dest)
        // marker1.setMap(data)
        // marker2.setMap(map)
        // marker3.setMap(map)

        console.log('drawPolyline', this.props.drone);
        polyline.setPath(this.props.drone);
        console.log('drawPolyline', polyline);
        polyline.setMap(map);
        this.setState({
            polyline:polyline
        })
    }

    async calculateRoute(map){
        this.setState({
            res:[]
        })
        var stations = this.props.stations[0].map((station)=>{
            return {
                lat: station.geoLocationX,
                lng: station.geoLocationY
            }
        })

        let directionsService = new google.maps.DirectionsService();
        // const waypoints = stations.map(item => {
        //     return {
        //         location: {lat: parseFloat(item.lat), lng: parseFloat(item.lng)},
        //         stopover: true
        //     };
        // });
        const waypoints = [{
            location : {lat: parseFloat(this.props.origin.lat), lng: parseFloat(this.props.origin.lng)},
            stopover: true
        }]
        console.log(waypoints, this.props.origin, this.props.des, "parameters")
        console.log("I am hereeeeeeeeee!")
        let res = []
        for(let i = 0; i < stations.length; i++){

            await directionsService.route(
                {
                    // origin: this.props.route[1],
                    // destination: this.props.route[2],
                    // waypoints: [waypoints[i]],
                    // travelMode: "DRIVING"
                    origin: stations[i],
                    destination: this.props.des,
                    waypoints: [waypoints[0]],
                    travelMode: "DRIVING"
                },
                (response, status) => {
                    if (status === "OK") {
                        console.log('route', response)
                        const cur = {
                            time: response.routes[0].legs[0].duration.value +
                                response.routes[0].legs[1].duration.value, // seconds
                            distance: response.routes[0].legs[0].distance.value +
                                response.routes[0].legs[1].distance.value, // meters
                            time1: response.routes[0].legs[0].duration.value,
                            time2: response.routes[0].legs[1].duration.value
                        }
                        console.log(cur)
                        // res.push(cur)
                        this.saveData(cur)

                        console.log(res.length, "hererere")
                    } else {
                        window.alert("Directions request failed due to " + status);
                    }
                }
            )

        }
        // this.props.getTimeAndDistance(res)
        // setTimeout(function(){ this.props.organizeRoute(res) }, 3000);
        // this.props.organizeRoute(res)
        console.log(res)
        console.log(res.length)
    }

    saveData=(cur)=>{
        this.setState((prev)=>{
            res: prev.res.push(cur)
        })
        console.log(this.state.res)
        if(this.state.res.length == this.props.stations[0].length){
            this.props.getTimeAndDistance(this.state.res)
        }
    }


//  points is an array with three points(station, origin, destination)
    calculateAndDisplayRoute(map) {
        const data = this.props.route;
        if(data[0]==null || data[1].lat==null || data[2].lat== null){
            console.log("At least one point is null")
        } else {
            console.log(data);
            if(this.state.polyline!= null){
                this.state.polyline.setMap(null)
                this.state.polyline = null
            }

            let markers = this.state.markers
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }


            let directionsService = this.state.directionsService;
            let directionsDisplay = this.state.directionsDisplay;
            if(directionsService != null || directionsDisplay != null){
                directionsService = null
                directionsDisplay.setMap(null)
                directionsDisplay = null
            }
            directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();


            directionsDisplay.setMap(map);

            const waypoints = data.map(item => {
                return {
                    location: {lat: item.lat, lng: item.lng},
                    stopover: true
                };
            });
            const origin = waypoints.shift().location;
            const destination = waypoints.pop().location;

            console.log(waypoints)

            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    waypoints: waypoints,
                    travelMode: "DRIVING"
                },
                (response, status) => {
                    if (status === "OK") {
                        console.log('route', response)
                        directionsDisplay.setDirections(response);
                        this.props.addPoly(response.routes[0].overview_polyline)
                        // this.props.routeResult(
                        //         [response.routes[0].legs[0].duration,
                        //         response.routes[0].legs[1].duration,
                        //         response.routes[0].legs[0].distance,
                        //         response.routes[0].legs[1].distance,
                        //         ]
                        // )
                    } else {
                        window.alert("Directions request failed due to " + status);
                    }
                }
            );

            this.setState({
                directionsDisplay: directionsDisplay,
                directionsService: directionsService
            })

        }
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(1)
        const {des} = this.props;
        const {origin} = this.props;
        console.log(this.props.route)
        if (prevProps.stations !== this.props.stations && this.props.stations.length!=0){
            console.log(this.props.stations)
            this.calculateRoute(this.state.map)
        }

        if(prevProps.polyline!=this.props.polyline){
            this.getTrackingPath(this.props.polyline, this.state.map)
        }


        if(prevProps.route[0] !== this.props.route[0]){
            this.setState({
                showMarkers: false
            })
            // if(this.props.drawDroneOrRobot == 1){
            //     this.handleDrone(this.state.mapProps, this.state.map) // test draw drone api
            // }
            if(this.props.drawDroneOrRobot == 0){
                this.handleRobot(this.state.mapProps, this.state.map)
            }
            // this.handleDrone(this.state.mapProps, this.state.map)
            // this.handleRobot(this.state.mapProps, this.state.map)
        }

        if(prevProps.drone[0] !== this.props.drone[0]){
            console.log(this.props.drone)
            if(this.props.drawDroneOrRobot == 1){
                console.log("draw drone2")
                this.handleDrone(this.state.mapProps, this.state.map) // test draw drone api
            }
        }

        if (prevProps.des !== this.props.des || prevProps.origin !== this.props.origin) {
            console.log(2)

            this.setState({destination: des})
            this.setState({origin: origin})
            console.log(des)
            this.locatePoint();

            //
            // console.log(this.props.route)
            // if (prevProps.route !== this.props.route) {
            //
            //     this.handleRobot(this.state.mapProps, this.state.map) // test draw line api
                // this.calculateRoute(this.state.map) // test route options
                // this.handleDrone(this.state.mapProps, this.state.map) // test draw drone api

                // let res = this.decode("cjseFblhjVEM@SJEFADGFSEMC[gALd@pHb@lGnAzRdAzO`@xGFx@L^X^pBfBJFXPRFxG{@bD_@VAZBH@NDPRv@^j@Rt@Lj@DZA`AItDi@vCY~Dg@bKmAhBSb@GBd@PnCHhAb@`HNbCx@tLb@dHdAzOp@hKCT?\@NRpDhA|Pj@tIPtCFLFz@JjCNlJThNFtEuJXD|A@ZrJYh@CLBZLTPVd@H\Bh@M~DSnDEtAD|APhCLdFJlGB^Nt@Tb@V\NN`@V\HNBr@DNCbAc@jB{@lD{Aj@Op@KdDQdAKtAa@dAg@fAs@b@UXKh@KrBItBIfIUjDKhCObJe@na@mAx{@iChL[lGKvIYdL[|CCvJUz@IfPg@lFQtBEhGLjDL`FHjS`@xLZ^?FVBJH\JpAOrOOrLElA{@bAu@|@WXICG?QJIT?LQj@[\qBdCOBGAKBEDCBUc@a@o@o@aAS_@ESBo@FgCE_ACk@Cm@Cm@EMCAKCAIUkBEYS{ACk@BiJ~@J")
                // console.log(res)
                // let points = res.map((p)=>{
                //     return{
                //         lat: p.latitude,
                //         lng: p.longitude
                //     }
                // })
                // const polyline = new google.maps.Polyline({
                //     strokeColor: "#9500ff",
                //     strokeOpacity: 0.5,
                //     strokeWeight: 5,
                // });
                //
                // polyline.setPath(points);
                //
                // polyline.setMap(this.state.map);
                // this.handleMapReady();
                // this.handleMapReady();
                // this.setState({
                //     mapCenter :{
                //         lat: des.lat,
                //         lng: des.lng
                //     },
                    // handleRobot:this.handleRobot
                // })

            // }
        }
    }



    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.props.route!=nextProps.route){
    //         return true
    //     }
    // }


    // PlacesAutocomplete似乎有些问题。下面的console log不出来
    locatePoint = () => {
        const { des } = this.props;
        const { tar } = this.props;
        console.log('locatePoint', this.props.des)
        console.log('locatePoint', des)

        this.setState({ des, tar });
        geocodeByAddress(des)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.setState( {destination: latLng });
            })
            .catch(error => console.error('Error', error));

        geocodeByAddress(tar)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.setState( {target: latLng });
            })
            .catch(error => console.error('Error', error));
    };

    getTrackingPath= (polyCode, map) =>{
        let res = this.decode(polyCode)
        console.log(res)
        console.log("props" + this.props)

        let points = res.map((p)=>{
            return{
                lat: p.latitude,
                lng: p.longitude
            }
        })

        //Set 3 location, sta, ori, des
        let markers = []
        for (let i = 0; i < 3; i++) {

            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.props.route[i].lat, this.props.route[i].lng),
                map: map,
                label: String.fromCharCode(65+i)
            });
            markers.push(marker)
        }


        // Set cur location
        const curLocation = new google.maps.Marker({
                // position: new google.maps.LatLng(this.props.curr.lat, parseFloat(this.props.curr.lng)),
                position: new google.maps.LatLng(this.props.curr.lat, this.props.curr.lng),
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            });

        markers.push(curLocation);

        this.setState({
            markers: markers
        })

        const polyline = new google.maps.Polyline({
            strokeColor: "#9500ff",
            strokeOpacity: 0.5,
            strokeWeight: 5,
        });

        polyline.setPath(points);

        polyline.setMap(map);
    }

    decode = (encoded)=>{

        // array that holds the points

        var points=[ ]
        var index = 0, len = encoded.length;
        var lat = 0, lng = 0;
        while (index < len) {
            var b, shift = 0, result = 0;
            do {

                b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii      //and substract it by 63
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);


            var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)})

        }
        return points
    }



    render() {
        // const polyCoords = [ ];
        return (
            <div className="mapWrapper" style={{height: `100%`, width: `69.5%`}}>

                <Map
                    google={this.props.google}
                    zoom={this.state.zoom}
                    disableDefaultUI={true}
                    initialCenter={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    center={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    onReady={this.handleRobot}
                    // onDragend={this.handleChange}
                    // onCenter_changed={this.handleRobot}
                >

                    {
                        this.state.origin!=null && this.state.showMarkers == true ? <Marker
                            position={{
                                lat: this.state.origin.lat,
                                lng: this.state.origin.lng
                            }}/> : <div></div>
                    }

                    {
                        this.state.origin!=null && this.state.showMarkers == true ? <Marker
                            position={{
                                lat: this.state.destination.lat,
                                lng: this.state.destination.lng
                            }}/> : <div></div>
                    }



                    {/*<Marker*/}
                    {/*    position={{*/}
                    {/*        lat: this.state.station1.lat,*/}
                    {/*        lng: this.state.station1.lng*/}
                    {/*    }}/>*/}
                    {/*<Marker*/}
                    {/*    position={{*/}
                    {/*        lat: this.state.station2.lat,*/}
                    {/*        lng: this.state.station2.lng*/}
                    {/*    }}/>*/}
                    {/*<Marker*/}
                    {/*    position={{*/}
                    {/*        lat: this.state.station3.lat,*/}
                    {/*        lng: this.state.station3.lng*/}
                    {/*    }}/>*/}

                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_google_map_api
})(MapContainer)