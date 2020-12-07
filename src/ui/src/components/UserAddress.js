import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Button, Input, InputNumber} from 'antd';
import 'antd/dist/antd.css';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import axios from "axios";

class UserAddressForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            target: "", destination: "",
        // /^(\s?)(\d{1,10})(\s+)(\d*[A-Z|a-z]+)(\s+)([A-Z|a-z]+)(\s?)$/,
            expectationAddress1: /^(\s?)((\d*[A-Z|a-z]*\s*){1,5})(\s?)$/,
            expectationAddress2: /^(\s?)((\d*[A-Z|a-z]*\s*){1,5})(\s?)$/,
            expectationZip: /^(\s?)(\d{5}(-\d{4})?)(\s?)$/,
            expectationCity: /^(\s?)(([A-Z|a-z]*\s*){1,7})(\s?)$/,
            emptyAdd1A: true, emptyAdd2A: true, emptyZipA: true, emptyCityA: true,
            addressMatch2A: false, addressMatch1A: false, zipMatchA: false, cityMatchA: false,
            address1A: "", address2A: "", cityA: "", zipA: "", addressA: "",
            emptyAdd1B: true, emptyAdd2B: true, emptyZipB: true, emptyCityB: true,
            addressMatch2B: false, addressMatch1B: false, zipMatchB: false, cityMatchB: false,
            address1B: "", address2B: "", cityB: "", zipB: "", addressB: ""
        }
        this.sendInfo = this.sendInfo.bind(this);
        this.checkAddress1A = this.checkAddress1A.bind(this);
        this.checkAddress2A = this.checkAddress2A.bind(this);
        this.checkCityA = this.checkCityA.bind(this);
        this.checkZipA = this.checkZipA.bind(this);
        this.checkAddress1B = this.checkAddress1B.bind(this);
        this.checkAddress2B = this.checkAddress2B.bind(this);
        this.checkCityB = this.checkCityB.bind(this);
        this.checkZipB = this.checkZipB.bind(this);
    }

    checkAddress1A(e) {
        this.setState({emptyAdd1A : e.target.value === '', addressMatch1A : this.state.expectationAddress1.test(e.target.value)});
        this.setState({address1A: this.state.expectationAddress1.test(e.target.value) && e.target.value});
    }
    checkAddress2A(e) {
        this.setState({emptyAdd2A : e.target.value === '', addressMatch2A : this.state.expectationAddress2.test(e.target.value)});
        this.setState({address2A: this.state.expectationAddress2.test(e.target.value) && e.target.value});
    }
    checkCityA(e) {
        this.setState({emptyCityA : e.target.value === '', cityMatchA : this.state.expectationCity.test(e.target.value)});
        this.setState({cityA: this.state.expectationCity.test(e.target.value) && e.target.value});
    }
    checkZipA(e) {
        this.setState({emptyZipA : e.target.value === '', zipMatchA : this.state.expectationZip.test(e.target.value)});
        this.setState({zipA: this.state.expectationZip.test(e.target.value) && e.target.value});
    }

    checkAddress1B(e) {
        this.setState({emptyAdd1B : e.target.value === '', addressMatch1B : this.state.expectationAddress1.test(e.target.value)});
        this.setState({address1B: this.state.expectationAddress1.test(e.target.value) && e.target.value});
    }
    checkAddress2B(e) {
        this.setState({emptyAdd2B : e.target.value === '', addressMatch2B : this.state.expectationAddress2.test(e.target.value)});
        this.setState({address2B: this.state.expectationAddress2.test(e.target.value) && e.target.value});
    }
    checkCityB(e) {
        this.setState({emptyCityB : e.target.value === '', cityMatchB : this.state.expectationCity.test(e.target.value)});
        this.setState({cityB: this.state.expectationCity.test(e.target.value) && e.target.value});
    }
    checkZipB(e) {
        this.setState({emptyZipB : e.target.value === '', zipMatchB : this.state.expectationZip.test(e.target.value)});
        this.setState({zipB: this.state.expectationZip.test(e.target.value) && e.target.value});
    }

    sendInfo() {
        let target = this.state.address1A + ' ' + this.state.address2A + ', ' + this.state.cityA + ', ' + this.state.zipA;
        let destination = this.state.address1B + ' ' + this.state.address2B + ', ' + this.state.cityB + ', ' + this.state.zipB;
        let target_val = {
            address1A: this.state.address1A,
            address2A: this.state.address2A,
            city: this.state.cityA,
            zipadd: this.state.zipA
        }

        let destination_val = {
            address1A: this.state.address1B,
            address2A: this.state.address2B,
            city: this.state.cityB,
            zipadd: this.state.zipB
        }

        // axios({
        //     method: 'post',
        //     url: '/Dispatch/addressValidation',
        //     data: {
        //         pickup_address: "2130 Fulton St",
        //         pickup_city: "San Francisco",
        //         pickup_zip: "94117",
        //         deliver_address: "1600 Holloway Ave",
        //         deliver_city: "San Francisco",
        //         deliver_zip: "94132"
        //     }
        // }).then((response) => {
        //     console.log(response.data);
        //
        // }, (error) => {
        //     console.log(error);
        // });
        //
        this.props.showAddress(target_val, destination_val);
        console.log(target);
        console.log(destination);
        this.props.setSteps();
    }

    render() {
        if(this.props.curr_step!=1)
            return null
        const formItemLayout = {labelCol: { span: 4 }, wrapperCol: { span: 14 }};
        const buttonItemLayout = {wrapperCol: { span: 14, offset: 4 }};
        const { getFieldDecorator } = this.props.form;

        return (
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>
            <div className="address">
                <Form className='user-address' layout="horizontal">
                    <Form.Item label="Where should we pick it up?"/>
                    <Form.Item label="Address Line 1" {...formItemLayout} required hasFeedback
                               validateStatus={this.state.emptyAdd1A ? "" : (this.state.addressMatch1A ? "success" : "error")}
                               id={this.state.emptyAdd1A ? "" : (this.state.addressMatch1A ? "success" : "error")} >
                        {getFieldDecorator('pickupaddr1A',
                            {initialValue : this.props.pickup == null ? "" : this.props.pickup.address1A}
                        )(<Input placeholder="Street Address" onChange={this.checkAddress1A} />)}
                    </Form.Item>
                    <Form.Item label="Address Line 2" {...formItemLayout} hasFeedback
                               validateStatus={this.state.emptyAdd2A ? "" : (this.state.addressMatch2A ? "success" : "error")}
                               id={this.state.emptyAdd2A ? "" : (this.state.addressMatch2A ? "success" : "error")} >
                        {getFieldDecorator('pickupaddr2A',
                            {initialValue : this.props.pickup == null ? "" : this.props.pickup.address2A}
                        )(<Input placeholder="Street Address" onChange={this.checkAddress2A} />)}
                    </Form.Item>
                    <Form.Item label="City" {...formItemLayout} required hasFeedback
                               validateStatus={this.state.emptyCityA ? "" : (this.state.cityMatchA ? "success" : "error")}
                               id={this.state.emptyCityA ? "" : (this.state.cityMatchA ? "success" : "error")}>
                        {getFieldDecorator('pickupcity',
                            {initialValue : this.props.pickup == null ? "" : this.props.pickup.city}
                        )(<Input placeholder="San Francisco" onChange={this.checkCityA} />)}
                    </Form.Item>
                    <Form.Item label="Zip Code" {...formItemLayout} required hasFeedback
                               validateStatus={this.state.emptyZipA ? "" : (this.state.zipMatchA ? "success" : "error")}
                               id={this.state.emptyZipA ? "" : (this.state.zipMatchA ? "success" : "error")} >
                        {getFieldDecorator('pickupzip',
                            {initialValue : this.props.pickup == null ? "" : this.props.pickup.zipadd}
                        )(<Input placeholder="Postal Code" onChange={this.checkZipA} />)}




                    </Form.Item>
                    <Form.Item label="Where should we deliver it to?"/>
                    <Form.Item label="Address Line 1" {...formItemLayout} required hasFeedback
                               validateStatus={this.state.emptyAdd1B ? "" : (this.state.addressMatch1B ? "success" : "error")}
                               id={this.state.emptyAdd1B ? "" : (this.state.addressMatch1B ? "success" : "error")} >
                        {getFieldDecorator('deliveraddr1A',
                            {initialValue : this.props.pickup == null ? "" : this.props.deliver.address1A}
                        )(<Input placeholder="Street Address" onChange={this.checkAddress1B} />)}
                    </Form.Item>
                    <Form.Item label="Address Line 2" {...formItemLayout} hasFeedback
                               validateStatus={this.state.emptyAdd2B ? "" : (this.state.addressMatch2B ? "success" : "error")}
                               id={this.state.emptyAdd2B ? "" : (this.state.addressMatch2B ? "success" : "error")} >
                        {getFieldDecorator('deliveraddr2A',
                            {initialValue : this.props.pickup == null ? "" : this.props.deliver.address2A}
                        )(<Input placeholder="Street Address" onChange={this.checkAddress2B} />)}

                    </Form.Item>
                    <Form.Item label="City" {...formItemLayout} required hasFeedback
                               validateStatus={this.state.emptyCityB ? "" : (this.state.cityMatchB ? "success" : "error")}
                               id={this.state.emptyCityB ? "" : (this.state.cityMatchB ? "success" : "error")}>

                        {getFieldDecorator('delivercity',
                            {initialValue : this.props.pickup == null ? "" : this.props.deliver.city}
                        )(<Input placeholder="San Francisco" onChange={this.checkCityB} />)}
                    </Form.Item>

                    <Form.Item label="Zip Code" {...formItemLayout} required hasFeedback
                               validateStatus={this.state.emptyZipB ? "" : (this.state.zipMatchB ? "success" : "error")}
                               id={this.state.emptyZipB ? "" : (this.state.zipMatchB ? "success" : "error")} >
                        {getFieldDecorator('deliverzip',
                            {initialValue : this.props.pickup == null ? "" : this.props.deliver.zipadd}
                        )(<Input placeholder="Postal Code" onChange={this.checkZipB} />)}

                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        {/*<Button type="primary" onClick={this.sendInfo} disabled={!((this.state.zipMatchA && this.state.addressMatch1A && (this.state.addressMatch2A||this.state.emptyAdd2A) && this.state.cityMatchA)*/}
                        {/*    && (this.state.zipMatchB && this.state.addressMatch1B && (this.state.addressMatch2B||this.state.emptyAdd2B) && this.state.cityMatchB))}>Submit</Button>*/}
                        <Button type="primary" onClick={this.sendInfo} > Submit </Button>

                    </Form.Item>
                </Form>
            </div>
            </CSSTransitionGroup>
        );
    }
}

const UserAddress = Form.create({name:'user-input'})(UserAddressForm);
export default UserAddress;