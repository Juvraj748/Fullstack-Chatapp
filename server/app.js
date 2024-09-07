const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const messagesRouter = require("./routes/messagesRoutes");
const socket = require("socket.io")

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/messages", messagesRouter);

const port = process.env.PORT || 8080;
const mongoUrl = process.env.MONGO_URI

mongoose.connect(mongoUrl).then(()=>{
    console.log("Succesfully connected to MongoDB")
}).catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

const server = app.listen(port, () => {
    console.log("Server running on port",port);
});

const io = socket(server, {
    cors:{
        origin: "http://localhost:3000",
        credentials: true
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    // socket.on("disconnect", (userId) => {
    //     console.log(`User ${userId} disconnected!`);
    //     onlineUsers.delete(userId);
    // })
    socket.on("add-user", (userId)=>{
        console.log("User Connected", userId)
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-message", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("message-receive", data.message);
        }
    })
})