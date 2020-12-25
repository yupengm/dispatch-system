import React, {Component} from 'react';
import {Button, List, Spin} from "antd"
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

        console.log(this.props.order_route)

        if(this.props.curr_step != 5)
            return null
        if(this.props.order_number == null)
            return(
                <div className="spin-box" id="loading">
                    <Spin tip="Loading..." size="large"/>
                </div>
            )

        const data = [
            'Your order has been submit! Thank you for choosing DispatchSF!',
            `Order Number: ${this.props.order_number}\n`,
            `Price:  $${this.props.order_route.price}`,
            'Status: On the way to pick up\n',
            `User ID: ${this.props.user}\n`,
            `Station: ${this.props.order_route.stationName}`,
            `Deliver Method: ${this.props.order_route.deliverType == 2 ? "Drone": "Robot"}`,
            `Size: ${this.props.length}in.(length) x ${this.props.width}in.(width) x ${this.props.height}in.(height)`,
            `Weight: ${this.props.weight} lbs`,
            `Pick Up Location:  ${this.props.pickup.address1A}, ${this.props.pickup.city}, US. ${this.props.pickup.zipadd}`,
            `Put Down Location: ${this.props.deliver.address1A}, ${this.props.deliver.city}, US. ${this.props.deliver.zipadd}`,
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

                    {/*<Button type="primary" htmlType="submit" className="tracking-list-btn"*/}
                    {/*        onClick={this.props.setSteps}>*/}
                    {/*    Tracking*/}
                    {/*</Button>*/}
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