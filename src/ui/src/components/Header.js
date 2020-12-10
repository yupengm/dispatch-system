import {Menu, Dropdown, Button} from "antd";
import {DownOutlined} from '@ant-design/icons';
import React, {Component} from 'react';
// import {DownOutlined} from '@ant-design/icons';
import logo from '../assets/images/logo_propeller.svg';

class Header extends Component {
    state = {
        islogin: false
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a href="" target="_blank">My Order</a>
                </Menu.Item>

                <Menu.Item>
                    <a href="" target="_blank">Address Book</a>
                </Menu.Item>

                <Menu.Item>
                    <a href="" target="_blank">Sign Out</a>
                </Menu.Item>
            </Menu>
        )   ;

        return (
            <header>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="App-user">
                        <Button className="App-login">Login</Button>
                        &nbsp; or &nbsp;
                        <Button className="App-create">Create account</Button>
                    </div>
                    <div className="App-user-login">
                        <p className="Greetings">Hi, username</p>
                        &nbsp;
                        <Dropdown overlay={menu}>
                            <a className="User-dropdown" onClick={e => e.preventDefault()}>
                                <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>

                </div>


            </header>
        );
    }
}

export default Header;