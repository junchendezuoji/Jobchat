const express =  require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser') 
const userRouter = require('./user')

const app = express()
//io 绑定 express
const server = require('http').Server(app)
const io = require('socket.io')(server)

//socket.io事件
io.on('connection',function(socket){
	//console.log('user login')
	//接受信息
	socket.on('sendmsg',function(data){
		console.log(data)
		//后端接受之后再发送发送全局
		io.emit('recvmsg',data)
	})
})

app.use(cookieParser());
app.use(bodyParser.json())//解析post
app.use('/user',userRouter);
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})
