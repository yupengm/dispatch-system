import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng,} from 'react-places-autocomplete';

export class MapContainer extends Component {
    constructor() {
        super();
        this.state ={
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: {lat: 37.763880, lng: -122.446083},
            station1: {lat: 37.78741078914182, lng: -122.43674218604595},
            station2: {lat: 37.74575075621106, lng: -122.43330895872147},
            station3: {lat: 37.76475172762295, lng: -122.48394906175754}
        };
    };

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.setState({ address })
                this.setState({ mapCenter: latLng })
                console.log(this.state.mapCenter)
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <div className="map">
                <Map
                    google={this.props.google}
                    zoom={13}
                    disableDefaultUI={true}
                    initialCenter={ {
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}>
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
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)