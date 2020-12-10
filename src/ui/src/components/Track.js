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

class Track extends Component {
    render() {
        return (
            <div>
                <LeftSideForm />
                <Map />
            </div>
        );
    }
}

export default Track;