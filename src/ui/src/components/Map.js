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
            origin: null
        }
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
        this.drawPolyline = this.drawPolyline.bind(this);
    }

    handleMapReady(route, mapProps, map) {
        this.calculateAndDisplayRoute(route, map);
        this.drawPolyline(route, map);
    }

    drawPolyline (points, map) {
        const polyline = new google.maps.Polyline({
            strokeColor: "#9500ff",
            strokeOpacity: 0.5,
            strokeWeight: 5,
        });
        console.log('drawPolyline', points, map);
        polyline.setPath(points);
        polyline.setMap(map);
    }

//  points is an array with three points(station, origin, destination)
    calculateAndDisplayRoute(points, map) {
        // const data = [this.state.station1, this.state.destination, this.state.origin];
        const data = points;
        console.log(data);
        const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);

        const waypoints = data.map(item => {
            return {
                location: { lat: item.lat, lng: item.lng },
                stopover: true
            };
        });
        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;

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
                    return response.routes[0];
                } else {
                    window.alert("Directions request failed due to " + status);
                    return -1;
                }
            }
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(1)
        const { des } = this.props;
        const { origin } = this.props;
        if (prevProps.des !== this.props.des || prevProps.origin !== this.props.origin) {
            console.log(2)

            this.setState({destination: des})
            this.setState({origin: origin})

            this.locatePoint();
            // this.handleMapReady();
        }

    }



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

    render() {
        const polyCoords = [ ];
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
                    // onReady={this.handleMapReady}
                >

                    <Marker
                        position={{
                            lat: this.state.station1.lat,
                            lng: this.state.station1.lng
                        }}/>
                    <Marker
                        position={{
                            lat: this.state.station2.lat,
                            lng: this.state.station2.lng
                        }}/>
                    <Marker
                        position={{
                            lat: this.state.station3.lat,
                            lng: this.state.station3.lng
                        }}/>

                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCQd2_s804T25-Xtvm5PndruimLb6pEuY4"
})(MapContainer)