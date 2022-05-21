import {React, useEffect} from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestions, getDiets } from '../../../redux/actions';
import S from "./style.module.css"
import Loader from "../loading";

export default function Suggestions() {
  let dispatch = useDispatch();
  let suggestions = useSelector((state) => state.suggestions);
  let diets = useSelector((state) => state.diets)
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getSuggestions());
    //dispatch(getDiets())
  },[]);
  let toDetails = (id) => {
    navigate(`/recipe/${id}`)
  }

  const SuggestionCards = ({recipes}) =>{
    return(
      <div className={S.contSuggCards}>
        {
          recipes.map((e,i)=>(
            <div key={i} id={e.i} className={S.suggCard} onClick={()=>toDetails(e.id)}>
              <img src={e.image}/>
              <p>{e.title}</p>
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
            <li key={i} name={e.name} style={{color:'white',backgroundColor:e.color}} className={S.dietCard}>
              <h1>{e.text}</h1>
            </li>
          ))
        }
      </ul>
    )
  }
  return (
    diets.length <1 && suggestions.length <1 ? <Loader className={S.loader}/> :
      <div className={S.container}>
        <div className={S.title}>Suggestions:  {suggestions[0].diet} {suggestions[0].meal}s</div>
        <SuggestionCards recipes={suggestions}/>
        <div className={S.title}>Recipes by diet</div>
        <DietCards diets={diets}/>
      </div>
  );
}