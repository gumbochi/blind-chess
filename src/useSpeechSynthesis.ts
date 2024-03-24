import { useEffect, useState } from "react";

// const useSpeechSynthesis = () => {
  

//   const utterance = new SpeechSynthesisUtterance("Hello World");
//   speechSynthesis.speak(utterance);
// };

// export default useSpeechSynthesis;

// const synth = window.speechSynthesis;

// const inputForm = document.querySelector("form");
// const inputTxt = document.querySelector(".txt");
// let voiceSelect = document.querySelector("select");

// const pitch = document.querySelector("#pitch");
// const pitchValue = document.querySelector(".pitch-value");
// const rate = document.querySelector("#rate");
// const rateValue = document.querySelector(".rate-value");

// let voices: SpeechSynthesisVoice[] = [];

// function populateVoiceList() {
//   voices = synth.getVoices();

//   for (const voice of voices) {
//     const option = document.createElement("option");
//     option.textContent = `${voice.name} (${voice.lang})`;

//     if (voice.default) {
//       option.textContent += " — DEFAULT";
//     }

//     option.setAttribute("data-lang", voice.lang);
//     option.setAttribute("data-name", voice.name);
//     voiceSelect!.appendChild(option);
//   }
// }

// populateVoiceList();
// if (speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = populateVoiceList;
// }

// inputForm!.onsubmit = (event) => {
//     event.preventDefault();

//     const utterThis = new SpeechSynthesisUtterance(inputTxt!.value);
//     const selectedOption = voiceSelect!.selectedOptions[0].getAttribute('data-name');
//     for (const voice of voices) {
//       if (voice.name === selectedOption) {
//         utterThis.voice = voice;
//       }
//     }
//     utterThis.pitch = pitch!.value;
//     utterThis.rate = rate!.value;
//     synth.speak(utterThis);
// }

// utterThis.onpause = (event) => {
//     const char = event.utterance.text.charAt(event.charIndex);
//     console.log(
//       `Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`,
//     );
//   };
