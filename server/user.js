const express = require('express')
const utils = require('utility')
const model = require('./model')
const Router = express.Router()
const User = model.getModel('user')
const _filter = {'password':0,'__v':0}

//测试用户模型
Router.get('/list',function(req,res) {
    //User.remove({},function(e,d){})//清楚所有数据
    User.find({},function(err,doc) {
        return res.json(doc)
    })
})
//发送登录请求
Router.post('/login',function(req,res) {
    const {user,password} = req.body;
    User.findOne({user,password:md5Pwd(password)},_filter,function(err,doc) {
        if(!doc) {
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
//发送注册请求
Router.post('/register',function(req,res) {
    const {user,password,type} = req.body;
    User.findOne({user},function(err,doc) {
        if(doc) {
            return res.json({code:1,msg:'已有该用户名'})
        }

        const userModel = new User({user,type,password:md5Pwd(password)})
        userModel.save(function(err,doc) {
            if(err) {
                return res.json({code:1,msg:'后端出错'})
            }
            const {user,type,_id} = doc
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
        
    })
})

Router.get('/info',function(req,res) {
    const {userid} = req.cookies
    if(!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc) {
        if(err) {
            return res.json({code:1,msg:'后端出错'})
        }else {
            return res.json({code:0,data:doc})
        }
    })
})

function md5Pwd(password) {
    const salt = 'Job_chat_230!@#$';
    return utils.md5(utils.md5(password+salt));
}

module.exports = Router; 