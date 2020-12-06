import React, {Component} from 'react';
import {Form, Icon, Input, Button,Checkbox} from 'antd';
import axios from 'axios';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class LoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                axios({
                            method: 'get',
                            url: '/Dispatch/login',
                            data: {
                            email:  "1111@gmail.com",
                            password:  "123123"
                            }
                        }).then((response) => {
                            console.log(response);
                        }, (error) => {
                            console.log(error);
                        });
                }
        });
    };

    render() {
        if(this.props.curr_step!=10)
            return null

        const formItemLayout = {
            labelCol:{
                xs:{ span: 24 },
                sm: { span: 6 },
            },
            wrapperCol:{
                xs:{ span: 24 },
                sm: { span: 18},
            }
        };

        const { getFieldDecorator } = this.props.form;
        return (
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>
            <Form {...formItemLayout}
                onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            className="logininput"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            className="logininput"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a onClick={this.props.gotoRegister}>register now!</a>
                </Form.Item>
            </Form>
            </CSSTransitionGroup>
        );
        }
}
const Login = Form.create({name:'login'})(LoginForm);
export default Login;

