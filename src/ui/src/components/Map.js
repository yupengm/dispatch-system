import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
// import Geocode from "react-geocode";
// import Autocomplete from 'react-google-autocomplete';
// import { Descriptions } from 'antd';
// import {useGoogleMap} from "@react-google-maps/api";

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

class Map extends React.Component {

    state = {
        address: '',
        city: '',
        area: '',
        state: '',
        zoom: 13,
        height: 400,
    }

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>

            <GoogleMap
                defaultZoom={this.state.zoom}
                defaultCenter={{ lat: 37.763880, lng: -122.446083 }}
                disableDefaultUI={true}
            >
                <Marker
                    position={{ lat: 37.78741078914182, lng: -122.43674218604595 }}
                >
                    <InfoWindow>
                        <div>
                            Station 1
                        </div>
                    </InfoWindow>
                </Marker>

                <Marker
                    position={{ lat: 37.74575075621106, lng: -122.43330895872147 }}
                >
                    <InfoWindow>
                        <div>
                            Station 2
                        </div>
                    </InfoWindow>
                </Marker>

                <Marker
                    position={{ lat: 37.76475172762295, lng: -122.48394906175754 }}
                >
                    <InfoWindow>
                        <div>
                            Station 3
                        </div>
                    </InfoWindow>
                </Marker>

            </GoogleMap>
        ));

        return (
            <div>
                <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=&libraries=geometry,drawing,places"
                    loadingElement={<div className="map" style={{height: `760px`, width: `100%`}}/>}
                    containerElement={<div className="mapWrapper" style={{height: `87%`, width: `69.5%`}}/>}
                    mapElement={<div className="map" style={{height: `100%`, width: `100%`}}/>}
                />
            </div>

        )
    }

    addMarker = (location, map) => {

    }

}
export default Map;