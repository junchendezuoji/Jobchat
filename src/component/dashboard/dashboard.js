import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'

function Publisher() {
    return <h1>发布者首页</h1>
}
function Hunter() {
    return <h1>求职者首页</h1>
}
function Msg() {
    return <h1>消息列表</h1>
}
function User() {
    return <h1>个人中心</h1>
}
@connect(
    state => state,
    {}
)

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const pathname = this.props.location.pathname
        const user = this.props.user
        const navList = [
            {
                path: '/publisher',
                text: '求职者',
                icon: 'publisher',
                title: '求职者列表',
                component: Publisher,
                hide: user.type == 'hunter'
            },
            {
                path: '/hunter',
                text: '发布者',
                icon: 'hunter',
                title: '发布者列表',
                component: Hunter,
                hide: user.type == 'publisher'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我的',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]

        return (
            <div>
                <NavBar mode='dark'>{navList.find(v => v.path == pathname).title}</NavBar>
                <NavLinkBar data = {navList}></NavLinkBar>
            </div>
        )
    }
}