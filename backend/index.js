const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const users = require("./routes/users");
const auth = require("./routes/auth").router;
const socketio = require('socket.io')
const cors = require("cors");
const http = require('http');

dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(cors());


app.use('/api/auth', auth)
app.use(require('./routes/auth').authenticateToken)
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use('/api/user', users)


app.use('/', (req, res) =>{
    res.send('server is running!!!!!')
})

const PORT = process.env.PORT || 5000
corsOptions={
  cors: true,
  origins:["http://localhost:3000"],
}

const server = http.createServer(app);
const io = socketio(server, corsOptions);

let userArr = []

const addUser = (userId, socketId) => {
  !userArr.some(user => user._id === userId) && 
      userArr.push({userId, socketId})
}

const removeUser = (socketId) => {
  userArr = userArr.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
  // console.log(userArr)

  return userArr.find(user => user.userId === userId)
}

io.on('connect', (socket) => {
  console.log('a user has connected')

  socket.on('addUser', (userId) => {
      // console.log(userId, 'has connected')
      userId && addUser(userId, socket.id)
      io.emit('getUsers', userArr)
      // console.log(userArr)
  })

  socket.on('sendMessage', ({senderId, receiverId, text}) => {
    const user = getUser(receiverId)
    user && io.to(user.socketId).emit('getMessage', {senderId, text})
  })

  socket.on('disconnect', () =>{
    console.log('a user has disconnected')
    removeUser(socket.id)
    io.emit('getUsers', userArr)
  })
})

server.listen(PORT, () => {
  console.log("Backend server is running!");
});