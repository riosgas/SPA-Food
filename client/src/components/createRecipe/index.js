import {React, useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getDiets, createRecipe } from '../../redux/actions';
import S from "./style.module.css";
import notfound from "../../images/default.jpg"

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
    title: true,
    image: true,
    summary: true,
    steps: false,
    score: true,
    healthScore: true,
    diets: false
  })
  const {diets} = useSelector(state => state);
  const dispatch = useDispatch();
  //let [sel, setSel] = useState({});
  //let [selArray, setSelArray] = useState([]);
  const regex = {
    title: /^[a-zA-ZÀ-ÿ\s]{1,100}$/,
    image: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
    summary: /.*(?:)/,
    score: /^[1-9][0-9]?$|^100$/,
    healthScore: /^[1-9][0-9]?$|^100$/
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
    if (regex[name].test(value)){
      setHasError({...hasError, [name]:false})
    } else {setHasError({...hasError, [name]:true})}

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
    
    if (input.steps[0] != '') {
      setHasError({...hasError, steps:false})
    }
    
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
    // title: false,
    // image: false,
    // summary: false,
    // steps: false,
    // score: false,
    // healthScore: false,
    // diets: false
    if (!hasError.title && !hasError.image && !hasError.summary && !hasError.score && !hasError.healthScore) {
      dispatch(createRecipe(input));
      setInput({
        title: '',
        image: '',
        summary:'',
        steps:[''],
        score:'',
        healthScore:'',
        diets:[]
      })
      alert('Success')
    } else {
      alert('Invalidad data')
    }
    console.log(input);
    console.log('errores: ',hasError)
    //dispatch(createRecipe(input));
  };

  const selDiet = (e) => {
    //sel[e] ? setSel({...sel, [e]:false}) : setSel({...sel, [e]:true});
    //!selArray.includes(e) ? setSelArray([...selArray,e]) : setSelArray(selArray.filter(d => d !== e));
    !input.diets.includes(e) ? 
    setInput({...input, diets: [...input.diets,e]}) 
    : 
    setInput({...input, diets: input.diets.filter(d => d !== e)});

    if (input.diets.length == 0) {
      setHasError({...hasError, diets:false})
    } else if (input.diets.length == 1 && input.diets[0] == e) {
      setHasError({...hasError, diets:true})
    }

    console.log(hasError);
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
  // const checkValue = (e) => {
  //   //let {value, name} = e.target;
  //   if (input[e] != '' && !regex[e].test(input[e])){
  //     return S.inputError
  //   }
  // }
  // const checkError = (e) => {
  //   if (input[e] != '' && !regex[e].test(input[e])){
  //     return S.textError
  //   }
  // }

  return (
    // Object.keys(details).length < 1 ? <Loading className={S.container}/> :
    <div className={S.all}>
    <div className={S.container}>
      <div className={S.image}>
        <img src={input.image} alt='Recipe' onError={(e)=>{
          e.target.onerror = null
          e.target.src = notfound}} 
        />
      </div>
      <div className={S.title}>
        <textarea
          name='title'
          maxLength="100"
          value={input.title}
          placeholder='Title'
          onChange={onChange}
          className={hasError.title && input.title!='' ? `${S.titleOk} ${S.inputError}` : S.titleOk}
        />
        <div className={hasError.title && input.title!='' ? S.textError : S.textOk} >Only letters are allowed, up to 100 characters</div>

        <div className={hasError.image && input.image!='' ? S.textError : S.textOk} >Invalid URL</div>
        <input
          name='image'
          value={input.image}
          placeholder='Image URL'
          onChange={onChange}
          className={hasError.image && input.image!='' ? `${S.imageOk} ${S.inputError}` : S.imageOk}
        />
      </div>
      <div className={S.properties}>
        <div className={S.field}>
          <h2>Score</h2>
          <input
            name='score'
            maxLength="3"
            value={input.score}
            placeholder='Score'
            onChange={onChange}
            className={hasError.score && input.score!='' ? S.inputError : ''}
          />
          <div className={hasError.score && input.score!='' ? S.textError:S.textOk} >Number between 0 and 100</div>
        </div>
        <div className={S.field}>
          <h2>Health Score</h2>
          <input
            name='healthScore'
            maxLength="3"
            value={input.healthScore}
            placeholder='Healthy'
            onChange={onChange}
            className={hasError.healthScore && input.healthScore!='' ? S.inputError : ''}
          />
          <div className={hasError.healthScore && input.healthScore!='' ? S.textError:S.textOk} >Number between 0 and 100</div>
        </div>
        <div className={hasError.diets ? S.fieldError : S.field}>
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
            className={hasError.summary && input.summary!='' ? S.inputError : ''}
          />
          <div className={hasError.summary && input.summary!='' ? S.textError:S.textOk} >Up to 255 characters</div>
        </div>
        <div className={hasError.steps ? S.fieldError : S.field}>
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
      <div className={S.submit}>
        <button onClick={onSubmit}>Create recipe</button>
      </div>
      <Link className={S.close} to='/home'>X</Link>
    </div>
    </div>
  );
}