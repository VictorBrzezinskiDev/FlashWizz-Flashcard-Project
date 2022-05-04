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

  //Controls whether flashcard is in "play" mode or in "select" mode
  const [isPlayMode, setIsPlayMode] = useState(false);

  //Controls which deck in the data.json file is selected
  const [deck, setDeck] = useState("radiation");

  //The flashcard number (selects from array of flashcards)
  const [flashcardNo, setFlashcardNo] = useState(0);

  //Controls player response, accepted value "true & false", null means waiting for player input
  const [isConfident, setIsConfident] = useState(null);

  //Controls whether animation effect should be triggered
  const [showEffect, setShowEffect] = useState(false);

  //Controls what content is to be displayed in the animation
  const [effectContent, setEffectContent] = useState("");

  //Handlers

  //Updates flashcard number to + 1, or boots back into menu if the next card does not exist.
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

  //Handles which animation to play based on whether player is confident or not.
  const animationHandler = () => {
    if (isConfident === true) {
      setEffectContent("👍");
      soundHandler();
    } else if (isConfident === false) {
      setEffectContent("");
    }
    setShowEffect(true);
  };

  //Handles audio queue which plays after a flashcard is correct.
  const soundHandler = () => {
    let sound = new Audio(correctAudio);
    sound.volume = 0.05;
    sound.play();
  };

  //Effects

  //Whenever isConfident updates, update flashcard and set player input to null.
  useEffect(() => {
    flashcardNoHandler();
    setIsConfident(null);
  }, [isConfident]);

  //Ensures that if you leave mid deck, when selecting new deck it starts from 0.
  useEffect(() => {
    setFlashcardNo(0);
  }, [isPlayMode]);

  //Triggers animationHandler whenever player input is accepted.
  useEffect(() => {
    animationHandler();
  }, [isConfident]);

  //Delay of 1000ms after animation starts before it ends.
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
