import React, {Component} from 'react';
import {Form, Icon, Input, Button,Checkbox} from 'antd';
import axios from 'axios';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class LoginForm extends Component {
    constructor() {
        super();
        // this.isError: false;
        this.state = {
            isError: "",
            shake: false
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    shake:false
                })
                let data = null
                if(this.props.form.getFieldValue('username') == undefined){
                    data = {
                        email: "1111@gmail.com",
                        password: "123123"
                    }
                } else {
                    data = {
                        email: this.props.form.getFieldValue('username'),
                        password: this.props.form.getFieldValue('password')
                    }
                }


                axios({
                    method: 'post',
                    url: '/Dispatch/login',
                    data: data
                }).then((response) => {
                    console.log(response);
                    this.props.authenticate(data.email)
                    this.props.loggedin()
                }, (error) => {
                    this.setState({
                        shake:true
                    })
                    console.log("MY ERROR IS: "+error.response.status +"oh yeah");
                    if(error.response.status == 401){
                        this.setState({
                            isError : "Password is not correct!"
                        })
                    } else if (error.response.status == 400){
                        // this.state.isError = "User does not exist"
                        this.setState({
                            isError : "User does not exist!"
                        })
                    }
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
                    {/*<a className="login-form-forgot" href="">*/}
                    {/*    Forgot password*/}
                    {/*</a>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a onClick={this.props.gotoRegister}>register now!</a>
                    <div id="error" className={this.state.shake ? "shake": ""}>
                        {this.state.isError}
                    </div>
                </Form.Item>
            </Form>
            </CSSTransitionGroup>
        );
        }
}
const Login = Form.create({name:'login'})(LoginForm);
export default Login;

