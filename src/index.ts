import express from 'express';
import http from 'http';
import serverConfig from './config/server-config'
import { Server } from 'socket.io';
import cors from 'cors';
import roomHandler from './handler/roomHandler';



const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin : "*",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("new user connected");

    roomHandler(socket)//pass the socket connection to roomHandler for room creation and joining
    
    socket.on("disconnect",()=>{
        console.log("User disconnected")
    })
})

server.listen( serverConfig.PORT ,()=>{
    console.log(`server is up at PORT : ${serverConfig.PORT}`)
});