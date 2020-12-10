import React, {Component} from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import backgroundImage from '../assets/images/SFBackground.jpeg';
import {Link, useHistory} from "react-router-dom";
// import axios from 'axios';

const { Search } = Input;
const onSearch = value => console.log(value);
class WelcomePage extends Component {
    constructor() {
        super();
        this.state = {
//            trackingNum: null,
//            trackingInfo: null,//this is the information passed on to tracking component
            size: 'large',
//            isLoading: false,
        }
    }
    handleRedirect = ()=>{
        this.props.history.push("/package")
    }

    track = () => {
        this.props.history.push("/track")
    }
    // showTracking = trackingNum => {
    //     this.setState({
    //         isLoading: true,
    //         trackingNum : trackingNum
    //     })
    //     //fetch data
    //     this.fetchTracking(trackingNum);
    // }
    // fetchTracking = trackingNum => {
    //     //get tracking number
    //     const { trackingNum } = trackingNum;
    //     //send it back to database
    //     const url ="database"
    //     this.setState({
    //         isLoading: true
    //     })
    //     axios.get(url)
    //         .then(response => {
    //             console.log(response);
    //             this.setState({
    //                 trackingInfo: response.data,
    //                 isLoading: false,
    //             })
    //         })
    //         .catch(error => {
    //             console.log('err in fetch tracking number ->', error.message);
    //             this.setState({
    //                 isLoading: false
    //             })
    //         })
    // }
    render(){
        const { size } = this.state;
        const backgroundStyle={
            width: "100%",
            height: "780px",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }

        return(
            <div className='welcome' style={backgroundStyle}>
                <div className='box'>
                    <div className='search'>
                        <Link to={{
                            pathname:'/package',
                            state:{
                                steps : 6,
                                orderNum: 69
                        }}}>
                        <Search placeholder="Search Tracking Number" onSearch={this.track} style={{ width: 400, margin: '0 10px', textAlign: 'center'}} size={ size } enterButton/>
                        </Link>
                    </div>
                    <br/>
                    <div></div>
                    <br/>
                    <Button className='shipButton'
                            type='primary'
                            icon={<SendOutlined />}
                            size={ size }
                            onClick={this.handleRedirect}
                    >
                        Click to Create a Shipment
                    </Button>
                </div>
            </div>
        )
    }
}
export default WelcomePage;