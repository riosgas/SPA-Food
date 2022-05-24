import {React, useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from "react-router-dom";
import { getDiets } from '../../redux/actions';
import S from "./style.module.css";
//import Loading from "../home/loading";

export default function CreateRecipe() {
  const [input, setInput] = useState({
    title: '',
    image: '',
    summary:'',
    steps:[''],
    score:'',
    healthScore:'',
    diets:[]
  });
  const [hasError,setHasError] = useState({
    title: false,
    image: false,
    summary: false,
    score: false,
    healthScore: false
  })
  const {diets} = useSelector(state => state);
  const dispatch = useDispatch();
  //let [sel, setSel] = useState({});
  //let [selArray, setSelArray] = useState([]);
  const regex = {
    title: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    image: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    summary: /^[a-z}A-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    score: /^\d{1,2}$/,
    healthScore: /^\d{1,2}$/
  }


  useEffect(() => {
    diets.length === 0 && dispatch(getDiets());
  },[]);

  const onChange = (e) => {
    let {name, value} = e.target;
    setInput({
      ...input,
    [name]: value
    });
    if ((value != '') && (!regex[name].test(value))){
      setHasError({...hasError, [name]:true})
    } else {setHasError({...hasError, [name]:false})}
    console.log(input);
    console.log(hasError)
  };
  const onChangeStep = (e) => {
    let newSteps = input.steps;
    newSteps[e.target.name] = e.target.value;
    setInput({
      ...input,
    steps : newSteps
    });
    console.log(input.steps,'index: ',e.target.name);
  };
  const modSteps = (e) => {
    e.preventDefault();
    if (e.target.name === 'add') {
      setInput({...input, steps: [...input.steps, '']})
    } else if (input.steps.length > 1){
      let newSteps = input.steps;
      newSteps.pop();
      setInput({...input, steps: newSteps}) 
    }
  };

  // const addStep = (e) => {
  //   e.preventDefault();
  //   setInput({...input, steps: [...input.steps, '']})
  // };
  // const removeStep = (e) => {
  //   e.preventDefault();
  //   let newSteps = input.steps;
  //   newSteps.pop();
  //   setInput({...input, steps: newSteps})
  // };

  const onSubmit = (e) => {
  };

  const selDiet = (e) => {
    //sel[e] ? setSel({...sel, [e]:false}) : setSel({...sel, [e]:true});
    //!selArray.includes(e) ? setSelArray([...selArray,e]) : setSelArray(selArray.filter(d => d !== e));
    !input.diets.includes(e) ? 
    setInput({...input, diets: [...input.diets,e]}) 
    : 
    setInput({...input, diets: input.diets.filter(d => d !== e)});
    console.log(input.diets);
  };
  
  const CompDiets = ({items}) => {
    return(
      <div className={S.contDiets}>
        {
          items.map((d,i) => (
            <h4 key={i} onClick={()=>selDiet(d.name)} className={input.diets.includes(d.name) ? S.itemDietSel : S.itemDiet}>{d.text}</h4>
          ))
        }
      </div>
    )
  }
  const checkValue = (e) => {
    //let {value, name} = e.target;
    if (input[e] != '' && !regex[e].test(input[e])){
      return S.inputError
    }
  }
  const checkError = (e) => {
    if (input[e] != '' && !regex[e].test(input[e])){
      return S.textError
    }
  }

  return (
    // Object.keys(details).length < 1 ? <Loading className={S.container}/> :
    <div className={S.all}>
    <div className={S.container}>
      <div className={S.image}>
        <img src={input.image} alt='not found'/>
      </div>
      <div className={S.title}>
        <textarea
          name='title'
          value={input.title}
          placeholder='Title'
          onChange={onChange}
        />
        <div className={hasError.title ? S.textError:S.textOk} >Only letters are allowed, up to 40 characters</div>

        <div className={hasError.image ? S.textError:S.textOk} >Invalid URL</div>
        <input
          name='image'
          value={input.image}
          placeholder='Image URL'
          onChange={onChange}
        />
      </div>
      <div className={S.properties}>
        <div className={S.field}>
          <h2>Score</h2>
          <input
            name='score'
            value={input.score}
            placeholder='Score'
            onChange={onChange}
            className={hasError.score ? S.inputError : ''}
          />
          <div className={hasError.score ? S.textError:S.textOk} >Put a number between 0 and 100</div>
        </div>
        <div className={S.field}>
          <h2>Health Score</h2>
          <input
            name='healthScore'
            value={input.healthScore}
            placeholder='Healthy'
            onChange={onChange}
            className={checkValue('healthScore')}
          />
          <div className={hasError.healthScore ? S.textError:S.textOk} >Put a number between 0 and 100</div>
        </div>
        <div className={S.field}>
          <h2>Diets</h2>
          <CompDiets items={diets}/>
        </div>
      </div>
      <div className={S.text}>
        <div className={S.field}>
          <h2>Summary</h2>
          <textarea
            name='summary'
            value={input.summary}
            placeholder='Summary'
            onChange={onChange}
          />
          <div className={hasError.summary ? S.textError:S.textOk} >Up to 255 characters</div>
        </div>
        <div className={S.field}>
          <h2>Preparation steps</h2>
          {
            input.steps.map((e,i) => (
              <div key={i} className={S.step}>
                <span>{i+1}</span>
                <input value={input.steps[i]} onChange={onChangeStep} name={i}/>
              </div>
            ))
          }
          <button onClick={modSteps} name='add'>+</button>
          <button onClick={modSteps} name='remove'>-</button>
        </div>
        {/* <span className={S.textarea} name='summary' onChange={onChange} role="textbox" contenteditable='true'>0</span> */}
      </div>
      {/* <Link className={S.close} to='/home'>X</Link> */}
    </div>
    </div>
  );
}