import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import { getDetails, cleanDetails } from '../../redux/actions';
import S from "./style.module.css";
import Loading from "../home/loading";
//import Nav from "../navbar";

export default function Details() {
  let details = useSelector(state => state.details)
  let { id } = useParams()
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));

    return () => {
      dispatch(cleanDetails())
    }
  },[]);

  return (
    Object.keys(details).length < 1 ? <Loading className={S.container}/> :
    <div className={S.all}>
    <div className={S.container}>
      
      <img src={details.image} />
      <h1 className={S.title}>{details.title}</h1>
      <div className={S.properties}>
        <h3>Dish type</h3>
        <ul>
        {details.dishTypes.map((t,i) => (
          <li key={i}>{t}</li>
        ))}
        </ul>
        <h3>Ready in {details.readyInMinutes} minutes</h3>
        <h3>{details.servings} servings</h3>
        <h3>Health score: {details.healthScore}%</h3>
        <h3>Diets</h3>
        <ul>
        {details.diets.map((d,i) => (
          <li key={i}>{d}</li>
        ))}
        </ul>
      </div>
      <div className={S.text}>
        <h2>Summary</h2>
        <div dangerouslySetInnerHTML={{ __html: details.summary }}></div>
        {/* <div>{details.summary}</div> */}
        <h2>Instructions</h2>
          {
            details.analyzedInstructions.length===0 ? <p>{details.instructions}</p> :
            <ol>
            {
              details.analyzedInstructions[0].steps.map((s,i) => (
                <li key={i}>{s.step}</li>
              ))
            }
            </ol>
          }
      </div>
      <Link className={S.close} to='/home'>X</Link>
    </div>
    </div>
  );
}