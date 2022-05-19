import React from "react";
import S from "./style.module.css"

export default function Card({id, image, title, diets}) {
  return (
    <div className={S.container} id={id}>
      <img src={image} alt={title} className={S.img}/>
      <div className={S.title}>
        <p>{title}</p>
      </div>
      <ul className={S.diets}>
        {
          diets && diets.map((e,i)=>(<li key={i} className={S.diet} style={{width:"minmax(auto, 480px)"}}>{e || 'nada'}</li>)) ||'nada'
        }
      </ul>
      {/* <div className={S.diets}>{diets}</div> */}
    </div>
  );
}