import { Socket } from "socket.io";
import {v4 as UUIDv4 } from 'uuid';

const roomHandler = (socket : Socket)=>{

    //here we created SFU so that all client can connect to SFU's and can communicate easily with each other

    const createRoom = ()=>{

        const roomId = UUIDv4(); // this will be unique room id in which multiple connection will make exchange data 
        socket.join(roomId);//It makes the current client (socket) join a specific room
        socket.emit("room-created",{roomId})//we will emit an event from server side that socket connection has been added to the room , You can send messages to all users in that room only
        console.log("room created with room id :",roomId)
    }
    const joinedRoom=({roomId}:{roomId : string})=>{
        console.log("New user has joined the room ", roomId)
    }

    // when to call the above 2 function =>
    //we will call the above 2 function when client will emit event to create the room and join room 

    socket.on("create-room",createRoom)
    socket.on("joined-room",joinedRoom)
}
export default roomHandler;