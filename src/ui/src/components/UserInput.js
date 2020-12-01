import React, {Component} from 'react';
import {Form, Select, InputNumber, Checkbox, Row, Col, Button,} from 'antd';
const { Option } = Select;

class UserInputForm extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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

    render(){
        const formItemLayout = {
            labelCol:{
                xs:{ span: 24 },
                sm: { span: 11 },
            },
            wrapperCol:{
                xs:{ span: 24 },
                sm: { span: 13},
            }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form {...formItemLayout} className='user-input' onSubmit={this.handleSubmit}>
                    <Form.Item label="Please help us know more about your package:"/>
                    <Form.Item label="Size" hasFeedback>
                        {getFieldDecorator('size', {
                            rules:[{required: true, message: 'Please select your package size !'}],
                        })(
                            <Select placeholder="Please select a package size">
                                <Option value='Small 13" x 11" x 2"'>Small 13" x 11" x 2"</Option>
                                <Option value='Medium 16" x 11" x 3"'>Small 16" x 11" x 3"</Option>
                                <Option value='Large 18" x 13" x 3"'>Large 18" x 13" x 3"</Option>
                                <Option value='Extra Large'>Extra Large</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Weight" hasFeedback>
                        {getFieldDecorator('weight', {
                            rules:[{required: true, message: 'Please select your package weight !'}],
                        })(
                            <Select placeholder="Please select a package weight">
                                <Option value='0 - 5 lbs'>0 - 5 lbs</Option>
                                <Option value='5 - 10 lbs'>5 - 10 lbs</Option>
                                <Option value='10 - 30 lbs'>1- - 30 lbs</Option>
                                <Option value='> 30 lbs'> > 30 lbs </Option>
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item name="checkbox" label="Features">
                        <Checkbox.Group>
                            <Row>
                                <Col span={8}>
                                    <Checkbox
                                        value="Liquid"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Liquid
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Fragile"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Fragile
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Battery"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Battery
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Pharmacy"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Pharmacy
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Grocery"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Grocery
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox
                                        value="Gift"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Gift
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>


                    <Form.Item label="Declared Value (USD)">
                        {getFieldDecorator('value', { initialValue: 0 })(<InputNumber min={0} max={10000} />)}
                        <span className="ant-form-text"> USD</span>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const UserInput = Form.create({name:'user-input'})(UserInputForm);
export default UserInput;