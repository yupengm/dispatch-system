import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import UserAddress from './UserAddress';

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
            destination: {lat: 0, lng: 0},
            target: {lat: 0, lng: 0}
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(1)
        if (prevProps.des !== this.props.des) {
            console.log(2)
            this.locatePoint();
        }
    }


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
        return (
            <div className="mapWrapper" style={{height: `87%`, width: `69.5%`}}>
                <PlacesAutocomplete
                    value={this.locatePoint}
                    // onChange={this.handleChange}
                    // onSelect={this.locatePoint}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            {/*<input*/}
                            {/*    {...getInputProps({*/}
                            {/*        placeholder: 'Search Places ...',*/}
                            {/*        className: 'location-search-input',*/}
                            {/*    })}*/}
                            {/*/>*/}
                            {/*<div className="autocomplete-dropdown-container">*/}
                            {/*    {loading && <div>Loading...</div>}*/}
                            {/*    {suggestions.map(suggestion => {*/}
                            {/*        const className = suggestion.active*/}
                            {/*            ? 'suggestion-item--active'*/}
                            {/*            : 'suggestion-item';*/}
                            {/*        // inline style for demonstration purpose*/}
                            {/*        const style = suggestion.active*/}
                            {/*            ? { backgroundColor: '#fafafa', cursor: 'pointer' }*/}
                            {/*            : { backgroundColor: '#ffffff', cursor: 'pointer' };*/}
                            {/*        return (*/}
                            {/*            <div*/}
                            {/*                {...getSuggestionItemProps(suggestion, {*/}
                            {/*                    className,*/}
                            {/*                    style,*/}
                            {/*                })}*/}
                            {/*            >*/}
                            {/*                <span>{suggestion.description}</span>*/}
                            {/*            </div>*/}
                            {/*        );*/}
                            {/*    })}*/}
                            {/*</div>*/}
                        </div>
                    )}
                </PlacesAutocomplete>
                <Map
                    google={this.props.google}
                    zoom={this.state.zoom}
                    disableDefaultUI={true}
                    initialCenter={ {
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    center={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
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

                    <Marker
                        position={{
                            lat: this.state.destination.lat,
                            lng: this.state.destination.lng
                        }}/>

                    <Marker
                        position={{
                            lat: this.state.target.lat,
                            lng: this.state.target.lng
                        }}/>

                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)