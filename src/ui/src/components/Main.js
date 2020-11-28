import React, {Component} from 'react';
import UserSetting from "./UserInput";
import Map from"./Map"
import UserAddress from "./UserAddress";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps : 0
        }
    }

    handleSteps = ()=> {
        this.setState(prevState=>{
            return{
                steps: prevState.steps+1
            }
        })
    }


    render(){
        const {steps} = this.state
        console.log("Current step is :", steps)
        return (
            <div className='main'>
                <div className="left-side">
                    {steps%2 == 0 ? <UserSetting setSteps={this.handleSteps}/> : <UserAddress />}
                        {/*<UserSetting setSteps={this.handleSteps}/>*/}
                        {/*<div className="address">*/}
                        {/*    <UserAddress />*/}
                        {/*</div>*/}
                </div>
                <div>
                    <Map />
                </div>
            </div>
        );
    }
}
export default Main;
