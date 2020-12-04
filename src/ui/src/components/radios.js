import React, {Component} from 'react';
import {List, Avatar, Radio} from 'antd';

class Radios extends Component {

    render() {
        const data = [
            {
                value:1,
                title: 'Ant Design Title 1',
            },
            {
                value:2,
                title: 'Ant Design Title 2',
            },
            {
                value:3,
                title: 'Ant Design Title 3',
            },
            {
                value:4,
                title: 'Ant Design Title 4',
            },
        ];

        return (
            <div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={
                    ()=>{
                        return(
                            <div>
                                Hi
                            </div>
                        )
                    }
                }
            />
            </div>
        );
    }
}

export default Radios;