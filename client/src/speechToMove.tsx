import useSpeechRecognition from "./useSpeechRecognition";
//import { Square } from "react-chessboard/dist/chessboard/types";
import { SQUARES, Square } from "chess.js";
import PlayRandomMoveEngine from "./chess";
import React from "react";
import Main from "./Main";

export default function SpeechToMove({
  parentToChild,
  chessMoveTransfer,
}: {
  parentToChild: string;
  chessMoveTransfer: Function;
}) {
  let piecesMap = new Map();

  let squareMap = new Map();

  piecesMap.set("king", "K");
  piecesMap.set("queen", "Q");
  piecesMap.set("rook", "R");
  piecesMap.set("work", "R");
  piecesMap.set("brook", "R");
  piecesMap.set("bishop", "B");
  piecesMap.set("knight", "N");
  piecesMap.set("night", "N");
  piecesMap.set("horse", "N");
  piecesMap.set("a", "a");
  piecesMap.set("b", "b");
  piecesMap.set("c", "c");
  piecesMap.set("d", "d");
  piecesMap.set("did", "d");
  piecesMap.set("e", "e");
  piecesMap.set("he", "e");
  piecesMap.set("ez", "e");
  piecesMap.set("f", "f");
  piecesMap.set("g", "g");
  piecesMap.set("h", "h");
  piecesMap.set("each", "h");

  piecesMap.set("queenside", "O-");

  squareMap.set("88", "a8");
  squareMap.set("before", "b4");
  squareMap.set("bb8", "b8");
  //squareMap.set("three", "3");
  squareMap.set("asics", "a6");
  squareMap.set("a three", "a3");
  squareMap.set("283", "a3");
  squareMap.set("2a3", "a3");


  squareMap.set("castle", "O-O");

  let temp = parentToChild;
  temp = temp.replaceAll(".", "");
  temp = temp.replaceAll(",", "");

  let piece: string = "";
  let square: string = "";

  let keys = Array.from(squareMap.keys());
  console.log(keys)
  //let move = (piece + square) as string;
  console.log(temp)
  keys.forEach((element) => {
    if (temp.toLowerCase().includes(element)){
      temp = temp.toLowerCase().replace(element,squareMap.get(element))
    }
  })
  console.log(temp)
  let words = temp.split(" ");
  words.forEach((element) => {
    if (squareMap.has(element.toLowerCase())){
      square = squareMap.get(element.toLowerCase());
    }
    if (piecesMap.has(element.toLowerCase())) {
      //console.log(element);
      piece = piecesMap.get(element.toLowerCase());
    }
    if (SQUARES.includes(element.toLowerCase() as Square)) {
      //console.log(element);

      square = element.toLowerCase();
    }
  });

  if(piece === "" && square.includes("8")){
    square += "Q"
  }
  let move = (piece + square) as string;


  //console.log(move);

  return (
    <div>
      {parentToChild }
      {chessMoveTransfer(move)}
    </div>
  );
}
