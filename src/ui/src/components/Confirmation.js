import React, {Component} from 'react';
import {Button, List} from "antd"

class Confirmation extends Component {
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
                <div className="btn-container">
                    <Button type="primary" htmlType="submit" className="tracking-list-btn">
                        Tracking
                    </Button>
                    <Button type="primary" htmlType="submit" className="home-list-btn">
                        Home
                    </Button>
                </div>
            </div>
        );
    }
}

export default Confirmation;