import React, {Component} from 'react';
import {Form, Input, Button,} from 'antd';
import axios from 'axios';

class CreditCardForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            const params = {
                "card_number": "1234567812345678",
                "expire_date": "07/2025",
                "CVV": "123",
                "name_on_card": "Christopher Nolan"
            }
                let res = axios.post('./Dispatch/CreditCard', params);
                // console.log(res.data);
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
            <div>
                <Form {...formItemLayout} className='credit-card' onSubmit={this.handleSubmit}>
                    <Form.Item label="Please fill in your payment method for this order"/>
                    <Form.Item label="Card Number" hasFeedback>
                        {getFieldDecorator('card number', {
                            initialValue: 'XXXX XXXX XXXX XXXX',
                            rules: [
                                {
                                    type: 'card number',
                                    message: 'The input is not valid card number!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your card number!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Expiration Date" hasFeedback>
                        {getFieldDecorator('date', {
                            initialValue: 'MM/YY',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your card number!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Security Code" hasFeedback>
                        {getFieldDecorator('date', {
                            initialValue: '123',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your security code!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Cardholder Name" hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your security code!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Pay Now
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const CreditCard = Form.create({name:'credit-card'})(CreditCardForm);
export default CreditCard;