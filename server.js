const express = require('express')
const getGoogleTrends = require('./functions/GetGoogleTrends')
const app = express()
const server = require('http').Server(app)
const dotenv = require('dotenv').config()
const isProd = dotenv.parsed.APP_ENV === 'production'
const io = require('socket.io')(server, {
    cors: {
      origin: isProd ? '' : '*',
    }
})
const redis = require("redis");
const { promisifyAll } = require('bluebird');
promisifyAll(redis);

const cronJob = require('./functions/CronJob')
cronJob();

const Logger = require('./functions/Logger')

app.set('view engine', 'ejs')

app.use(express.static('dist'))
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res) => {

    res.render('index')
})

server.listen(3003, () => {
    console.log('listening on 3003')
})


io.on('connection', async socket => {

    // console.log(socket.handshake)
    socket.user_token = socket.handshake.query.user_token;

    socket.on('USER_RECONNECT_CHAT_ROOM', async (roomId, userToken) => {

        try {

            const client = await redis.createClient({host: dotenv.parsed.APP_REDIS_HOST});

            const rs = await client.lrangeAsync(roomId, 0, -1);

            await client.quitAsync();

            // console.log(rs)

            // todo 改成 redis
            if(rs.length !== 0) {
                socket.join(roomId);
                await io.in(roomId).emit('USER_RECONNECT_CHAT_ROOM')

                // todo redis
                await socket.emit('USER_SET_HIST_MSGS', rs)

                return;
            }

            const sockets = await io.fetchSockets();

            sockets.forEach(sk => {
                if(sk.user_token === userToken) {
                    io.to(sk.id).emit('USER_CLEAR_ROOM');
                }
            });

        } catch (error) {

            Logger.error('USER_RECONNECT_CHAT_ROOM ' + error.toString())
                
        }

    })

    socket.on('USER_RECONNECT_WAITING_ROOM', async () => {

        try {

            socket.join('WAITING_ROOM');
            await io.to(socket.id).emit('USER_RECONNECT_WAITING_ROOM');

        } catch (error) {

            Logger.error('USER_RECONNECT_WAITING_ROOM ' + error.toString())
                
        }

    })

    // 加入房間
    socket.on('USER_CLICK_JOIN_ROOM', async (userToken) => {

        try {
            
            await socket.join('WAITING_ROOM');

            const allSockets = await io.fetchSockets();

            allSockets.forEach(sk => {
                
                if(sk.user_token === userToken) {

                    // console.log(sk.user_token)

                    sk.join('WAITING_ROOM');
                }
            });  

            await io.in('WAITING_ROOM').emit('JOIN_WAITING_ROOM');

            const sockets = await io.in('WAITING_ROOM').fetchSockets();

            const uniqueUsers = [...new Set(sockets.map(item => item.user_token))];

            // console.log(uniqueUsers)

            if(uniqueUsers.length >= 2) {

                const userToken1 = uniqueUsers[0];
                const userToken2 = uniqueUsers[1];

                const roomId = userToken1 + ':' + userToken2 + ':' + Date.now();

                sockets.forEach(sk => {
                    if(sk.user_token === userToken1 || sk.user_token === userToken2) {
                        sk.join(roomId);
                        sk.leave('WAITING_ROOM');
                    }
                    
                });

                // 加入房間列表 
                await io.in(roomId).emit('JOIN_CHAT_ROOM_SUCCESS', roomId);

                await io.in(roomId).emit('USER_RECV_MSG', [0, '已建立連線，開始聊吧!']);

                // todo
                const client = await redis.createClient({host: dotenv.parsed.APP_REDIS_HOST});

                await client.rpushAsync(roomId, JSON.stringify([0, '已建立連線，開始聊吧!']));

                await client.expireAsync(roomId, 60 * 60 * 2);

                let trends = await getGoogleTrends(client);

                await client.quitAsync();

                await io.in(roomId).emit('USER_RECV_MSG', [0, `今晚，我想聊點`]);

                trends.forEach(async (el) => {
                    await io.in(roomId).emit('USER_RECV_MSG', [0, `聊點 <a href="https://www.google.com/search?q=${el}" target="_blank">${el}</a> 吧`]);
                })

            }

        } catch (error) {

            Logger.error('USER_CLICK_JOIN_ROOM ' + error.toString())
        }
        
    });

    // 用戶點擊離開
    socket.on('USER_CLICK_LEAVE_ROOM', async (roomId, userToken) => {

        try {

            const sockets = await io.in(roomId).fetchSockets();

            sockets.forEach(sk => {
                if(sk.user_token === userToken) {
                    sk.leave(roomId);
                    io.to(sk.id).emit('USER_CLEAR_ROOM');

                }
            })

            await io.in(roomId).emit('USER_RECV_MSG', [0, '對方已離開']);

            const client = await redis.createClient({host: dotenv.parsed.APP_REDIS_HOST});

            await client.rpushAsync(roomId, JSON.stringify([0, '對方已離開']));

            await client.quitAsync();

            // roomList[roomId].push([0, '對方已離開']);
        } catch (error) {

            Logger.error('USER_CLICK_LEAVE_ROOM ' + error.toString())

        }

    });

    // 用戶發送訊息
    socket.on('USER_SEND_MSG', async (roomId, userOrder, msg) => {

        // todo redis
        // roomList[roomId].push([userOrder, msg]);
        try {

            await socket.to(roomId).emit('USER_RECV_MSG', userOrder, msg);

            const client = await redis.createClient({host: dotenv.parsed.APP_REDIS_HOST});

            await client.rpushAsync(roomId, JSON.stringify([userOrder, msg]))

            await client.quitAsync()

        } catch (error) {

            Logger.error('USER_SEND_MSG ' + error.toString())
                
        }

    });

    socket.on('USER_IS_TYPING', async (roomId, bool) => {

        try {

            await socket.to(roomId).emit('OTHER_IS_TYPING', bool);
            
        } catch (error) {
            
            Logger.error('USER_IS_TYPING ' + error.toString())

        }
        
    });

    socket.on('disconnect', async () => {

        // const sockets = await io.in('WAITING_ROOM').fetchSockets();
        // console.log(sockets)

    });
    
}); 