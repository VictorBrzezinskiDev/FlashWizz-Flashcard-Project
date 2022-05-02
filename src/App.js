import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";
import correctAudio from "./correct.mp3";

import Flashcard from "./Flashcard/Flashcard";
import Navbar from "./Navbar/Navbar";

export const confidenceContext = createContext();
export const animationContext = createContext();

const App = () => {
  const [isConfident, setIsConfident] = useState(null);
  const [flashcardNo, setFlashcardNo] = useState(0);
  const [showEffect, setShowEffect] = useState(false);
  const [effectContent, setEffectContent] = useState("");
  const [deck, setDeck] = useState("radiation");

  const playSound = () => {
    let sound = new Audio(correctAudio);
    sound.volume = 0.1;
    sound.play();
  };
  const flashcardNoHandler = () => {
    if (isConfident === true || isConfident === false) {
      if (data[deck].flashcards[flashcardNo + 1]) {
        setFlashcardNo(flashcardNo + 1);
      } else {
        setFlashcardNo(0);
      }
    }
  };
  const animationHandler = () => {
    if (isConfident === true) {
      setEffectContent("👍");
      playSound();
    } else if (isConfident === false) {
      setEffectContent("");
    }
    setShowEffect(true);
  };

  useEffect(() => {
    //Plays Animation,
    animationHandler();
    //Decides next flashcard,
    flashcardNoHandler();
    //Clears player's input
    setIsConfident(null);
  }, [isConfident]);

  useEffect(() => {
    if (showEffect === true) {
      setTimeout(() => {
        setShowEffect(false);
      }, 1000);
    }
  }, [showEffect]);

  return (
    <div className="App">
      <animationContext.Provider value={[showEffect, setShowEffect]}>
        <confidenceContext.Provider value={[isConfident, setIsConfident]}>
          <Flashcard
            deckName={data[deck].deckName}
            // Ensures flashcard count does not display as 0
            cardNo={
              data[deck].flashcards.indexOf(
                data[deck].flashcards[flashcardNo]
              ) + 1
            }
            cardAmount={data[deck].flashcards.length}
            question={data[deck].flashcards[flashcardNo].question}
            answer={data[deck].flashcards[flashcardNo].answer}
          />
        </confidenceContext.Provider>
      </animationContext.Provider>
      {/* Sets "Show" class if animation triggered */}
      <div className={`Effect ${showEffect ? "Show" : null}`}>
        {effectContent}
      </div>
      <Navbar />
    </div>
  );
};

export default App;
