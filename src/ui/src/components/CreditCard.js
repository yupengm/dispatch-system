import React, {Component} from 'react';
import {Form, Input, Button, Icon,} from 'antd';
import axios from 'axios';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class CreditCardForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // const params = {
                //     "card_number": "1234567812345678",
                //     "expire_date": "07/2025",
                //     "CVV": "123",
                //     "name_on_card": "Christopher Nolan"
                // }
                // let res = axios.post('./Dispatch/CreditCard', params);
                // console.log(res.data);
                let data = {
                    card_number: "1234567812345678",
                    expire_date: "07/2025",
                    CVV: "123",
                    name_on_card: "Christopher Nolan"
                }

                if(values.card_number!=undefined && values.code!=undefined && values.name!=undefined && values.date!=undefined){
                    data = {
                        card_number: values.card_number,
                        expire_date: values.date,
                        CVV: values.code,
                        name_on_card: values.name
                    }
                }

                this.props.order(data)
                this.props.setSteps()

            }
        });
    };


    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    render() {
        if(this.props.curr_step != 4)
            return null

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>

            <div>
                <Form {...formItemLayout} className='credit-card' onSubmit={this.handleSubmit}>
                    <Form.Item label="Please fill in your payment method for this order"/>
                    <Form.Item label="Card Number" hasFeedback>
                        {getFieldDecorator('card_number', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your card number!',
                                }
                            ],
                        })(
                            <Input
                            placeholder="XXXX XXXX XXXX XXXX"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="date" hasFeedback>
                        {getFieldDecorator('date', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input expiration date!',
                                },
                            ],
                        })(
                            <Input
                                placeholder="MM/YY"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="code" hasFeedback>
                        {getFieldDecorator('code', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your security code!',
                                },
                            ],
                        })(
                            <Input
                                placeholder="123"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="name" hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your security code!',
                                },
                            ],
                        })(
                            <Input
                                // placeholder="First Name Last Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Pay Now
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            </CSSTransitionGroup>
        );
    }
}
const CreditCard = Form.create({name:'credit-card'})(CreditCardForm);
export default CreditCard;
