import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, GoogleApiWrapper } from "react-google-maps";
// import Route from "./Route"
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
        route : [
            {"lat": 3.028846373870724, "lng": 101.62019493865353},
            {"lat": 3.0293392107899226, "lng": 101.62000181960445},
            {"lat": 3.0297677644503347, "lng": 101.61980870055538},
            {"lat": 3.0301963179410842, "lng": 101.61967995452267},
            {"lat": 3.0307105819060256, "lng": 101.6194868354736},
            {"lat": 3.0319319578431805, "lng": 101.61916497039181}
        ]
    }

    render() {
        const {route} = this.state;
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
                {/*<Route*/}
                {/*    // 传入route*/}
                {/*    route = {route}*/}
                {/*/>*/}
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
export default GoogleApiWrapper({
    apiKey: "AIzaSyC3VIYN9hiyxIdNHYVv2aQDOukTu64pLzA ",
    libraries: []
})(Map);