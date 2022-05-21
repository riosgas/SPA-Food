import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../redux/actions';
import S from "./style.module.css"
import Recipes from "../home/recipes";
import Nav from "../navbar";

export default function Home() {
  let details = useSelector(state => state.details)
  let dispatch = useDispatch();

  useEffect(() => {
    !details && dispatch(getDetails())
  },[]);

  return (
    <div className={S.container}>
      <Nav className={S.nav}/>
      <Recipes className={S.content}/>
    </div>
  );
}