import React, {Component} from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import backgroundImage from '../assets/images/SFBackground.jpeg';

const { Search } = Input;

const onSearch = value => console.log(value);
class WelcomePage extends Component {
    state = {
        size: 'large',
    };

    render(){
        const { size } = this.state;
        const backgroundStyle={
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
        return(
                <div className='welcome' style={backgroundStyle}>
                    <div className='box'>
                        <span className='search'>
                            <Search placeholder="Tracking Number" onSearch={onSearch} style={{ width: 400, margin: '0 10px', textAlign: 'center'}} size={ size } />
                        </span>
                        <Button className='shipButton'
                                icon={<SendOutlined />}
                                size={size}
                                >
                            Create a Shipment
                        </Button>
                    </div>
                </div>
            )
    }
}
export default WelcomePage;