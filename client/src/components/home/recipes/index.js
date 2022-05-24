import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, setFiltered, setCurrentPage } from '../../../redux/actions';
import S from "./style.module.css"
import Cards from "./cards";
import Pags from "./pags";
import Loader from "../loading";

//import ejemplo from "../../../../../api/src/routes/suggest.json";

export default function Recipes() {
  //let [currentPage, setCurrentPage] = useState(1);
  let dispatch = useDispatch();
  let {recipes, query, currentPage} = useSelector((state) => state.home);
  let sortBy = useSelector((state) => state.sort);
  let filtered = useSelector((state) => state.filtered);

  useEffect(()=>{
    //recipes.length === 0 && dispatch(getRecipes());
  },[])

  useEffect(()=>{
    filteredRecipes();
  },[sortBy, recipes])
  
  const filteredRecipes = () =>{
    let recipesFiltered = [...recipes];
    if (sortBy.alpha !== ''){
      recipesFiltered = recipesFiltered.sort((a,b)=>{
        if (a.title < b.title) {return sortBy.alpha==='A-Z' ? -1 : 1};
        if (a.title > b.title) {return sortBy.alpha==='A-Z' ? 1 : -1};
        return 0;
      })
    };
    if (sortBy.score !== ''){
      recipesFiltered = recipesFiltered.sort((a,b)=>{
        if (a.score > b.score) {return sortBy.score==='High' ? -1 : 1};
        if (a.score < b.score) {return sortBy.score==='High' ? 1 : -1};
        return 0;
      })
    };
    if(sortBy.diet !== ''){
      recipesFiltered = recipesFiltered.filter(e => (
        e.diets.includes(sortBy.diet)
      ))
    };
    dispatch(setFiltered(recipesFiltered));
    dispatch(setCurrentPage(1));
    // return recipesFiltered.slice((currentPage-1)*9,((currentPage-1)*9)+9)
    //return filtered
  }
  function handlerPage(e){
    dispatch(setCurrentPage(e));
  }

  return (
    <div className={S.container}>
      
        <div className={S.query}>{query === ''? 'all recipes' : `search for "${query}"`}</div>
        {recipes.length > 0 ? <Cards filtered={filtered.slice((currentPage-1)*9,((currentPage-1)*9)+9)} /> : <Loader className={S.loader}/>}
        {recipes.length > 0 && <Pags className={S.pages} recipesNumber={filtered.length} currentPage={currentPage} handler={handlerPage}/>}

    </div>
  );
}