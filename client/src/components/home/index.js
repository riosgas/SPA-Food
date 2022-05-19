import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets } from '../../redux/actions';
import S from "./style.module.css"
import Nav from "../navbar";
import Suggestions from "./suggestions";
import Recipes from "./recipes";

export default function Home() {
  let suggest = useSelector(state => state.home.suggest)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets())
  },[]);

  return (
    suggest ? 
      <div className={S.container}>
        <Nav className={S.nav}/>
        <Recipes className={S.content}/>
      </div>
    :
      <div className={S.container}>
        <Nav className={S.nav}/>
        <Suggestions className={S.content}/>
      </div>
  );
}