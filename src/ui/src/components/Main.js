import React, {Component} from 'react';
import UserSetting from "./UserInput";
import Map from"./Map"
import UserAddress from "./UserAddress";
class Main extends Component {
    render(){
        return (
            <div className='main'>
                <div className="left-side">
                        <UserSetting />
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
