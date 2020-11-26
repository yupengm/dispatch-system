import React, {Component} from 'react';
import UserSetting from "./UserInput";
import Map from"./Map"
import UserAddress from "./UserAddress";
class Main extends Component {
    constructor() {
        super();
        this.state = {
            destination: "",
            target: ""
        }
    }
    setPoints = (destination, target) => {
        console.log('main setpoints', this.state)
        this.setState(() => ({
            destination: destination,
            target: target
        }));
        console.log('setPoints changed', this.state)
    }

    render(){
        const {destination, target} = this.state
        console.log('main render', destination)
        return (
            <div className='main'>
                <div className="left-side">
                        <UserSetting />
                        <div className="address">
                            <UserAddress showPoints={this.setPoints}/>
                        </div>
                </div>
                <div>
                    <Map des={destination} tar={target}/>
                </div>
            </div>
        );
    }
}
export default Main;
