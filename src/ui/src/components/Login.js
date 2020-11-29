import React, {Component} from 'react';
import {Form, Icon, Input, Button,Checkbox} from 'antd';
import axios from 'axios'
class LoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    email: "111@gmail.com",
                    password: "10000"

                }

                let res = axios.post("./login", params)
                console.log(res)
                console.log('Received values of form: ', values);
                this.props.loggedin()
            }
        });
    };

    // axios.get("./Dispatch/login");

    render() {
        if(this.props.curr_step!=10)
            return null

        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" >
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
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
        );
        }
}
const Login = Form.create({name:'login'})(LoginForm);
export default Login;

