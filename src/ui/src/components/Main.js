import React, {Component} from 'react';
import UserInput from "./UserInput";
import Map from"./Map"
import UserAddress from "./UserAddress";
import Login from "./Login";
import Register from "./Register";

class Main extends Component {
    render(){
        return (
            <div className='main'>
                <div className="left-side">
                        <Register />
                        <div className="address">
                            <UserAddress />
                        </div>
                </div>
                <div>
                    <Map />
                </div>
            </div>
        );
    }
}
export default Main;
