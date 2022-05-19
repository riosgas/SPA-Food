import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../../redux/actions';
import S from "./style.module.css"
import logo from "../../../images/logo2.jpg";

export default function Nav() {
  let [seeAll, setSeeAll] = useState(false);

  let dispatch = useDispatch();

  function click(e) {
    //dispatch(getRecipes());
    seeAll ? setSeeAll(false) : setSeeAll(true);
  }

  return (
    <div className={S.container}>
      <img className={S.Logo} src={logo} alt=''/>
      <div className={S.contButtons}>
     		<input onClick={click} type='button' value='modo' className={S.create}/>
     		<input type='button' value='create' className={S.create}/>
      </div>
      <form className={seeAll ? S.searchOff : S.contSearch}>
				{/* <label>Search recipe</label> */}
        <input type="text" name='search'/>
        <input type='submit'/>
      </form>
    </div>
  );
}