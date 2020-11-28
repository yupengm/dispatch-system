import React, {Component} from 'react';
import {
    Polyline,
    InfoWindow
} from "react-google-maps";

class Route extends Component {
    render() {
        // const { station_name, robot, station_id, lon, lat, drone } = this.props.locationInfo;
        return (
            <Polyline
                path={this.props.route}
                geodesic={true}
                options={{
                    strokeColor: '#00ffff',
                    strokeOpacity: 0.75,
                    strokeWeight: 6,
                    icons: [
                        {
                            // icon: lineSymbol,
                            offset: "0",
                            repeat: "20px"
                        }
                    ]
                }}
            >
            </Polyline>
        );
    }
}

export default Route;