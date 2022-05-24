import {React, useEffect} from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestions, getRecipes, changePage} from '../../../redux/actions';
import S from "./style.module.css"
import Loader from "../loading";

export default function Suggestions() {
  let dispatch = useDispatch();
  let {suggestions, diets} = useSelector((state) => state);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getSuggestions());
    //dispatch(getDiets())
  },[]);

  const toDetails = (id) => {
    navigate(`/recipe/${id}`);
  }
  const searchDiet = (diet) => {
    dispatch(getRecipes('',diet));
    dispatch(changePage(false));
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
            <li key={i} name={e.name} style={{backgroundColor:e.color}} className={S.dietCard} onClick={()=>searchDiet(e.name)}>
              <h1>{e.text}</h1>
            </li>
          ))
        }
      </ul>
    )
  }
  return (
    suggestions.length === 0 ? <Loader className={S.loader}/> : (
      diets.length !== 0 &&
      <div className={S.container}>
        <div className={S.title}>Suggestions:  {suggestions[0].diet} {suggestions[0].meal}s</div>
        <SuggestionCards recipes={suggestions}/>
        <div className={S.title}>Recipes by diet</div>
        <DietCards diets={diets}/>
      </div>
    )
  );
}