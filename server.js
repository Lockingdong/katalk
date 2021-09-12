const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))

const redis = require("redis");
const client = redis.createClient()

client.on("error", function(error) {
    console.error(error);
});

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3003, () => {
    console.log('listening on http://localhost:3003')
})

io.on('connection', socket => {


});