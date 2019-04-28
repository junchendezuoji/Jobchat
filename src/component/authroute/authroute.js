//获取用户信息并用于简单跳转
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from  '../../redux/user.redux'

@withRouter
@connect (
    null,
    {loadData}
)
export default class AuthRoute extends React.Component {
    componentDidMount() {
        const isLogin = ['/login','/register'];
        const pathname = this.props.location.pathname;
        //如果已经是登录或者注册页面，就不用后续操作
        if(isLogin.indexOf(pathname) > -1) {
            return null;
        }
        //获取用户信息
        axios.get('/user/info').then((res,req) => {
            if (res.status = 200) {
                if(res.data.code == 0) {
                    //有登录信息
                    this.props.loadData(res.data.data)
                }else {
                    this.props.history.push('/login')
                }
            }
        })
    }

    render() {
        return null;
    }
}