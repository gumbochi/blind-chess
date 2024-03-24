import {useEffect, useState} from 'react'
import { setTextRange } from 'typescript';

let recognition: any = null;
if("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
}

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const SpeechGrammarList =
//   window.SpeechGrammarList || window.webkitSpeechGrammarList;
// const SpeechRecognitionEvent =
//   window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


//document.addEventListener("keyup", handleKeyUp);

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if(!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
     // console.log('onresult event: ', event)
      setText(event.results[0][0].transcript)
      recognition.stop();
      setIsListening(false);
      console.log("stopped");
    };
  },[]);

  //console.log(text);

const startListening = () => {
  setText("");
  setIsListening(true);
  try{
    recognition.start();
  }catch{

  }
}
const stopListening = () => {
  setIsListening(false);
  recognition.stop();
};
// const handleKeyDown = (e: any) => {
//   if(e.key === "Space"){
//     startListening();
//   }
// }
const handleKeyUp = (e: any) => {
  stopListening();
}
// const parentToChild = () => {
//  // setData("Knight to c3");
// }
//speechToMove(text);
const handleKeyPress = (event: { key: string; }) => {
  if(event.key === ' '){
    startListening();
    console.log("YOOOOO")
    document.removeEventListener("keydown", handleKeyPress);
  }
}
document.addEventListener("keydown", handleKeyPress);
// document.addEventListener("keyup", handleKeyUp);

return {
  text,
  isListening,
  stopListening,
  startListening,
  // handleKeyDown,
  // handleKeyUp,
  hasRecognitionSupport: !!recognition,
};
};


export default useSpeechRecognition;