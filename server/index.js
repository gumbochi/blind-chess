const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

app.use(cors());
app.set("trust proxy", 1);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
        //socket.broadcast.emit("receive_message", data);
    });

    socket.on("send_move", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
        //socket.broadcast.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});



server.listen(process.env.PORT || 3001, () => {
    console.log("Server listening on port " + (process.env.PORT || "3001"));
});