import "./App.css";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Chat from "./Chat";
import { ClientToServerEvents, ServerToClientEvents } from "./Context";
import { Server } from "http";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3001"
);

function ChatRoom() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      // socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const sendMessage = async () => {

    socket.emit("send_message", currentMessage);

  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
        console.log(data);
    });
  }, [socket]);


  return (
    <div className="App">
      <input
        value={currentMessage}
        placeholder="balloons"
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyUp={(event) => {
            event.key === "Enter" && sendMessage();
        }}
      />
    </div>
  );
}

export default ChatRoom;
