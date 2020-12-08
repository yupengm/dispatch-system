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
            directionsService:null
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
    }

    handleDrone(mapProps, map) {
        this.drawPolyline(map);
    }

    drawPolyline (map) {
        const polyline = new google.maps.Polyline({
            strokeColor: "#9500ff",
            strokeOpacity: 0.5,
            strokeWeight: 5,
        });
        console.log('drawPolyline', map);
        polyline.setPath(this.props.drone);
        console.log('drawPolyline', polyline);
        polyline.setMap(map);
    }

    calculateRoute(map){
        let stations = this.props.stations
        let directionsService = new google.maps.DirectionsService();
        const waypoints = stations.map(item => {
            return {
                location: {lat: item.lat, lng: item.lng},
                stopover: true
            };
        });
        console.log("I am hereeeeeeeeee!")
        let res = []
        for(let i = 0; i < waypoints.length; i++){
            directionsService.route(
                {
                    origin: this.props.origin,
                    destination: this.props.des,
                    waypoints: [waypoints[i]],
                    travelMode: "DRIVING"
                },
                (response, status) => {
                    if (status === "OK") {
                        console.log('route', response)
                        let cur = {
                            time: response.routes[0].legs[0].duration.value +
                                response.routes[0].legs[1].duration.value, // seconds
                            distance: response.routes[0].legs[0].distance.value +
                                response.routes[0].legs[1].distance.value // meters
                        }
                        res.push(cur)
                    } else {
                        window.alert("Directions request failed due to " + status);
                    }
                }
            );
        }

        console.log(res)

    }

//  points is an array with three points(station, origin, destination)
    calculateAndDisplayRoute(map) {
        const data = this.props.route;
        if(data[0].lat==null || data[1].lat==null || data[2].lat== null){
            console.log("At least one point is null")
        } else {
            console.log(data);
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

        if (prevProps.des !== this.props.des || prevProps.origin !== this.props.origin) {
            console.log(2)

            this.setState({destination: des})
            this.setState({origin: origin})
            console.log(des)
            // this.locatePoint();


            console.log(this.props.route)
            if (prevProps.route !== this.props.route) {
                this.forceUpdate()
                // this.handleRobot(this.state.mapProps, this.state.map)
                this.calculateRoute(this.state.map)
                // this.handleDrone(this.state.mapProps, this.state.map)
                let res = this.decode("cjseFblhjVEM@SJEFADGFSEMC[gALd@pHb@lGnAzRdAzO`@xGFx@L^X^pBfBJFXPRFxG{@bD_@VAZBH@NDPRv@^j@Rt@Lj@DZA`AItDi@vCY~Dg@bKmAhBSb@GBd@PnCHhAb@`HNbCx@tLb@dHdAzOp@hKCT?\@NRpDhA|Pj@tIPtCFLFz@JjCNlJThNFtEuJXD|A@ZrJYh@CLBZLTPVd@H\Bh@M~DSnDEtAD|APhCLdFJlGB^Nt@Tb@V\NN`@V\HNBr@DNCbAc@jB{@lD{Aj@Op@KdDQdAKtAa@dAg@fAs@b@UXKh@KrBItBIfIUjDKhCObJe@na@mAx{@iChL[lGKvIYdL[|CCvJUz@IfPg@lFQtBEhGLjDL`FHjS`@xLZ^?FVBJH\JpAOrOOrLElA{@bAu@|@WXICG?QJIT?LQj@[\qBdCOBGAKBEDCBUc@a@o@o@aAS_@ESBo@FgCE_ACk@Cm@Cm@EMCAKCAIUkBEYS{ACk@BiJ~@J")
                console.log(res)
                let points = res.map((p)=>{
                    return{
                        lat: p.latitude,
                        lng: p.longitude
                    }
                })
                const polyline = new google.maps.Polyline({
                    strokeColor: "#9500ff",
                    strokeOpacity: 0.5,
                    strokeWeight: 5,
                });

                polyline.setPath(points);

                polyline.setMap(this.state.map);
                // this.handleMapReady();
                // this.setState({
                //     mapCenter :{
                //         lat: des.lat,
                //         lng: des.lng
                //     },
                    // handleRobot:this.handleRobot
                // })

            }

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


    // initialize= () => {
    //     var myLatlng = new google.maps.LatLng(37.773972, -122.431297);
    //     var myOptions = {
    //         zoom: 8,
    //         center: myLatlng,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }
    //     // var map = new google.maps.Map(document.getElementById("map"), myOptions);
    //     console.log(google.maps)
    //     var decodedPath = google.maps.geometry.encoding.decodePath("cjseFblhjVEM@SJEFADGFSEMC[gALd@pHb@lGnAzRdAzO`@xGFx@L^X^pBfBJFXPRFxG{@bD_@VAZBH@NDPRv@^j@Rt@Lj@DZA`AItDi@vCY~Dg@bKmAhBSb@GBd@PnCHhAb@`HNbCx@tLb@dHdAzOp@hKCT?\@NRpDhA|Pj@tIPtCFLFz@JjCNlJThNFtEuJXD|A@ZrJYh@CLBZLTPVd@H\Bh@M~DSnDEtAD|APhCLdFJlGB^Nt@Tb@V\NN`@V\HNBr@DNCbAc@jB{@lD{Aj@Op@KdDQdAKtAa@dAg@fAs@b@UXKh@KrBItBIfIUjDKhCObJe@na@mAx{@iChL[lGKvIYdL[|CCvJUz@IfPg@lFQtBEhGLjDL`FHjS`@xLZ^?FVBJH\JpAOrOOrLElA{@bAu@|@WXICG?QJIT?LQj@[\qBdCOBGAKBEDCBUc@a@o@o@aAS_@ESBo@FgCE_ACk@Cm@Cm@EMCAKCAIUkBEYS{ACk@BiJ~@J");
    //     var decodedLevels = this.decodeLevels("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    //
    //     var setRegion = new google.maps.Polyline({
    //         path: decodedPath,
    //         levels: decodedLevels,
    //         strokeColor: "#FF0000",
    //         strokeOpacity: 1.0,
    //         strokeWeight: 2,
    //         map: this.state.map
    //     });
    // }
    //
    // decodeLevels = (encodedLevelsString)=> {
    //     var decodedLevels = [];
    //
    //     for (var i = 0; i < encodedLevelsString.length; ++i) {
    //         var level = encodedLevelsString.charCodeAt(i) - 63;
    //         decodedLevels.push(level);
    //     }
    //     return decodedLevels;
    // }

    render() {
        // const polyCoords = [ ];
        return (
            <div className="mapWrapper" style={{height: `87%`, width: `69.5%`}}>

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
                    onDragend={this.handleChange}
                    // onCenter_changed={this.handleRobot}
                >

                    {/*{*/}
                    {/*    this.state.origin != null ? <Marker*/}
                    {/*        position={{*/}
                    {/*            lat: this.state.origin.lat,*/}
                    {/*            lng: this.state.origin.lng*/}
                    {/*        }}/> : <div></div>*/}
                    {/*}*/}

                    {/*{*/}
                    {/*    this.state.destination != null ? <Marker*/}
                    {/*        position={{*/}
                    {/*            lat: this.state.destination.lat,*/}
                    {/*            lng: this.state.destination.lng*/}
                    {/*        }}/> : <div></div>*/}
                    {/*}*/}



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
    apiKey: "AIzaSyAWbjebK_8bkRfvRyxmdl0z5gbsnd-DAVo"
})(MapContainer)