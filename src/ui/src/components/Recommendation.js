import React, {Component} from 'react';
import {Radio, Input, Button, List} from 'antd';


class Recommendation extends Component {
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
    state = {
        value: 1,
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    const
    data1 = [
        'Drone 1  FASTEST!',
        'Estimated Price :  $40',
        'Estimate Deliver Time:   14:00 today',
        'Estimated Travel Distance: 10 mi',
    ];
    data2 = [
        'Robot 3   CHEAPEST!\n',
        'Estimated Price : $10\n',
        'Estimated Arrival Time: 17: 40 today\n',
        'Estimated Travel Distance: 15 mi',
    ];
    data3 = [
        'Drone 3',
        'Estimated Price :  $45',
        'Estimate Deliver Time:   15:00 today',
        'Estimated Travel Distance: 10 mi',
    ];
    data4 = [
        'Drone 3',
        'Estimated Price :  $45',
        'Estimate Deliver Time:   15:00 today',
        'Estimated Travel Distance: 10 mi',
        'Robot 1',
        'Estimated Price :  $20',
        'Estimate Deliver Time:   16:00 today',
        'Estimated Travel Distance: 10 mi',
    ];
    render() {

        if(this.props.curr_step != 3)
            return null      

        return (
            <div className="recommendation-list-box">
                <div>
                        <input type="radio" value="OPTION A" name="options"/>Option A
                        <List
                            bordered
                            dataSource={this.data1}
                            renderItem={item => <List.Item>{item}</List.Item>}
                            size = "small"
                        />
                </div>
                <br/>
                <div>
                    <input type="radio" value="OPTION B" name="options"/>Option B
                        <List
                            bordered
                            dataSource={this.data2}
                            renderItem={item => <List.Item>{item}</List.Item>}
                            size = "small"
                        />
                </div>
                <br/>
                <div>
                    <input type="radio" value="OPTION C" name="options"/>Option C
                        <List
                            bordered
                            dataSource={this.data3}
                            renderItem={item => <List.Item>{item}</List.Item>}
                            size = "small"
                        />
                </div>
                <br/>
                <div>
                    <input type="radio" value="OPTION D" name="options"/>Option D
                        <List
                            bordered
                            dataSource={this.data4}
                            renderItem={item => <List.Item>{item}</List.Item>}
                            size = "small"
                        />
                </div>

                <div className="btn-container">
                    <Button type="primary" htmlType="submit" className="back-list-btn">
                        Back
                    </Button>
                    <Button type="primary" 
                        htmlType="submit" 
                        className="pay-list-btn" 
                        onClick={this.props.gotoLogin}>
                        Pay
                    </Button>
                </div>
            </div>
        );
    }
}

export default Recommendation;