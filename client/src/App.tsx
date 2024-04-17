import { useState } from "react";
import "./App.css";
import PlayRandomMoveEngine from "./chess";
import Main from "./Main";
import SpeechToMove from "./speechToMove";
import MoveToSpeech from "./moveToSpeech";
import { Chess, Move, Piece, Square, Color, PieceSymbol } from "chess.js";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";

import "chess.js";
import useSpeechRecognition from "./useSpeechRecognition";
import { Socket, io } from "socket.io-client";

function App({ parentToChild, playerColor, playingBot }: { parentToChild: string[], playerColor: BoardOrientation, playingBot:boolean }) {
  //  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

  const game = new Chess();
  const possibleMoves = game.moves({ verbose: true });

  const [data, setData] = useState("");
  const [move, setMove] = useState(" ");
  const [opponentMove, setOpponentMove] = useState(possibleMoves[0]);
  const [toPlay, setToPlay] = useState(false);

  const childToParent = (childdata: string) => {
    setData(childdata);
  };

  const chessMoveTransfer = (childdata: string) => {
    setMove(childdata);
  };

  const opponentMoveTransfer = (childdata: Move, childdatatwo: boolean) => {
    setOpponentMove(childdata);
    setToPlay(childdatatwo);
  };

  //console.log(data + " " + move);

  return (
    <>
      <div className="center" content="width=device-width, initial-scale=1.0">
        <Main childToParent={childToParent} />
        <PlayRandomMoveEngine
          chessMove={move}
          opponentMoveTransfer={opponentMoveTransfer}
          room={parentToChild[0]}
          username={parentToChild[1]}
          playerColor = {playerColor}
          playingBot = {playingBot}
        />
        <SpeechToMove
          parentToChild={data}
          chessMoveTransfer={chessMoveTransfer}
        />
        <MoveToSpeech opponentMove={opponentMove!} play={toPlay} />
      </div>
    </>
  );
}

export default App;
