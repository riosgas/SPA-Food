import React from "react";
import { Link } from "react-router-dom";
import S from "./style.module.css"
import image1 from "../../images/1.webp";
import image2 from "../../images/2.webp";
import image3 from "../../images/3.webp";

export default function LandingPage() {
  let stateDark = true;

  let modo = (value) => stateDark ? S[value+'D'] : S[value]

  return (
    <div className={S.container}>
      <img src={image1} className={S.img1}/>
      <img src={image2} className={S.img2}/>
      <img src={image3} className={S.img3}/>
      <div className={S.intro}>
        <h1>Welcome!</h1>
        <Link className={S.link} to='/home'><button className={S.enter}>Go!</button></Link>
      </div>
    </div>
  );
}