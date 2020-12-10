import React, {Component} from 'react';
import {Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, InputNumber,} from 'antd';
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

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios({
                    method: 'post',
                    url: '/Dispatch/signup',
                    data: {
                        email: values.email,
                        password: values.password,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        phone_number: values.phone
                    }
                }).then((response) => {
                    console.log(response);
                    this.props.gotoLogin()
                }, (error) => {
                    console.log("MY ERROR IS: "+error.response.status +"oh yeah");
                    if(error.response.status == 401){
                        this.setState({
                            isError : "Password combination is not correct"
                        })
                    } else if (error.response.status == 400){
                        // this.state.isError = "User does not exist"
                        this.setState({
                            isError : "User does not exist"
                        })
                    }
                    //Error pending
                });
                // const params = {
                //     "emailId": "1111@gmail.com",
                //     "password": "123123",
                //     "firstName": "Christopher",
                //     "lastName": "Nolan",
                //     "phone": "1234567890"
                //     }
                //
                //     let res = axios.post('Dispatch/signup', params);
                //
                //     // console.log(res.data);
                // this.props.gotoLogin()
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

                    <Form.Item label="E-mail" hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>


                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>

                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>


                    <Form.Item label="First Name" hasFeedback>
                        {getFieldDecorator('first_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                    whitespace: true,
                                },
                            ],
                        }) (<Input />)}
                    </Form.Item>


                    <Form.Item label="Last Name" hasFeedback>
                        {getFieldDecorator('last_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                    whitespace: true,
                                },
                            ],
                        }) (<Input />)}
                    </Form.Item>

                    <Form.Item label="Phone Number" hasFeedback>
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                    whitespace: true,
                                },
                            ],

                        }) (<Input addonBefore={prefixSelector} style={{width: '100%',}}/>)}
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