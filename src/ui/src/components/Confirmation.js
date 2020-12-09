import React, {Component} from 'react';
import {Button, List} from "antd"
import { withRouter } from "react-router-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Confirmation extends Component {


    handleRedirect = ()=>{
        this.props.history.push("/home")
    }


    // axios.get(url)
    //      .then(response => {
    //            console.log(response.data)
    //             this.setState({
    //                 xxxInfo: response.data,
    //                 isLoadingList: false
    //     })
    //     .catch(error => {
    //          console.log('err in fetch xxx -> ', error);
    //     })

    render() {

        if(this.props.curr_step != 5)
            return null

        const data = [
            'Your order has been submit! Thank you for choosing DispatchSF!',
            'Order Number: 12345\n',
            'Price:  $40',
            'Status: In Process\n',
            'User ID: john@gmail.com\n',
            'Station: ',
            'Deliver Method: Drone',
            'Size: 60',
            'Weight: 12',
            'Feature: Liquid',
            'Pick Up Location:  ',
            'Put Down Location: ',
        ];
        return(
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>

            <div className="tracking-list-box">

                {
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                }
                <div className="btn-container">

                    <Button type="primary" htmlType="submit" className="tracking-list-btn"
                            onClick={this.props.setSteps}>
                        Tracking
                    </Button>
                    <Button type="primary" htmlType="submit" className="home-list-btn"
                            onClick={this.handleRedirect}>
                        Home
                    </Button>
                </div>
            </div>
            </CSSTransitionGroup>
        );
    }
}

export default withRouter(Confirmation);