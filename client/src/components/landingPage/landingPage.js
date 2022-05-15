import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css"

export default function LandingPage() {
  let stateDark = false;

  let modo = (value) => stateDark ? style[value+'D'] : style[value]

  return (
    <div className={modo('container')}>
      <h1 className={modo('title')}>Cooking!</h1>
      <Link to='/home'>
        <button>Come on!</button>
      </Link>
    </div>
  );
}