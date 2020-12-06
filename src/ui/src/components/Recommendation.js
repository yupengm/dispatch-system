import React, {Component} from 'react';
import {Radio, Input, Button, List} from 'antd';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import axios from 'axios';

//didMount get the route data from map>main>leftSideForm
//
class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: -1,
            options:[],
            isLoading: false
        }
    }
    //use didMount lifecycle to fetch route data from Main
    componentDidMount() {
        this.fetchData(this.props.route);
    }
    fetchData = route => {
        //get route data from Map component
        axios.post("./getPrice", { route })
            .then(response => {
                console.log(response);
                this.setState({
                    options: response.data,
                    isLoading: false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite ->', error.message);
                this.setState({
                    isLoading: false
                })
            })
    }
    onChange(index){
        this.setState({
            checked: index,
        });
        this.props.changeFn(index);
    };
    // OnChange(e) {
    //     console.log('selected option', e.target.value);
    //     this.setState({
    //         selectedOption: e.target.value
    //     });
    // }
    render() {
//        console.log(this.props.options);
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
                               onChange={this.onChange.bind(this, index)} /> Option {index + 1}
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