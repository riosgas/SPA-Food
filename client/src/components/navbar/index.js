import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets ,changePage, setSort, getRecipes } from '../../redux/actions';
import S from "./style.module.css"
import logo from "../../images/logo.svg";
import { useNavigate } from 'react-router';

export default function Nav() {
  let [search,setSearch] = useState('');
  let suggestPage = useSelector(state=>state.home.suggest);
  let diets = useSelector(state=>state.diets);
  let sortBy = useSelector(state=>state.sort);
  const navigate = useNavigate();

  let dispatch = useDispatch();

  useEffect(() => {
    diets.length === 0 && dispatch(getDiets())
  },[]);

  function allRecipes() {
    suggestPage ? dispatch(changePage(false)) : dispatch(changePage(true));
    dispatch(getRecipes());
    dispatch(setSort('all'));
  }
  const onChange = (e) => {
    let {name, value} = e.target;
    dispatch(setSort(name, value));
  }
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }
  const clickSearch = (e) => {
    e.preventDefault();
    dispatch(getRecipes(search));
    dispatch(changePage(false))
  }
  const resetSort = () => {
    //e.preventDefault();
    dispatch(setSort('all'));
  }

  return (
    <div className={S.container}>
      <img className={S.Logo} src={logo} alt=''/>
      <div className={S.contButtons}>
     		<input onClick={allRecipes} type='button' value='modo' className={S.create}/>
     		<input onClick={() => navigate('/recipe/create')} type='button' value='create' className={S.create}/>
      </div>
      <div className={S.contSearch}>
				{/* <label>Search recipe</label> */}
        <input type="text" name='search' value={search} onChange={onChangeSearch}/>
        <button onClick={clickSearch}>search</button>
      </div>
      { !suggestPage &&
        <div>
          <select name='alpha' onChange={onChange} value={sortBy.alpha}>
            <option defaultValue value=''>Sort alphabetically</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select name='score' onChange={onChange} value={sortBy.score}>
            <option defaultValue value=''>Sort by score</option>
            <option value="High">Highest first</option>
            <option value="Low">Lowest first</option>
          </select>
          <select name='diet' onChange={onChange} value={sortBy.diet}>
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
    </div>
  );
}