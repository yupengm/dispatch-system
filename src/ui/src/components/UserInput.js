import React, {Component} from 'react';
import {Form, Select, InputNumber, Checkbox, Row, Col, Button,} from 'antd';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {RightOutlined} from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

class UserInputForm extends Component{


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //axios
                this.props.handleChange(values)


                console.log(values)

                let data = {
                    size: values.height * values.length * values.width,
                    weight:values.weight,
                    feature:[],
                    declared_value: values.value
                }

                axios({
                    method: 'post',
                    url: '/Dispatch/input',
                    data: data
                }).then((response) => {
                    console.log(response.data)
                    this.props.getListOfStations(response.data, data.weight, data.size)
                    this.props.getListOfStationsFromLeftSideForm(response.data)
                    this.props.setSteps()
                }, (error) => {

                    console.log("MY ERROR IS: "+error.response.status +"oh yeah");
                    if(error.response.status == 401){
                        this.setState({

                        })
                    } else if (error.response.status == 400){
                        // this.state.isError = "User does not exist"
                        this.setState({

                        })
                    }
                });
        }
    })
    }


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
        if(this.props.curr_step != 2)
            return null
        // const formItemLayout = {
        //     labelCol:{
        //         xs:{ span: 24 },
        //         sm: { span: 8 },
        //     },
        //     wrapperCol:{
        //         xs:{ span: 24 },
        //         sm: { span: 16},
        //     }
        // };
        const { getFieldDecorator } = this.props.form;

        // const myValue = ({ form: { setFieldsValue } }) => {
        //     React.useEffect(() => {
        //         setFieldsValue({
        //             weight: this.props.weight,
        //             size: this.props.size,
        //             value:this.props.value
        //         });
        //     }, []);

        const formItemLayout = {labelCol: { span: 4 }, wrapperCol: { span: 14 }};
        return (
            <CSSTransitionGroup
                transitionName="location-cards"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}>

            <div>
                <Form
                      className='user-input'
                      onSubmit={this.handleSubmit} >

                    <Form.Item label="Please help us know more about your package:"/>


                    <Form.Item label="Length (inch)" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('length',
                            {rules: [{required: true, message: 'Please input the size of your package'}],
                            initialValue : this.props.length == 0?"":this.props.length}
                            )(<InputNumber min={0} max={1000} />)}
                    </Form.Item>

                    <Form.Item label="Width (inch)" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('width',
                            {rules: [{required: true, message: 'Please input the size of your package'}],
                                initialValue : this.props.width == 0?"":this.props.width}
                        )(<InputNumber min={0} max={1000} />)}
                    </Form.Item>

                    <Form.Item label="Height (inch)" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('height',
                            {rules: [{required: true, message: 'Please input the size of your package'}],
                                initialValue : this.props.height == 0?"":this.props.height}
                        )(<InputNumber min={0} max={1000} />)}
                    </Form.Item>

                    <Form.Item label="Weight (lbs)" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('weight',
                            {rules: [{required: true, message: 'Please input the weights of your package'}],
                                initialValue : this.props.weight == 0?"":this.props.weight}
                            )(<InputNumber min={0} max={1000} />)}

                    </Form.Item>

                    <Form.Item name="checkbox" label="Features" {...formItemLayout} >
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



                    {/*<Form.Item label="Please help us know more about your package:"/>*/}
                    {/*<Form.Item label="Size" hasFeedback initialvalue="his">*/}
                    {/*    {getFieldDecorator('size', {*/}
                    {/*        rules:[{required: true,*/}
                    {/*            message: 'Please select your package size !'}],*/}
                    {/*        // initialValue: this.props.size == "" ? "n/a" : this.props.size*/}
                    {/*    })(*/}
                    {/*        <Select placeholder= {this.props.size == ""? "Please select a package size" : this.props.size} >*/}
                    {/*            <Option value='Small 13" x 11" x 2"'>Small 13" x 11" x 2"</Option>*/}
                    {/*            <Option value='Medium 16" x 11" x 3"'>Small 16" x 11" x 3"</Option>*/}
                    {/*            <Option value='Large 18" x 13" x 3"'>Large 18" x 13" x 3"</Option>*/}
                    {/*            <Option value='Extra Large'>Extra Large</Option>*/}
                    {/*        </Select>,*/}
                    {/*    )}*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item label="Weight" hasFeedback>*/}
                    {/*    {getFieldDecorator('weight', {*/}
                    {/*        rules:[{required: true, message: 'Please select your package weight !'}],*/}
                    {/*    })(*/}
                    {/*        <Select placeholder={this.props.weight == ""? "Please select a package size" : this.props.weight} >*/}
                    {/*            <Option value='0 - 5 lbs'>0 - 5 lbs</Option>*/}
                    {/*            <Option value='5 - 10 lbs'>5 - 10 lbs</Option>*/}
                    {/*            <Option value='10 - 30 lbs'>1- - 30 lbs</Option>*/}
                    {/*            <Option value='> 30 lbs'> > 30 lbs </Option>*/}
                    {/*        </Select>,*/}
                    {/*    )}*/}
                    {/*</Form.Item>*/}

                    {/*<Form.Item name="checkbox" label="Features">*/}
                    {/*    <Checkbox.Group>*/}
                    {/*        <Row>*/}
                    {/*            <Col span={8}>*/}
                    {/*                <Checkbox*/}
                    {/*                    value="Liquid"*/}
                    {/*                    style={{*/}
                    {/*                        lineHeight: '32px',*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    Liquid*/}
                    {/*                </Checkbox>*/}
                    {/*            </Col>*/}
                    {/*            <Col span={8}>*/}
                    {/*                <Checkbox*/}
                    {/*                    value="Fragile"*/}
                    {/*                    style={{*/}
                    {/*                        lineHeight: '32px',*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    Fragile*/}
                    {/*                </Checkbox>*/}
                    {/*            </Col>*/}
                    {/*            <Col span={8}>*/}
                    {/*                <Checkbox*/}
                    {/*                    value="Battery"*/}
                    {/*                    style={{*/}
                    {/*                        lineHeight: '32px',*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    Battery*/}
                    {/*                </Checkbox>*/}
                    {/*            </Col>*/}
                    {/*            <Col span={8}>*/}
                    {/*                <Checkbox*/}
                    {/*                    value="Pharmacy"*/}
                    {/*                    style={{*/}
                    {/*                        lineHeight: '32px',*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    Pharmacy*/}
                    {/*                </Checkbox>*/}
                    {/*            </Col>*/}
                    {/*            <Col span={8}>*/}
                    {/*                <Checkbox*/}
                    {/*                    value="Grocery"*/}
                    {/*                    style={{*/}
                    {/*                        lineHeight: '32px',*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    Grocery*/}
                    {/*                </Checkbox>*/}
                    {/*            </Col>*/}
                    {/*            <Col span={8}>*/}
                    {/*                <Checkbox*/}
                    {/*                    value="Gift"*/}
                    {/*                    style={{*/}
                    {/*                        lineHeight: '32px',*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    Gift*/}
                    {/*                </Checkbox>*/}
                    {/*            </Col>*/}
                    {/*        </Row>*/}
                    {/*    </Checkbox.Group>*/}
                    {/*</Form.Item>*/}



                    <Form.Item label="Declared Value (USD)" {...formItemLayout} >
                        {getFieldDecorator('value')(<InputNumber min={0} max={10000} />)}
                        {/*<span className="ant-form-text"> USD</span>*/}
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }} className="arrow" {...formItemLayout} >
                        <div className="btn-container">
                            <Button type="primary" className="back-list-btn"
                                    onClick={this.props.goback}>
                                Back
                            </Button>

                            <Button type="primary" htmlType="submit" className="pay-list-btn">
                                Next
                                <RightOutlined />
                            </Button>
                        </div>

                    </Form.Item>
                </Form>
            </div>
            </CSSTransitionGroup>
        );
    }
}

const UserInput = Form.create({name:'user-input'})(UserInputForm);
export default UserInput;