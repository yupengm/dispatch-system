import React, {Component} from 'react';
import {Radio, Input, Button, List} from 'antd';

class Recommendation extends Component {
    state = {
        value: 1,
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        if(this.props.curr_step != 3)
            return null
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="recommendation-list-box">
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio style={radioStyle} value={1}>
                        Option A
                        Drone 1  FASTEST!
                        Estimated Price :  $40
                        Estimate Deliver Time:   14:00 today
                        Estimated Travel Distance: 10 mi
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                        Option B
                        Robot 3   CHEAPEST!
                        Estimated Price : $10
                        Estimated Arrival Time: 17: 40 today
                        Estimated Travel Distance: 15 mi
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                        Option C
                        Drone 3
                        Estimated Price :  $45
                        Estimate Deliver Time:   15:00 today
                        Estimated Travel Distance: 10 mi
                    </Radio>
                    <Radio style={radioStyle} value={4} >
                        Option D
                        Robot 1
                        Estimated Price :  $20
                        Estimate Deliver Time:   16:00 today
                        Estimated Travel Distance: 10 mi
                        {this.state.value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                    </Radio>
                </Radio.Group>
                <hr/>
                <div className="btn-container">
                    {/*<Button className="recommendation-list-btn"*/}
                    {/*        size="large">Back*/}
                    {/*</Button>*/}
                    <Button className="recommendation-list-btn"
                            size="large"
                            onClick={this.props.gotoLogin}>Pay
                    </Button>
                </div>
            </div>
        );
    }
}

export default Recommendation;