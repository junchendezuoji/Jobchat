import axios from 'axios'
import { getRedirectPath } from '../util'
import Login from '../container/login/login';
import { userInfo } from 'os';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const Login_SUCCESS = 'Login_SUCCESS'
const ERROR_MEG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo : '',//跳转到哪个页面
    isAuth : false, //用户是否登录
    msg : '',
    user : '',
    type: ''
}
//reducer
export function user(state = initState,action) {
    switch (action.type) {
        case REGISTER_SUCCESS :
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case Login_SUCCESS :
        return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case ERROR_MEG:
            return {...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload}
        default:
            return state
    }
}

function loginSuccess(data) {
    return {type:Login_SUCCESS,payload:data}
}
function registerSuccess(data) {
    return {type:REGISTER_SUCCESS, payload:data}
}

function errorMsg(msg) {
    return {type:ERROR_MEG, msg:msg}
}

export function loadData (userInfo) {
    return {type:LOAD_DATA,payload:userInfo}
}

export function login ({user,password}) {
    if(!user || !password) {
        return errorMsg('请输入用户名或者密码')
    }
    return dispatch => {
        axios.post('/user/login',{user,password}).then(
            (res,req) => {
                if(res.status == 200 && res.data.code == 0) {
                    dispatch(loginSuccess(res.data.data))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function register ({user,password,repeatpassword,type}) {
    if(!user || !password) {
        return errorMsg('请输入用户名或密码')
    }
    if(password !== repeatpassword) {
        return errorMsg('前后密码不一致')
    }
    return dispatch => {
        axios.post('/user/register',{user,password,type}).then(
            (res,req) => {
                if(res.status == 200 && res.data.code == 0) {
                    dispatch(registerSuccess({user,password,type}))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}