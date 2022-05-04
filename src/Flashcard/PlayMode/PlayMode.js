import React, { useState, useContext, useEffect } from "react";
import flipIcon from "./images/eva_flip-fill.svg";
import ReturnIcon from "./images/return.svg";
import { confidenceContext } from "../Flashcard";
import "./styles/PlayMode.css";
import { playModeContext } from "../Flashcard";

function PlayMode({ deckName, cardNo, question, answer, cardAmount }) {
  //Controls whether the flashcard is in "reveal" mode, meaning if it is flipped to show answer
  const [isRevealed, setIsRevealed] = useState(false);

  const [isConfident, setIsConfident] = useContext(confidenceContext);
  const [isPlayMode, setIsPlayMode] = useContext(playModeContext);

  //Takes question and creates a 50 character "summary" to display on "revealed" side as to not take up much space
  const summarize = (str) => {
    let strSummary = str.substring(0, 50).trim();
    if (str.length > 50) {
      strSummary += "...";
    }
    return strSummary;
  };

  //Unreveal card when next card is selected
  useEffect(() => {
    setIsRevealed(false);
  }, [isConfident]);

  return (
    <div className={`PlayMode ${isPlayMode ? null : "Hide"}`}>
      <div className="Leader">
        <span>{deckName}</span>
        <span>
          Card: {cardNo}/{cardAmount}
        </span>
      </div>
      <div className="Content">
        <span className={isRevealed ? null : "Hide"}>
          {summarize(question)}
        </span>
        <p>{isRevealed ? answer : question}</p>
        <img
          className="Flip"
          src={flipIcon}
          onClick={() => {
            setIsRevealed(!isRevealed);
          }}
          alt=""
        />
        <div
          className="Return"
          onClick={() => {
            setIsRevealed(false);
            setIsPlayMode(false);
          }}
        >
          <img src={ReturnIcon} alt="" /> Return To Selection
        </div>
      </div>
      <div className="Input">
        <button
          onClick={() => {
            setIsRevealed(true);
          }}
          className={`Reveal ${isRevealed ? "Hide" : null}`}
        >
          Click To Reveal Answer
        </button>
        <button
          onClick={() => {
            setIsConfident(false);
          }}
          className={`Inconfident ${isRevealed ? null : "Hide"}`}
        >
          I Am Not Confident
        </button>
        <button
          onClick={() => {
            setIsConfident(true);
          }}
          className={`Confident ${isRevealed ? null : "Hide"}`}
        >
          I Am Confident
        </button>
      </div>
    </div>
  );
}

export default PlayMode;
