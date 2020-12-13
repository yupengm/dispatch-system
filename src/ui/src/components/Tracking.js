import React, {Component} from 'react';
import {List, Button, Spin} from 'antd';
import { Table } from 'antd';
import { withRouter } from "react-router-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import axios from 'axios';

class Tracking extends Component {
    constructor() {
        super();
        this.state={
            data:null,
            onTrack:true
        }
    }
    componentDidMount() {
        axios.get('/Dispatch/tracking', { params: { id: this.props.orderNum } })
             .then(response => {
                 console.log(response)
                 this.setState({
                     data:response.data
                 })
                 this.props.saveTracking(response.data)
            })
            .catch(error => {
                 console.log('err in fetch xxx -> ', error);
                 this.setState({
                     onTrack: false
                 })
                 // this.props.history.push("/home")
            })
    }

    handleRedirect = ()=>{
        this.props.history.push("/home")
    }

    render() {

        if(this.props.curr_step != 6)
            return null
        if(this.state.onTrack==false)
            return(
                <div className="warning" id="text">
                <div >
                    Tracking number does not exist
                </div>
                    <br/>
                <Button type="primary" htmlType="submit"
                        onClick={this.handleRedirect}>
                    Go back
                </Button>
                </div>
            )
        if(this.state.data==null)
            return (
                <div className="spin-box" id="loading">
                    <Spin tip="Loading..." size="large"/>
                </div>
            )

        const columns = [
            {
                title: 'Category',
                dataIndex: 'category',
            },
            {
                title: 'Information',
                dataIndex: 'information',
            },
        ];

        const data = [
            {
                key: '1',
                category: 'Order Number',
                information: this.state.data.orderNumber,
            },
            {
                key: '2',
                category: 'Price',
                information: this.state.data.price + " Dollars",
            },
            {
                key: '3',
                category: 'Status',
                information: this.state.data.status,
            },
            {
                key: '4',
                category: 'User ID',
                information: this.state.data.email,
            },
            {
                key: '5',
                category: 'Station',
                information: this.state.data.station,
            },
            {
                key: '6',
                category: 'Deliver Method',
                information: this.state.data.type == 2 ? "Drone" : "Robot",
            },
            {
                key: '6',
                category: 'Deliver Time',
                information: this.state.data.StartTime,
            },
            // {
            //     key: '7',
            //     category: 'Size',
            //     information: '60',
            // },
            {
                key: '8',
                category: 'Weight',
                information: this.state.data.weight,
            },
            // {
            //     key: '9',
            //     category: 'Feature',
            //     information: 'Liquid',
            // },
            // {
            //     key: '10',
            //     category: 'Travel Distance',
            //     information: '10 miles',
            // },
            // {
            //     key: '11',
            //     category: 'Pick Up Location',
            //     information: 'location A',
            // },
            // {
            //     key: '12',
            //     category: 'Put Down Location',
            //     information: 'location B',
            // },
        ];
        return (
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>

            <div className={"tracking-table-box"}>
                <h3>We are happy to help tracking your package!</h3>
                <Table columns={columns} dataSource={data} size="small"/>
                <div>
                    Route map displayed on Google Map
                    (route map was updated 3 minutes ago)
                </div>
                {/*document.getElementById('container')*/}
                <div className="btn-container">

                    <Button type="primary" htmlType="submit" className="signout-table-btn"
                            onClick={this.handleRedirect}>
                        Sign Out
                    </Button>
                    <Button type="primary" htmlType="submit"  className="home-table-btn"
                            onClick={this.handleRedirect}>
                        Home
                    </Button>
                </div>
            </div>
            </CSSTransitionGroup>
        );
    }
}

export default withRouter(Tracking);
