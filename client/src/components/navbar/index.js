import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets ,changePage, setSort, getRecipes, getSuggestions } from '../../redux/actions';
import S from "./style.module.css"
import logo from "../../images/logo.svg";
import { useNavigate } from 'react-router';

export default function Nav() {
  let [search,setSearch] = useState('');
  let {diets, sort, home} = useSelector(state=>state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    diets.length === 0 && dispatch(getDiets())
  },[]);

  const allRecipes = () => {
    //suggestPage ? dispatch(changePage(false)) : dispatch(changePage(true));
    dispatch(changePage(false));
    dispatch(getRecipes());
    dispatch(setSort('all'));
  }
  const pageSuggest = () => {
    dispatch(changePage(true));
    dispatch(getSuggestions())
  }
  const onChange = (e) => {
    let {name, value} = e.target;
    dispatch(setSort(name, value));
  }
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }
  const clickSearch = (e) => {
    //e.preventDefault();
    setSearch('');
    dispatch(getRecipes(search));
    dispatch(changePage(false))
  }
  const resetSort = () => {
    dispatch(setSort('all'));
  }

  return (
    <div className={S.container}>
      <img onClick={pageSuggest} className={S.Logo} src={logo} alt=''/>
      <input onClick={() => navigate('/recipe/create')} type='button' value='Create' className={S.create}/>
      {/* <div className={S.contButtons}>
      </div> */}
      <div className={S.contSearch}>
				{/* <label>Search recipe</label> */}
        <input type="text" name='search' value={search} onChange={onChangeSearch}/>
        <button onClick={clickSearch}>search</button>
      </div>
      { !home.suggest && home.recipes.length &&
        <div>
          <select name='alpha' onChange={onChange} value={sort.alpha}>
            <option defaultValue value=''>Sort alphabetically</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select name='score' onChange={onChange} value={sort.score}>
            <option defaultValue value=''>Sort by score</option>
            <option value="High">Highest first</option>
            <option value="Low">Lowest first</option>
          </select>
          <select name='diet' onChange={onChange} value={sort.diet}>
            <option defaultValue value=''>Sort by diet</option>
            {
              diets.length > 1 && diets.map((e,i)=>(
                <option key={i} value={e.name}>{e.text}</option>
                ))
              }
          </select>
          <button onClick={resetSort}>Reset options</button>
        </div>
      }
      <input onClick={allRecipes} type='button' value='All recipes' className={S.create}/>
    </div>
  );
}