import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem,TextareaItem,Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux'


@connect(
    state => state.user,
    {update}
)
export default class PublisherInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            desc:'',
            company:'',
            money:''
        }
    }

    onChange(key,val) {
        this.setState({[key]:val})
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                    {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> :null}
                    <NavBar mode="dark">发布者信息完善页</NavBar>
                    <AvatarSelector selectAvatar = {(imgname) => {this.setState({avatar:imgname})}}/>
                    <InputItem onChange = {(v) => this.onChange('title',v)}>发布职位</InputItem>
                    <InputItem onChange = {(v) => this.onChange('company',v)}>公司名称</InputItem>
                    <InputItem onChange = {(v) => this.onChange('money',v)}>薪资范围</InputItem>
                    <TextareaItem onChange = {(v) => this.onChange('desc',v)} rows = {3} autoHeight title='职位要求' />
                    <Button type = 'primary' style = {{marginTop:20}} onClick = {() => {this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}