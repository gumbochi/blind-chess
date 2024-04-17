import React, { useEffect, useState } from "react";
import "./App.css";
import useSocketIO from "./useSocketIO";
import App from "./App";
import { TIMEOUT } from "dns";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import Chat from "./Chat";

function MainMenu() {
  const [showChat, setShowChat] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  let [numberOfPlayersReady, setNumberOfPlayersReady] = useState<number>(0);
  const [notAlreadyClicked, setNotAlreadyClicked] = useState(true);
  const [playerColor, setPlayerColor] = useState<BoardOrientation>("white");
  const {
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
    isHuman,
  } = useSocketIO();
  // let playerColor: BoardOrientation = "white";
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      if (data.message === "updated all clients") {
        setNumberOfPlayers(numberOfPlayers + 1);
      }

      if (data.message === "player joined room") {
        setNumberOfPlayers(numberOfPlayers + 1);
        data.message = "updated all clients";
        sendMessage(data);
      }
      if (data.author === "players ready") {
        // numberOfPlayersReady ++;
        setNumberOfPlayersReady(data.message);
        console.log(numberOfPlayersReady);
        // startGame();
      }
      if (data.author === "hghjk;ljkhghfjgj player color") {
        numberOfPlayersReady++;
        if (data.message === "white") {
          setPlayerColor("black");
        } else {
          setPlayerColor("white");
        }
        data.author = "80fdsfaef3g?";
        sendMessage(data);
      }

      if (data.author === "80fdsfaef3g?") {
        startGame(data.message);
      }
    });
  }, [socket]);

  function joinGame() {
    messageData.isHuman = false;
    messageData.message = "player joined room";
    setShowChat(true);
    joinRoom();
    sendMessage(messageData);
  }

  function playerReady(goOn: boolean) {
    if (goOn) {
      setNumberOfPlayersReady(numberOfPlayersReady + 1);
      messageData.author = "players ready";
      messageData.isHuman = false;
      let temp: number = numberOfPlayersReady + 1;
      messageData.message = temp;
      sendMessage(messageData);
      setNotAlreadyClicked(false);
      console.log("done" + numberOfPlayersReady);
      startGame(null);
    }
  }

  function randomColor() {
    let temp: BoardOrientation = Math.random() * 2 >= 1 ? "white" : "black";
    return temp;
  }

  function startGame(data: any) {
    if (numberOfPlayersReady === 1) {
      setShowGame(true);
      if (data !== null) {
        let temp: BoardOrientation = "white";
        if (data === "white") {
          temp = "black";
        } else {
          temp = "white";
        }
        setPlayerColor(temp);
        messageData.message = temp;
      } else {
        let temp: BoardOrientation = randomColor();
        setPlayerColor(temp);
        messageData.message = temp;
      }
      //  if (showChat) {
      messageData.author = "hghjk;ljkhghfjgj player color";
      messageData.isHuman = false;
      sendMessage(messageData);
      //   }
    }
  }

  return (
    <>
      {!showGame ? (
        <div className="App">
          <div className="joinChatContainer">
            {!showChat ? (
              <>
                <h3>Join/Create Game</h3>
                <input
                  placeholder="username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <input
                  placeholder="game code"
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
                />
                <button onClick={joinGame}>Enter</button>
                <h3>Or</h3>
                <div>
                  <button
                    onClick={() => {
                      setShowGame(true);
                      setPlayerColor(randomColor());
                    }}
                  >
                    Play Computer
                  </button>
                </div>
              </>
            ) : (
              <div className="JoinChatContainer">
                <h3>Game Code: {room}</h3>
                <Chat username={username} room={room} isHuman={isHuman} />
                <button
                  onClick={(event) => {
                    playerReady(notAlreadyClicked);
                  }}
                >
                  Start Game {numberOfPlayersReady}/{numberOfPlayers}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <App
            parentToChild={[room, username]}
            playerColor={playerColor}
            playingBot={!showChat}
          />
          {/*<Chat username={username} room={room} isHuman={isHuman} />*/}
        </>
      )}
    </>
  );
}

export default MainMenu;
