import { useState } from "react";
import { Chess, Move, Piece, Color } from "chess.js";
import { Chessboard } from "react-chessboard";
import {
  Square,
  BoardOrientation,
} from "react-chessboard/dist/chessboard/types";
import useSocketIO from "./useSocketIO";
import App from "./App";
import "./App.css";
//import useSpeechSynthesis from "./useSpeechSynthesis";

export default function PlayRandomMoveEngine({
  chessMove,
  opponentMoveTransfer,
  room,
  username,
  playerColor,
  playingBot,
}: {
  chessMove: any;
  opponentMoveTransfer: Function;
  room: string;
  username: string;
  playerColor: BoardOrientation;
  playingBot: boolean;
}) {
  const {
    socket,
    setRecievedMessage,
    receivedMessage,
    sendMessage,
    joinRoom,
    currentMessage,
    setCurrentMessage,
    messageData,
    moveData,
    sendMove,
    setCurrentMove,
    currentMove,
  } = useSocketIO();

  const [game, setGame] = useState(new Chess());
  const [state, setState] = useState(game.fen());
  let opponentMove: Move;
  let beforeFirstMove: boolean = false;
  let playColor: Color;

  if (playerColor === "white") {
    playColor = "w";
  } else {
    playColor = "b";
  }

  function makeAMove(move: any, playerTurn: boolean) {
    if (move != PlayRandomMoveEngine.staticProperty) {
      PlayRandomMoveEngine.staticProperty = move;
      try {
        if (game.turn() !== playColor && playerTurn) {
          return;
        }
        if (game.turn() === playColor && !playerTurn) {
          return;
        }

        beforeFirstMove = true;
        let gameCopy = Object.assign(game);
        const result = gameCopy.move(move);
        setGame(gameCopy);
        setState(gameCopy.fen());
        if (playingBot && playerTurn) {
          setTimeout(makeRandomMove, 500);
          return;
        }
        let history = game.history({ verbose: true });
        if (!playerTurn) {
          opponentMove = move;
          transferOpponentMove();
          if (playingBot) {
            return;
          }
        } else {
          setCurrentMove(history[history.length - 1]);
          moveData.move = history[history.length - 1];
          moveData.room = room;
          moveData.author = username;
          sendMove(moveData);
        }
        beforeFirstMove = false;
      } catch (error) {
        chessMove = "jlk";
        console.log("invalid move 2.0" + move);
        isValid(move);
      }
    }
  }

  makeAMove(chessMove, true);
  // notationMove(chessMove);
  makeAMove(receivedMessage.move, false);

  // function notationMove(move: string) {
  //   try {
  //     if (chessMove != PlayRandomMoveEngine.staticProperty) {
  //       const gameCopy = Object.assign(game);
  //       const result = gameCopy.move(chessMove);
  //       if (
  //         result.color === playColor &&
  //         playerTurn //||
  //         // (tempResult.color === playerColor.charAt(0) && !playerTurn)
  //       ) {
  //         return;
  //       }
  //     }
  //   } catch (error) {}
  // }

  // function notationMove(move: string) {
  //   try {
  //     if (chessMove != PlayRandomMoveEngine.staticProperty) {
  //       const gameCopy = Object.assign(game);
  //       const result = gameCopy.move(chessMove);
  //       setGame(gameCopy);
  //       setState(gameCopy.fen());
  //       ////////////////////////////////////////////////////////////// setTimeout(makeRandomMove, 500);
  //       //PlayRandomMoveEngine.staticProperty = chessMove;
  //     }
  //   } catch (error) {
  //     // if (!game.pgn().includes(move)) {
  //     //   const utterance = new SpeechSynthesisUtterance("What did you say?");
  //     //   speechSynthesis.speak(utterance);
  //     // }
  //     console.log("invalid move");
  //     isValid(chessMove);

  //     // PlayRandomMoveEngine.staticProperty = chessMove;
  //   }
  // }
  if (
    playerColor === "black" &&
    playingBot &&
    game.fen() === "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  ) {
    setTimeout(makeRandomMove, 500);
  }

  function makeRandomMove() {
    const possibleMoves = game.moves({ verbose: true });
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex], false);
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    chessMove = "ldjfsld";
    try {
      if (game.get(sourceSquare).color === playColor) {
        chessMove = makeAMove(
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
      }
    } catch (error) {
      console.log("illegal move");
      return false;
    }
    if (playingBot) {
      setTimeout(makeRandomMove, 200);
    }
    ///////////////////////////////////////////////////////////////////////////////  setTimeout(makeRandomMove, 200);
    return true;
  }

  function isValid(move: string) {
    if (move === "O-O") {
      move = "O-O-O";
      //notationMove(chessMove);
      makeAMove(move, true);
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
        boardOrientation={playerColor}
        //    boardOrientation="black"
        onPieceDrop={onDrop}
      />
    </div>
  );

  function transferOpponentMove() {
    //  sendMessage(opponentMove);
    return <div>{opponentMoveTransfer(opponentMove, beforeFirstMove)}</div>;
  }
}
PlayRandomMoveEngine.staticProperty = "buffalo wild wings";
