import axios from 'axios';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_RECIPE_ID = 'GET_RECIPE_ID';
export const GET_RECIPES_QUERY = 'GET_RECIPES_QUERY';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_SUGGESTIONS = 'GET_SUGGESTIONS';
export const GET_DIETS = 'GET_DIETS';

export function createRecipe() {
    
};
export function getRecipeId(id) { //details

};
export function getRecipes(query){
    return function (dispatch) {
        if (!query) {
            axios.get('http://localhost:3001/recipes/')
                .then(response => {
                    return dispatch({ type: GET_RECIPES, payload: response.data });
                })
                .catch(error => console.log(error));
        }
        else {
            axios.get(`/recipes?name=${query}`)
                .then(response => {
                    return dispatch({ type: GET_RECIPES_QUERY, payload: response.data })
                })
                .catch(error => console.log(error));
        }
    }
}
export function getDiets() {
    return function (dispatch){
        axios.get('http://localhost:3001/types/')
            .then(response => {
                return dispatch({ type: GET_DIETS, payload: response.data });
            })
            .catch(error => console.log(error));
    }
}
export function getSuggestions() {
    return function (dispatch){
        axios.get('http://localhost:3001/suggestions/')
            .then(response => {
                return dispatch({ type: GET_SUGGESTIONS, payload: response.data });
            })
            .catch(error => console.log(error));
    }

}