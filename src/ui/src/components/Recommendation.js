import React, {Component} from 'react';
import {Radio, Input, Button, List} from 'antd';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            options: [["1","option1"],["2","option2"],["3","option3"]],
        }
    }
    onChange = function(e){
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

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
                               onChange={this.onChange.bind(this)} /> Option {index + 1}
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