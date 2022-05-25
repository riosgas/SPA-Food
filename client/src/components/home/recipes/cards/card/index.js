import React from "react";
import { useNavigate } from "react-router";
import S from "./style.module.css"

export default function Card({id, image, title, diets}) {
  let navigate = useNavigate();

  let toDetails = () => {
    navigate(`/recipe/${id}`)
  }
  return (
    <div className={S.container} onClick={toDetails}>
      <img src={image} alt={title} className={S.img}/>
      <div className={S.title}>
        <p>{title}</p>
      </div>
      {
      // id.length > 15 ?
      // <ul className={S.diets}>
      //   {
      //     diets && diets.map((e,i)=>(<li key={i} className={S.diet} style={{width:"minmax(auto, 480px)"}}>{e.name || 'nada'}</li>)) ||'nada'
      //   }
      // </ul>
      // :
      <ul className={S.diets}>
        {
          diets && diets.map((e,i)=>(<li key={i} className={S.diet} style={{width:"minmax(auto, 480px)"}}>{e || 'nada'}</li>)) ||'nada'
        }
      </ul>
      }
      {/* <div className={S.diets}>{diets}</div> */}
    </div>
  );
}