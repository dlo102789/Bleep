const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const http = require('http')
const util = require('util')
const PORT = 5000
const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
})

const writeFileContent = util.promisify(fs.writeFile)
const readFileContent = util.promisify(fs.readFile)

app.use(express.static(path.resolve(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

io.on('connection', socket => {
  socket.on('sendMessage', (message) => {
    socket.emit('message', message)
  })
})

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})



