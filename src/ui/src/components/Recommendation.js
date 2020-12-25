import React, {Component} from 'react';
import {Radio, Input, Button, List, Spin} from 'antd';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import axios from 'axios';

//didMount get the route data from map>main>leftSideForm
//
class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: -1,
            options:[],
            isLoading: true,
            warning:"",
            shake:false,
        }
    }
    //use didMount lifecycle to fetch route data from Main
    componentDidMount() {
        //this.fetchData(json);
        // console.log(this.props.routes)
        // this.fetchData(this.props.routes);

    }

    handleSubmit = () =>{
        if (this.state.checked !== -1){
            this.props.optionSubmit()
            this.props.gotoLogin()
        } else {
            this.setState({
                warning: "Please select an option from the list",
                shake: true,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(prevProps.routes!=this.props.routes){
        //     this.fetchData(this.props.routes)
        // }
    }

    // fetchData = route => {
    //     this.setState({
    //         isLoading: true
    //     })
    //     //get route data from Map component
    //     axios.post("/Dispatch/getPrice", route)
    //         .then(response => {
    //             console.log("Get response from backend", response);
    //             this.setState({
    //                 options: response.data,//response is Price object
    //                 isLoading: false
    //             })
    //         })
    //         .catch(error => {
    //             console.log('err in fetch options ->', error.message);
    //             this.setState({
    //                 isLoading: true
    //             })
    //         })
    // }
    onChange(index){
        this.setState({
            checked: index,
        });
        this.props.changeFn(index);
    };
    // OnChange(e) {
    //     console.log('selected option', e.target.value);
    //     this.setState({
    //         selectedOption: e.target.value
    //     });
    // }
    render() {
        if(this.props.curr_step != 3)
            return null
        console.log(this.props.routeOptions);
        if(this.props.routes.length == 0)
            return (
                <div className="spin-box" id="loading">
                    <Spin tip="Loading..." size="large"/>
                </div>
            )
        return (
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>
            <div className="recommendation-list-box">
                {this.props.routes.map((choice, index) => (
                    <label key={index}>
                        <input type="radio"
                               name="options"
                               value={choice}
                               key={index}
                               //defaultChecked={choice.tag2 === "Cheapest"}
                               checked={this.state.checked === index}
                               onChange={this.onChange.bind(this, index)} /> Option {index + 1} &nbsp; &nbsp; <span style={{ color: 'red' }}> {choice.tag1} &nbsp; &nbsp;</span> <span style={{ color: 'red' }}> {choice.tag2} &nbsp; &nbsp;</span>
                        <ul>
                            <li>Delivery Type: {this.props.routeOptions[index].deliverType === 2 ? 'Drone' : 'Robot'}</li>
                            <li>Price: {choice.price}</li>
                            <li>Delivery Time: {((parseInt(choice.time1)+parseInt(choice.time2))/60).toFixed(2)} Mins</li>
                            <li>Distance: {(choice.distance / 1000).toFixed(2)} Km</li>
                        </ul>
                        <br />
                    </label>
                    ))}

                <div className="btn-container">
                    <Button type="primary" htmlType="submit" className="back-list-btn"
                        onClick={this.props.goback}>
                        Back
                    </Button>
                    <Button type="primary"
                        htmlType="submit"
                        className="pay-list-btn"
                        onClick={this.handleSubmit}>
                        Pay
                    </Button>
                    <p style={{color: "red"}} className={this.state.shake ? "shake": ""}>{this.state.warning}</p>
                </div>
            </div>
            </CSSTransitionGroup>
        );
    }
}
export default Recommendation;