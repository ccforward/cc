'use strict'

const PORT = 8888
const io = require('socket.io').listen(PORT)

const players = {} // sid和socket对象映射关系 id:socket
const relations = {} // 每个玩家和对手的对应关系  id1:id2   id2:id1

io.sockets.on('connection', socket => {
    const sid = socket.id

    players[sid] = socket

    // 其他用户链接主机
    socket.on('link', d => {
        const link = JSON.parse(d)
        relations[link.target] = link.sid // sid 主动发起连接的主机
        relations[link.sid] = link.target // target 被连接主机
        players[socket.id].emit('linkOK', 'linkOK')
        players[link.target].emit('linked', 'linked')
    })

    // 落子后双方同步棋子信息
    socket.on('tick', d => {
        const data = JSON.parse(d)
        // 查询对手socket 并返回信息
        players[relations[socket.id]].emit('tick-back', d)
    });

    socket.on('disconnect', ()=>{
        // TODO 断开连接
    })
});