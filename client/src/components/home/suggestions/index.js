import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestions, getDiets } from '../../../redux/actions';
import S from "./style.module.css"
import Loader from "../loading";

export default function Suggestions() {
  let dispatch = useDispatch();
  let suggestions = useSelector((state) => state.suggestions);
  let diets = useSelector((state) => state.diets)

  useEffect(() => {
    dispatch(getSuggestions());
    dispatch(getDiets())
  },[]);
  
  const SuggestionCards = ({recipes}) =>{
    return(
      <div className={S.contSuggCards}>
        {
          recipes.map((e,i)=>(
            <div key={i} id={e.i} className={S.suggCard}>
              <img src={e.image}/>
              <div>{e.title}</div>
            </div>
          ))
        }
      </div>
    )
  }
  const DietCards = ({diets}) =>{
    return(
      <ul className={S.contDietsCards}>
        {
          diets.map((e,i)=>(
            <li key={i} name={e.name} style={{color:e.color}} className={S.dietCard}>{e.text}</li>
          ))
        }
      </ul>
    )
  }
  return (
    diets.length <1 && suggestions.length <1 ? <Loader className={S.loader}/> :
      <div className={S.container}>
        <div className={S.title}>{suggestions[0].diet} {suggestions[0].meal}s suggestions</div>
        <SuggestionCards recipes={suggestions}/>
        <div className={S.title}>Recipes for diets</div>
        <DietCards diets={diets}/>
      </div>
  );
}