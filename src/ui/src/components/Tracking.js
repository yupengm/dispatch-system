import React, {Component} from 'react';
import { List, Button } from 'antd';

class Tracking extends Component {
    render() {
        /*const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;*/
        const data = [
            'We are happy to help tracking your package!',
            'User ID: john@gmail.com\n',
            'Order Number: 12345',
            'Status: Delivered',
            'Deliver Time:   14:00 today',
            'Package Information:',
            'Small, 5 lbs, no lithium battery, 50 USD',
            'Drone 1',
            'Price :  $40',
            'Travel Distance: 10 mi',
            'Order made at 11/10/2020 11:00am',
            'Order out to for delivery on 11/10/2020  12:00pm',
            'Route map displayed on Google Map',
            '(route map was updated 3 minutes ago)',
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
                            size="large">Sign out
                    </Button>
                    <Button className="tracking-list-btn"
                            size="large">Home
                    </Button>
                </div>
            </div>
        );
    }
}

export default Tracking;