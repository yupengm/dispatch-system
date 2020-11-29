import React, {Component} from 'react';
import {Button, List} from "antd"
import { withRouter } from "react-router-dom";

class Confirmation extends Component {

    handleRedirect = ()=>{
        this.props.history.push("/home")
    }

    render() {

        if(this.props.curr_step != 5)
            return null

        /*const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;*/
        const data = [
            'Your order has been submit! Thank you for choosing DispatchSF!',
            'User ID: john@gmail.com\n',
            'Order Number: 12345\n',
            'Status: In Process\n',
            'Drone 1',
            'Price :  $40',
            'Estimated Deliver Time:   14:00 today',
            'Estimated Travel Distance: 10 mi',
        ];
        return(
            <div className="tracking-list-box">

                {
                    /*isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large" />
                        </div>
                        :*/
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                    // <List
                    //     className="tracking-list"
                    //     itemLayout="horizontal"
                    //     size="small"
                    //     dataSource={data}
                    //     renderItem={item => (
                    //         <List.Item>
                    //             <List.Item.Meta
                    //                 /*avatar={<Avatar size={50} src={satellite} />}*/
                    //                 title={<a href="https://ant.design">{item.title}</a>}
                    //             />
                    //         </List.Item>
                    //     )}
                    // />
                }
                <hr/>
                <div className="btn-container">
                    <Button className="tracking-list-btn"
                            size="large"
                            onClick={this.props.setSteps}>Tracking
                    </Button>
                    <Button className="tracking-list-btn"
                            size="large"
                            onClick={this.handleRedirect}>Home
                    </Button>
                </div>
            </div>
        );
    }
}

export default withRouter(Confirmation);