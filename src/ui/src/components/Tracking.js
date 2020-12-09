import React, {Component} from 'react';
import { List, Button } from 'antd';
import { Table } from 'antd';
import { withRouter } from "react-router-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Tracking extends Component {

    handleRedirect = ()=>{
        this.props.history.push("/home")
    }

    render() {

        if(this.props.curr_step != 6)
            return null

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
                information: 123456,
            },
            {
                key: '2',
                category: 'Price',
                information: '$40',
            },
            {
                key: '3',
                category: 'Status',
                information: 'Delivered',
            },
            {
                key: '4',
                category: 'User ID',
                information: "john@gmail.com",
            },
            {
                key: '5',
                category: 'Station',
                information: "2",
            },
            {
                key: '6',
                category: 'Deliver Method',
                information: 'Drone 1',
            },
            {
                key: '6',
                category: 'Deliver Time',
                information: '14:00 today',
            },
            {
                key: '7',
                category: 'Size',
                information: '60',
            },
            {
                key: '8',
                category: 'Weight',
                information: '12',
            },
            {
                key: '9',
                category: 'Feature',
                information: 'Liquid',
            },
            {
                key: '10',
                category: 'Travel Distance',
                information: '10 miles',
            },
            {
                key: '11',
                category: 'Pick Up Location',
                information: 'location A',
            },
            {
                key: '12',
                category: 'Put Down Location',
                information: 'location B',
            },
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
