import { useState } from "react";
import { Chess, Move, Piece } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Square } from "react-chessboard/dist/chessboard/types";
import App from "./App";
import "./App.css";
//import useSpeechSynthesis from "./useSpeechSynthesis";

export default function PlayRandomMoveEngine({
  chessMove,
  opponentMoveTransfer,
}: {
  chessMove: string;
  opponentMoveTransfer: Function;
}) {
  const [game, setGame] = useState(new Chess());
  const [state, setState] = useState(game.fen());
  let opponentMove: Move;
  let beforeFirstMove: boolean = false;

  function makeAMove(move: Move, playerTurn: boolean) {
    beforeFirstMove = true;
    const gameCopy = Object.assign(game);
    const result = gameCopy.move(move);
    setGame(gameCopy);
    setState(gameCopy.fen());
    // console.log(game.fen());
    //  console.log(game.ascii());
    if (!playerTurn) {
      opponentMove = move;
      transferOpponentMove();
    }
    beforeFirstMove = false;
  }

  notationMove(chessMove);

  function notationMove(move: string) {
    try {
      if (chessMove != PlayRandomMoveEngine.staticProperty) {
        const gameCopy = Object.assign(game);
        const result = gameCopy.move(chessMove);
        setGame(gameCopy);
        setState(gameCopy.fen());
        setTimeout(makeRandomMove, 500);
        //PlayRandomMoveEngine.staticProperty = chessMove;
      }
    } catch (error) {
      // if (!game.pgn().includes(move)) {
      //   const utterance = new SpeechSynthesisUtterance("What did you say?");
      //   speechSynthesis.speak(utterance);
      // }
      console.log("invalid move");
      isValid(chessMove);

      // PlayRandomMoveEngine.staticProperty = chessMove;
    }
  }

  function makeRandomMove() {
    const possibleMoves = game.moves({ verbose: true });
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex], false);
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    let move;
    try {
      move = makeAMove(
        {
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
          color: game.get(sourceSquare).color,
          piece: game.get(sourceSquare).type,
          flags: "",
          san: "",
          lan: "",
          before: "",
          after: "",
        },
        true
      );
    } catch (error) {
      console.log("illegal move");
      return false;
    }
    setTimeout(makeRandomMove, 200);
    return true;
  }

  function isValid(move: string) {
    if (move === "O-O") {
      chessMove = "O-O-O";
      notationMove(chessMove);
    }
  }
  let size = window.innerHeight;

  if (size > window.innerWidth) {
    size = window.innerWidth;
  }

  return (
    <div>
      <Chessboard
        boardWidth={size - 100}
        position={game.fen()}
        onPieceDrop={onDrop}
      />
    </div>
  );

  function transferOpponentMove() {
    return <div>{opponentMoveTransfer(opponentMove, beforeFirstMove)}</div>;
  }
}
PlayRandomMoveEngine.staticProperty = "";
