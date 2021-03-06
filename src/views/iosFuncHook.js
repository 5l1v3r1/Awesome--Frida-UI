import React from 'react';
import ReactDOM from 'react-dom';
import {Menu, Button, Icon, Input, Table} from 'antd';
import '../index.css';
import 'antd/dist/antd.css'
import axios from 'axios';
import Qs from 'qs';
import Info from '../data/dataList';
import Footer from '../data/processData';


class  IosFuncHook  extends React.Component{
    state = {
        current: '1',
        processname: null,
        classname: null,
        funcname: null,
        enlogcode: null,
        lelogcode: null,
        hkresp: null

    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    onIosFuncHook() {

        axios({
            url: 'http://127.0.0.1:8000/iosFuncHook/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
                processname: this.state.processname,
                funcname: this.state.funcname,
                classname: this.state.classname,
                enlogcode: this.state.enlogcode,
                lelogcode: this.state.lelogcode
            }


        })
            .then(data => this.setState({
                hkresp: data.data
            }))
            .catch(console.log("发送请求失败"));
    };


    render(){
        return(
            <div key='/advancedJavaHook'  >
                            <Input addonBefore="ProcessName:" value={this.state.processname} onChange={e => this.setState({
                                processname: e.target.value
                            })} style={{ width: 600 }} size={"large"} />
                            <Input addonBefore="ClassName:" value={this.state.classname} onChange={e => this.setState({
                                classname: e.target.value
                            })} style={{ width: 600 }} size={"large"} />
                            <Input addonBefore="FuncName:" value={this.state.funcname} onChange={e => this.setState({
                                funcname: e.target.value
                            })} style={{ width: 600 }} size={"large"} />

                            <Input addonBefore="EnLogCode:" value={this.state.enlogcode} onChange={e => this.setState({
                                enlogcode: e.target.value
                            })} style={{ width: 600 }} size={"large"} />
                            <Input.Search enterButton="Submit" addonBefore="LeLogCode:" value={this.state.lelogcode} onChange={e => this.setState({
                                lelogcode: e.target.value
                            })} style={{ width: 600 }} size={"large"} onSearch={this.onIosFuncHook.bind(this)} />
                            <div>
                                <div>{this.state.hkresp}</div>
                                <Info/>
                               
                            </div>
                            <div>
                                <Footer/>
                            </div>
                        </div>

        );
    }
}

export default IosFuncHook;