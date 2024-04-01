import { Chess, Move } from "chess.js";
import useSpeechRecognition from "./useSpeechRecognition";



let oldMove:Move;
 export default function MoveToSpeech ({ opponentMove, play }: { opponentMove: Move, play: boolean }) {
  console.log(opponentMove);
  let move:string = "";

  if (opponentMove != null && play)
  {
    algebraicToEnglish();
  }
  function algebraicToEnglish(){
    let pieceName = "";
    switch(opponentMove.piece)
    {
        case 'p': pieceName = "pawn"
        break;
        case 'n': pieceName = "knight"
        break;
        case 'k': pieceName = "king"
        break;
        case 'q': pieceName = "queen"
        break;
        case 'b': pieceName = "bishop"
        break;
        case 'r': pieceName = "rook"
        break;
    }
    if(opponentMove != oldMove){
        move = pieceName + " to " + opponentMove.to
    }
  }

  const utterance = new SpeechSynthesisUtterance(move);
  if (play){
    speechSynthesis.speak(utterance);
  }

  oldMove = opponentMove;
  console.log(oldMove);

  return <div></div>;
};


