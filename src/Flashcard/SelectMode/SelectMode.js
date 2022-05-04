//Imports
import React, { useContext } from "react";
import { playModeContext, deckContext } from "../Flashcard.js";
// -- Media & Styling
import "./styles/SelectMode.css";
import data from "../data.json";
import DownArrow from "./images/DownArrow.svg";
import PlayButton from "./images/PlayButton.svg";

function SelectMode() {
  //States
  const [isPlayMode, setIsPlayMode] = useContext(playModeContext);
  const [deck, setDeck] = useContext(deckContext);

  return (
    <div className={`SelectMode ${isPlayMode ? "Hide" : true}`}>
      <h1>
        Select A Deck <img className="DownArrow" src={DownArrow} alt="" />
      </h1>

      {/* Maps over each deck in data.json for selection */}
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
            <img className="PlayButton" src={PlayButton} alt="" /> Play Deck
          </button>
        </div>
      ))}
    </div>
  );
}

export default SelectMode;
