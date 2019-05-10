import React from 'react'
import io from 'socket.io-client'
import { List,InputItem } from 'antd-mobile'

const socket = io('ws://localhost:9093')

export default class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '', //发送的信息
            msg: [] //用来存接受到的信息
        }
    }

    componentDidMount() {
        //接受全局的socket信息
        socket.on('recvmsg',(data) => {
            this.setState({
                msg: [...this.state.msg,data.text]
            })
        })
    }

    handleSubmit() {
        //发送信息并清空state
        socket.emit('sendmsg',{text:this.state.text})
        this.setState({text:''})
    }

    render() {
        return (
            <div>
                {this.state.msg.map(v => {
                    return <p key={v}>{v}</p>
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder = '请输入'
                            value = {this.state.text}
                            onChange = {v => {
                                this.setState({text:v})
                            }}
                            extra = {<span onClick = {() => this.handleSubmit()}>发送</span>}
                        >信息</InputItem>
                    </List>
                </div>
            </div>
        )
    }
}