import useSpeechRecognition from "./useSpeechRecognition";
import SpeechToMove from "./speechToMove";
import { useState } from "react";
import App from "./App";
import "./App.css";


const Main = ({childToParent}:{childToParent: Function}) => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
    // handleKeyDown,
    // handleKeyUp,
    //  parentToChild,
  } = useSpeechRecognition();

  //console.log(text);




  return (
    <>
      <div>
        {hasRecognitionSupport ? (
          <>
            <div>
              {/* <input onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => handleKeyUp}/> */}
              <button onClick={startListening}>Press me and say a chess move</button>
            </div>
            {isListening ? (
              <div>Your browser is currently listening</div>
            ) : null}
            {/* {text} */ childToParent(text)}
          </>
        ) : (
          <h1>Your browser has no speech recognition support</h1>
        )}
      </div>
      {/* <SpeechToMove parentToChild={text}/> */}
    </>
  );
};

export default Main;
