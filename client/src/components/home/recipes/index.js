import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../../redux/actions';
import S from "./style.module.css"
import Cards from "./cards";
import Pags from "./pags";
import Loader from "../loading";

//import ejemplo from "../../../../../api/src/routes/suggest.json";

export default function AllRecipes() {
  let [currentPage, setCurrentPage] = useState(1);
  // let [loading, setLoading] = useState(true);
  let dispatch = useDispatch();
  //let loading = useSelector((state) => state.loading);
  let recipes = useSelector((state) => state.home.recipes);
  //let diets = useSelector((state) => state.diets)

  // const handlerLoading = () => {
  //   loading ? setLoading(false) : setLoading(true)
  // }
  useEffect(()=>{
    dispatch(getRecipes());
  },[])
  
  const filteredRecipes = () =>{
    return recipes.slice((currentPage-1)*9,((currentPage-1)*9)+9)
  }
  function pageChanger(e){
    setCurrentPage(e);
  }
  return (
    <div className={S.container}>
      
        <div className={S.query}>all recipes</div>
        {recipes.length > 0 ? <Cards filtered={filteredRecipes()} /> : <Loader className={S.loader}/>}
        <Pags className={S.pages} recipesNumber={recipes.length} currentPage={currentPage} handler={pageChanger}/>

    </div>
  );
}