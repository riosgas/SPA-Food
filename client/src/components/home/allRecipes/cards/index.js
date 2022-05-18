import {React, useEffect} from "react";
import S from "./style.module.css"
import Card from "./card";

export default function Cards({filtered}) {
  // useEffect(() => {
  //   handler();
  // },[]);
  
  return (
    <div className={S.container}>
      {
        filtered.map(r => (
          <Card key={r.id} id={r.id} image={r.image} title={r.title} diets={r.diets}/>
        ))
      }
    </div>
  );
}