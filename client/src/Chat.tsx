import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io, { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./Context";
import "./App.css";
import useSocketIO from "./useSocketIO";

function Chat({username, room, isHuman}:{username: string,
  room: string, isHuman: boolean}) {
// socket: Socket<ServerToClientEvents, ClientToServerEvents>,

  //const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);

  const {
    socket,
    setRecievedMessage,
    receivedMessage,
    //sendMessage,
    joinRoom,
    setRoom,
    setUsername,
    currentMessage,
    setCurrentMessage,
    //messageData,
    moveData,
    setCurrentMove,
    currentMove,
    sendMove,
  } = useSocketIO();

  const sendMessage = async () => {
    if (currentMessage !== "") {
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

      await socket.emit("send_message", messageData);
      setMessageList((list: any) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.isHuman)
      setMessageList((list: any) => [...list, data]);
    });
  }, [socket]);

  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map(
              (messageData: {
                author:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined;
                message:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                time:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => {
                return (
                  <div
                    className="message"
                    id={username === messageData.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageData.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageData.time}</p>
                        <p id="author">{messageData.author}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyUp={(event) => {
              event.key === "Enter" && sendMessage();
              
            }}
          />
          <button
            onClick={(event) => {
              sendMessage();
            }}
          >
            &#9658;
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
