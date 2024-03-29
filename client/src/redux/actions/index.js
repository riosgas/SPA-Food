import axios from 'axios';
export const GET_DIETS = 'GET_DIETS';
export const GET_DIETS_RECIPES = 'GET_DIETS_RECIPES';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_QUERY = 'GET_RECIPES_QUERY';
//export const GET_RECIPES_DIET = 'GET_RECIPES_DIET';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_SUGGESTIONS = 'GET_SUGGESTIONS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CLEAN_DETAILS = 'CLEAN_DETAILS';
export const SET_SORT = 'SET_SORT';
export const SET_FILTERED = 'SET_FILTERED';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const HOST = 'https://spa-food-production.up.railway.app';

export function getDiets(query) {
  return function (dispatch){
    
      axios.get(`${HOST}/types/`)
        .then(response => {
          return dispatch({ type: GET_DIETS, payload: response.data });
        })
        .catch(error => console.log(error));
  }
}
export function getRecipes(query, diet){
  return function (dispatch) {
    if (diet) {
      axios.get(`${HOST}/recipes?diet=${diet}`)
        .then(response => {
          return dispatch({ type: GET_RECIPES_QUERY, payload: {query: diet, data:response.data}})
        })
        .catch(error => console.log(error));
    } else
    if (query) {
      axios.get(`${HOST}/recipes?name=${query}`)
        .then(response => {
          return dispatch({ type: GET_RECIPES_QUERY, payload: {query: query, data:response.data}})
        })
        .catch(error => console.log(error));
    }
    else if (!query && !diet) {
      axios.get(`${HOST}/recipes/`)
        .then(response => {
          return dispatch({ type: GET_RECIPES, payload: response.data });
        })
        .catch(error => console.log(error));
    }
  }
}
export function getDetails(id) {
  return function (dispatch){
    axios.get(`${HOST}/recipes/${id}`)
      .then(response => {
        return dispatch({ type: GET_DETAILS, payload: response.data });
      })
      .catch(error => console.log(error));
  }
}
export function getSuggestions() {
  return function (dispatch){
    axios.get(`${HOST}/suggestions/`)
      .then(response => {
        return dispatch({ type: GET_SUGGESTIONS, payload: response.data });
      })
      .catch(error => console.log(error));
  }

}
export function createRecipe(value) {
  return function () {
    axios.post(`${HOST}/recipes/${value}`)
      .then((response) => {
        return response.json;
      })
  }
}
export function changePage(value) {
  return function (dispatch){
    return dispatch({ type: CHANGE_PAGE, payload: value })
  }
}
export function cleanDetails() {
  return function (dispatch){
    return dispatch({ type: CLEAN_DETAILS})
  }
}
export function setSort(n, v) {
  return function (dispatch){
    return dispatch({ type: SET_SORT, payload: {name: n, value: v}})
  }
}
export function setFiltered(value) {
  return function (dispatch){
    return dispatch({ type: SET_FILTERED, payload: value})
  }
}
export function setCurrentPage(value) {
  return function (dispatch){
    return dispatch({ type: SET_CURRENT_PAGE, payload: value})
  }
}