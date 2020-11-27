import React, {Component} from 'react';
import UserSetting from "./UserInput";
import Map from"./Map"
import UserAddress from "./UserAddress";
import WelcomePage from './WelcomePage';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state={isEmptyState: true}
    }
    triggerAddressState = () => {
        this.setState({
            ...this.state,
            isEmptyState: false,
            isAddressState:true
        })
    }
    render(){
        return (
            <div className='main'>
                <div className="welcome-page">
                    <WelcomePage />
                </div>
                <div className="left-side">
                        <UserSetting />
                        <div className="address">
                            <UserAddress />
                        </div>
                </div>
                <div className="right-side">
                    <Map />
                </div>
            </div>
        );
    }
}
export default Main;
