import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../redux/actions';
import S from "./home.module.css"
import AllRecipes from "./allRecipes";
import Nav from "../navbar";

export default function Home() {
  let details = useSelector(state => state.details)
  let dispatch = useDispatch();

  useEffect(() => {
    !details && dispatch(getDiets())
  },[]);

  return (
    <div className={S.container}>
      <Nav className={S.nav}/>
      <AllRecipes className={S.content}/>
    </div>
  );
}