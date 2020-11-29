import React, {Component} from 'react';
import {Form, Select, InputNumber, Checkbox, Row, Col, Button} from 'antd';
import {RightOutlined} from '@ant-design/icons';

const { Option } = Select;

class UserInputForm extends Component{


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.handleChange(values)
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
                sm: { span: 11 },
            },
            wrapperCol:{
                xs:{ span: 24 },
                sm: { span: 13},
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

                    <Form.Item label="Size(Length)">
                        {getFieldDecorator('length')(<InputNumber min={0} max={1000} />)}
                        <span className="ant-form-text"> INCH</span>
                    </Form.Item>

                    <Form.Item label="Size(Width)">
                        {getFieldDecorator('width')(<InputNumber min={0} max={1000} />)}
                        <span className="ant-form-text"> INCH</span>
                    </Form.Item>

                    <Form.Item label="Size(Height)">
                        {getFieldDecorator('height')(<InputNumber min={0} max={1000} />)}
                        <span className="ant-form-text"> INCH</span>
                    </Form.Item>

                    <Form.Item label="Weight">
                        {getFieldDecorator('weight')(<InputNumber min={0} max={1000} />)}
                        <span className="ant-form-text"> LBS</span>
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
                        <span className="ant-form-text"> USD</span>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
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