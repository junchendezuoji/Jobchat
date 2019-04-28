import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List,InputItem,Radio,WingBlank,WhiteSpace,Button } from 'antd-mobile' 
import Logo from '../../component/logo/logo'
import {register} from '../../redux/user.redux'

@connect(
    state => state.user,
    {register}
)
export default class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            repeatpassword: '',
            type : "hunter" //求职者
        } 
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(key,value) {
        this.setState({
            [key] : value
        })
    }

    handleRegister() {
        this.props.register(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null }
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className ='error-msg'>{this.props.msg}</p> : null}
                    <InputItem onChange = {v => this.handleChange('user',v)}>用户名</InputItem>
                    <InputItem type = 'password'  onChange = {v => this.handleChange('password',v)}>密码</InputItem>
                    <InputItem type = 'password'  onChange = {v => this.handleChange('repeatpassword',v)}>确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem checked={this.state.type=='hunter'} onChange={()=>this.handleChange('type','hunter')}>求职者</RadioItem>
					<RadioItem checked={this.state.type=='publisher'} onChange={()=>this.handleChange('type','publisher')}>发布者</RadioItem>
                    <WhiteSpace />
                    <Button type="primary" onClick = {this.handleRegister}>注册</Button> 
                </List>
            </div>
        )
    }

}