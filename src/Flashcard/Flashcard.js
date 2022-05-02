import React, { useState, useContext, useEffect } from "react";
import "./Flashcard.css";
import flipIcon from "./eva_flip-fill.svg";
import { confidenceContext, animationContext } from "../App.js";

const Flashcard = ({ deckName, cardNo, question, answer, cardAmount }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isConfident, setIsConfident] = useContext(confidenceContext);
  const [showEffect, setShowEffect] = useContext(animationContext);

  //Function to reduce length of question for preview span on answer side.
  const summarize = (str) => {
    let strSummary = str.substring(0, 50).trim();
    if (str.length > 50) {
      strSummary += "...";
    }
    return strSummary;
  };

  //Ensures flashcard is on the question side when a new one is picked.
  useEffect(() => {
    setIsRevealed(false);
  }, [isConfident]);

  return (
    <div className={`Flashcard ${showEffect ? "Swap" : null}`}>
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
          src={flipIcon}
          onClick={() => {
            setIsRevealed(!isRevealed);
          }}
          alt=""
        />
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
};

export default Flashcard;
