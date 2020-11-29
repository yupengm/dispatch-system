import React, {Component} from 'react';
import {Form, InputNumber, Checkbox, Row, Col, Button} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import axios from 'axios';

class UserInputForm extends Component{


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.handleChange(values)
                this.props.setSteps()

                const params = {
                        size: this.props.length * this.props.width * this.props.height,
                    }

                    let res = axios.post('Dispatch/input', params);

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

    componentDidMount() {
        // this.props.form.setFieldsValue({
        //     weight: this.props.weight,
        //     size: this.props.size,
        //     value:this.props.value
        // })
    }

    render(){
        if(this.props.curr_step != 1)
            return null
        const formItemLayout = {
            labelCol:{
                xs:{ span: 24 },
                sm: { span: 8 },
            },
            wrapperCol:{
                xs:{ span: 24 },
                sm: { span: 16},
            }
        };
        const { getFieldDecorator } = this.props.form;

        // const myValue = ({ form: { setFieldsValue } }) => {
        //     React.useEffect(() => {
        //         setFieldsValue({
        //             weight: this.props.weight,
        //             size: this.props.size,
        //             value:this.props.value
        //         });
        //     }, []);
        console.log(this.props)
        return (
            <div>
                <Form {...formItemLayout}
                      className='user-input'
                      onSubmit={this.handleSubmit}>
                    <Form.Item label="Please help us know more about your package:"/>

                    <Form.Item label="Length (inch)" hasFeedback>
                        {getFieldDecorator('length',
                            {rules: [{required: true, message: 'Please input the size of your package'}]}
                            )(<InputNumber min={0} max={1000} />)}
                    </Form.Item>

                    <Form.Item label="Width (inch)" hasFeedback>
                        {getFieldDecorator('width',
                            {rules: [{required: true, message: 'Please input the size of your package'}]}
                        )(<InputNumber min={0} max={1000} />)}
                    </Form.Item>

                    <Form.Item label="Height (inch)" hasFeedback>
                        {getFieldDecorator('height',
                            {rules: [{required: true, message: 'Please input the size of your package'}]}
                        )(<InputNumber min={0} max={1000} />)}
                    </Form.Item>

                    <Form.Item label="Weight (lbs)" hasFeedback>
                        {getFieldDecorator('weight',
                            {rules: [{required: true, message: 'Please input the weights of your package'}]}
                            )(<InputNumber min={0} max={1000} />)}
                    </Form.Item>

                    <Form.Item name="checkbox" label="Features">
                        <Checkbox.Group>
                            <Row>
                                <Col span={16}>
                                    <Checkbox
                                        value="Liquid"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Liquid
                                    </Checkbox>
                                </Col>
                                <Col span={16}>
                                    <Checkbox
                                        value="Fragile"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Fragile
                                    </Checkbox>
                                </Col>
                                <Col span={16}>
                                    <Checkbox
                                        value="Battery"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Battery
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label="Declared Value (USD)">
                        {getFieldDecorator('value')(<InputNumber min={0} max={10000} />)}
                        {/*<span className="ant-form-text"> USD</span>*/}
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }} className="arrow">
                        <Button type="primary" htmlType="submit" >
                            Next
                            <RightOutlined />
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const UserInput = Form.create({name:'user-input'})(UserInputForm);
export default UserInput;