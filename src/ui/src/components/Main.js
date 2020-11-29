import React, {Component} from 'react';
import Map from"./Map"
import LeftSideForm from "./LeftSideForm";
import { withRouter } from "react-router-dom";


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            destination: "",
            target:""
        }
    }



    render(){
        const {destination, target} = this.state

        return (
            <div className='main'>
                <LeftSideForm />
                <div>
                    <Map des={destination} tar={target}/>
                </div>
            </div>
        );
    }
}
export default withRouter(Main);
