import React, {Component} from 'react';
import UserInput from './UserInput';
import Map from"./Map"
class Main extends Component {
    render(){
        return (
            <div className='main'>
                <div className="left-side">
                    left
                    <UserInput />
                    <div className="address">
                        Address Component
                    </div>
                </div>
                <div className="right-side">
                    Map
                    <Map />
                </div>
            </div>
        );
    }
}
export default Main;
