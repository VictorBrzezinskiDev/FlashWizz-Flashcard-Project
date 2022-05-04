//Imports
import React, { useState, useContext, useEffect, createContext } from "react";
// -- Media & Styling
import "./styles/Flashcard.css";
import data from "./data.json";
import correctAudio from "./correct.mp3";
// -- Components
import PlayMode from "./PlayMode/PlayMode";
import SelectMode from "./SelectMode/SelectMode";

//Exports
export const playModeContext = createContext();
export const deckContext = createContext();
export const confidenceContext = createContext();

const Flashcard = () => {
  //States
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [deck, setDeck] = useState("radiation");
  const [flashcardNo, setFlashcardNo] = useState(0);
  const [isConfident, setIsConfident] = useState(null);
  const [showEffect, setShowEffect] = useState(false);
  const [effectContent, setEffectContent] = useState("");

  const flashcardNoHandler = () => {
    if (isConfident === true || isConfident === false) {
      if (data[deck].flashcards[flashcardNo + 1]) {
        setFlashcardNo(flashcardNo + 1);
      } else {
        setFlashcardNo(0);
        setIsPlayMode(false);
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
    flashcardNoHandler();
    setIsConfident(null);
  }, [isConfident]);

  useEffect(() => {
    setFlashcardNo(0);
  }, [isPlayMode]);

  const playSound = () => {
    let sound = new Audio(correctAudio);
    sound.volume = 0.1;
    sound.play();
  };

  useEffect(() => {
    animationHandler();
  }, [isConfident]);

  useEffect(() => {
    if (showEffect === true) {
      setTimeout(() => {
        setShowEffect(false);
      }, 1000);
    }
  }, [showEffect]);

  return (
    <div className={`Flashcard ${showEffect ? "Swap" : null}`}>
      <confidenceContext.Provider value={[isConfident, setIsConfident]}>
        <playModeContext.Provider value={[isPlayMode, setIsPlayMode]}>
          <PlayMode
            deckName={data[deck].deckName}
            cardNo={
              data[deck].flashcards.indexOf(
                data[deck].flashcards[flashcardNo]
              ) + 1
            }
            cardAmount={data[deck].flashcards.length}
            question={data[deck].flashcards[flashcardNo].question}
            answer={data[deck].flashcards[flashcardNo].answer}
          />

          <deckContext.Provider value={[deck, setDeck]}>
            <SelectMode />
          </deckContext.Provider>
        </playModeContext.Provider>
      </confidenceContext.Provider>
      <div className={`Effect ${showEffect ? "Show" : null}`}>
        {effectContent}
      </div>
    </div>
  );
};

export default Flashcard;
