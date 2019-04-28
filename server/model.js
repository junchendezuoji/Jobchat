//链接mongdb 并且使用jobchat-normal集合
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/jobchat-normal' 

mongoose.connect(DB_URL)

const models = {
    user: {
        'user': {'type':String, 'require':true},
        'password': {'type':String, 'require':true},
        'type': {'type':String, 'require':true},
        //头像
        'avatar': {'type':String},
        //个人简介或者职位介绍
        'desc': {'type':String},
        //职位名
        'title': {'type':String},
        //如果你是发布者，额外的属性
        'company': {'type':String},
        'money': {'type':String}
    },
    chat: {

    }
}

//批量建造模型里面的字段
for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}