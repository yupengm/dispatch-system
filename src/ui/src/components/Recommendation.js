import React, {Component} from 'react';
import {Radio, Input, Button, List} from 'antd';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: 0,
            options: [["1","option1"],["2","option2"],["3","option3"]],
        }
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


    // onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     this.setState({
    //         value: e.target.value,
    //     });
    // };
    onChange(i){
        this.setState({
            checked: i,
        });
//        console.log(this.state.checked);
    }
    handleClick() {
        console.log('submitted option', this.state.selectedOption);
    }

    // handleOnChange(e) {
    //     console.log('selected option', e.target.value);
    //     this.setState({ selectedOption: e.target.value});
    // }
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
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>
            <div className="recommendation-list-box">
                {this.state.options.map((choice, index) => (
                    <label key={index}>
                        <input type="radio"
                               name="options"
                               value={choice}
                               key={index}
                               checked={this.state.checked === index}
                               onChange={this.onChange.bind(this,index)} /> Option {index + 1}
                        <List
                            bordered
                            dataSource={choice}
                            renderItem={item => <List.Item>{item}</List.Item>}
                            size = "small"
                        />
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
                        onClick={this.props.gotoLogin}>
                        Pay
                    </Button>
                </div>
            </div>
            </CSSTransitionGroup>
        );
    }
}

export default Recommendation;