import React, { useState } from "react";
// -- Media & Styling
import "./styles/Navbar.css";
import burger from "./images/burger.svg";
import logo from "./images/logo.svg";

function Navbar() {
  const [navActive, setNavActive] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
        <h1>FlashWizz</h1>
      </div>

      <div
        className={`nav-links ${navActive ? "responsive-nav-active" : null}`}
      >
        <a href="">Home</a>
        <a href="https://github.com/VictorBrzezinskiDev/FlashWizz-Flashcard-Project">
          About
        </a>
      </div>

      <div className="call-to-action">
        <a href="https://github.com/victorbrzezinskidev">Contact Me</a>
      </div>

      <div
        onClick={() => {
          setNavActive(!navActive);
        }}
        className="burger"
      >
        <img src={burger} alt="" />
      </div>
    </nav>
  );
}

export default Navbar;
