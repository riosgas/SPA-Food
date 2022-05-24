import {React} from "react";
import { useSelector } from 'react-redux';
import S from "./style.module.css"
import Nav from "../navbar";
import Suggestions from "./suggestions";
import Recipes from "./recipes";

export default function Home() {
  let {suggest} = useSelector((state) => state.home);
  
  return (
    !suggest ? 
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