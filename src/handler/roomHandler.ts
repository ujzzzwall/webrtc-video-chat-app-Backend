import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import IRoomparams from "../interfaces/IRoomParams";
//the below map stores for a roomwhat all peers have joined
//memory db looks like
/*
    =>{1 : {u1 ,u2,u3}, 2{u4,u5,u6}} kind of like this
    */
const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {
  //here we created SFU so that all client can connect to SFU's and can communicate easily with each other

  const createRoom = () => {
    const roomId = UUIDv4(); // this will be unique room id in which multiple connection will make exchange data
    socket.join(roomId); //It makes the current client (socket) join a specific room
    rooms[roomId] = []; //create a new entry for the room
    socket.emit("room-created", { roomId }); //we will emit an event from server side that socket connection has been added to the room , You can send messages to all users in that room only
    console.log("room created with room id :", roomId);
  };

  //this below function executes everytime a user(creator or joinee)joined a new room
  const joinedRoom = ({ roomId, peerId }: IRoomparams) => {
    if (rooms[roomId]) {
      //if the given room exists in the memory db
      console.log(
        "New user has joined the room ",
        roomId,
        "with peer Id as :",
        peerId,
      );

      //the moment new user joins  , add the peer to the key of room id
      rooms[roomId].push(peerId);
      console.log("added peer to room",rooms)
      //make the user join the socket room
      socket.join(roomId);

      //below event is for logging purpose
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    }
  };

  // when to call the above 2 function =>
  //we will call the above 2 function when client will emit event to create the room and join room

  socket.on("create-room", createRoom);
  socket.on("joined-room", joinedRoom);
};
export default roomHandler;
