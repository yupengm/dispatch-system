import React, {Component} from 'react';
import {Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,} from 'antd';
import axios from 'axios';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegisterForm extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.gotoLogin()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const params = {
                    "emailId": "1111@gmail.com",
                    "password": "123123",
                    "firstName": "Christopher",
                    "lastName": "Nolan",
                    "phone": "1234567890"
                    }

                    let res = axios.post('Dispatch/signup', params);

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

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };


    render() {
        if(this.props.curr_step!=11)
            return null

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                    offset: 1,
                },
                sm: {
                    span: 8,
                    offset: 1,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 1,
                },
                sm: {
                    span: 16,
                    offset: 1,
                },
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

        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;


        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));


        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="86">+86</Option>
            </Select>,
        );

        return (
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>

            <Form{...formItemLayout} className="register" onSubmit={this.handleSubmit}>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="First Name"
                    label={
                        <span>Firstname</span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="Last Name"
                    label={
                        <span>Lastname</span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>


            </Form>
            </CSSTransitionGroup>

        );
    }
}
const Register = Form.create({name:'register'})(RegisterForm);
export default Register;