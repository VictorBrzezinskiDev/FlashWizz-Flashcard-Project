//Imports
import React, { useContext } from "react";
import { playModeContext, deckContext } from "../Flashcard.js";
// -- Media & Styling
import "./styles/SelectMode.css";
import data from "../data.json";

function SelectMode() {
  //States
  const [isPlayMode, setIsPlayMode] = useContext(playModeContext);
  const [deck, setDeck] = useContext(deckContext);

  return (
    <div className={`SelectMode ${isPlayMode ? "Hide" : true}`}>
      {Object.keys(data).map((deck, i) => (
        <div className="SelectWidget" key={deck}>
          <span>
            {data[deck].deckName} - {data[deck].flashcards.length} Cards
          </span>
          <button
            onClick={() => {
              setDeck(deck);
              setIsPlayMode(true);
            }}
          >
            Play Deck
          </button>
        </div>
      ))}
    </div>
  );
}

export default SelectMode;
