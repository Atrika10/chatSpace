const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));



app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

expressServer.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})

//socket
const io = require('socket.io')(expressServer)

io.on('connection', (socket)=>{
    console.log('connected');

    socket.on('message',(msg)=>{
        // console.log(msg);
        // console.log(msg.user);

        socket.broadcast.emit('receieve', msg);
    })


})