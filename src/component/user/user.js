import React from 'react'
import { connect } from 'react-redux'
import browsercookie from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import { Result,List,WhiteSpace,Button,Modal } from 'antd-mobile'
import { logoutSubmit } from '../../redux/user.redux'

@connect(
    state => state.user,
    {logoutSubmit}
)
export default class User extends React.Component {
    constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
	}
    
	logout() {
        const alert = Modal.alert
        alert('注销','确认退出登录吗',[
            {text: '取消',onPress:() => console.log('取消')},
            {text: '确认',onPress:() => {
                browsercookie.erase('userid')
                window.location.href = window.location.href
                //this.props.logoutSubmit()
            }}
        ])
    }

    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ? (
            <div>
                <Result 
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt='' />}
                    title={props.user}
                    message={props.type == 'publisher' ? props.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item>
                        {props.title}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
				<Button type='primary' onClick={this.logout}>退出登录</Button>
            </div>
        ) : null
    }
}