import { useState } from "react";
import "./App.css";
import PlayRandomMoveEngine from "./chess";
import Main from "./Main";
import SpeechToMove from "./speechToMove";
import MoveToSpeech from "./moveToSpeech";
import { Chess, Move, Piece, Square, Color, PieceSymbol} from "chess.js";
import "chess.js";
import useSpeechRecognition from "./useSpeechRecognition";


function App() {


  const game = new Chess();
  const possibleMoves = game.moves({ verbose: true });




  const [data, setData] = useState("");
  const [move, setMove] = useState("");
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
        />
        <SpeechToMove
          parentToChild={data}
          chessMoveTransfer={chessMoveTransfer}
        />
        <MoveToSpeech opponentMove={opponentMove} play = {toPlay}/>
      </div>
    </>
  );
}

export default App;
