import React, {Component} from 'react';
import UserInput from './UserInput';
import Map from"./Map"
class Main extends Component {
    render(){
        return (
            <div className='main'>
                <div className='left'>
                    <UserInput />
                </div>
                <div className='right'>
                    <Map />
                </div>
            </div>
        );
    }
}
export default Main;
