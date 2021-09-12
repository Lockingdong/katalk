const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
})

app.set('view engine', 'ejs')

app.use(cors())
app.use(express.static('dist'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(3003, () => {
    console.log('listening on http://localhost:3003')
})

io.on('connection', socket => {

    
}) 