import axios from 'axios'
import { getRedirectPath } from '../util'
const AUTH_SUCCESS = 'AUTH_SUCCESS' //验证
const ERROR_MEG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo : '',//跳转到哪个页面
    msg : '',
    user : '',
    type: ''
}
//reducer
export function user(state = initState,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MEG:
            return {...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload}
        default:
            return state
    }
}


function authSuccess (obj) {
    const {password,...data} = obj
    return {type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg) {
    return {type:ERROR_MEG, msg:msg}
}

export function loadData (userInfo) {
    return {type:LOAD_DATA,payload:userInfo}
}

//完善信息
export function update(data) {
    return dispatch => {
        axios.post('/user/update',data).then(
            (res,req) => {
                if(res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess(res.data.data))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        ) 
    }
}

//登录信息
export function login ({user,password}) {
    if(!user || !password) {
        return errorMsg('请输入用户名或者密码')
    }
    return dispatch => {
        axios.post('/user/login',{user,password}).then(
            (res,req) => {
                if(res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess(res.data.data))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}

//注册信息
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
                    dispatch(authSuccess({user,password,type}))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}