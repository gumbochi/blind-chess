import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./Context";
import { Move } from "chess.js";


const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
 // "http://localhost:3001"
 "http://blindchess.fun"
);

function useSocketIO() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  //const [showChat, setShowChat] = useState(false);
  const [currentMove, setCurrentMove] = useState<Move>();
  const [currentMessage, setCurrentMessage] = useState<any>("");
  const [receivedMessage, setRecievedMessage] = useState<any>("");
  const [isHuman, setIsHuman] = useState(true);


  const messageData = {
    isHuman: isHuman,
    room: room,
    author: username,
    message: currentMessage,
    time:
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes(),
  };

  const moveData = {
    room: room,
    author: username,
    move: currentMove,
    time:
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes(),
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
     // setShowChat(true);
    }
  };

  const sendMessage = async (message: typeof messageData) => {

    socket.emit("send_message", message);

  };

  const sendMove = async (move: typeof moveData) => {

    socket.emit("send_move", move);

  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      //  console.log(data);
        setRecievedMessage(data);
    });
  }, [socket]);

  return {
    socket,
    setRecievedMessage,
    receivedMessage,
    sendMessage,
    joinRoom,
    room,
    setRoom,
    username,
    setUsername,
    currentMessage,
    setCurrentMessage,
    messageData,
    moveData,
    setCurrentMove,
    currentMove,
    sendMove,
    isHuman
  };
}

export default useSocketIO;


