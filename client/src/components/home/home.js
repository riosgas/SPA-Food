import {React, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { getRecipes, getDiets } from '../../redux/actions';
import S from "./home.module.css"
import AllRecipes from "./allRecipes";
import Nav from "./navbar";

export default function Home() {

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets())
  },[]);

  return (
    <div className={S.container}>
      <Nav className={S.nav}/>
      <AllRecipes className={S.content}/>
    </div>
  );
}