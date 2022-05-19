import {
    GET_DIETS,
    GET_DIETS_RECIPES,
    GET_RECIPES,
    GET_RECIPES_QUERY,
    GET_DETAILS,
    GET_SUGGESTIONS,
    CREATE_RECIPE
} from'../actions'

const initialState = {
    details:{},
    diets: [],
    home:{
        suggest: true
    },
    recipes:{
        currentPage: 1,
        query: '',
        recipes: [],
        sort:{
            score:'',
            alpha:'',
            diet:''
        }
    },
    suggestions:[]
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case GET_DIETS_RECIPES:
            return{
                ...state.recipes,
                query: action.payload.query,
                recipes: action.payload.data
            }
        case GET_RECIPES:
            return {
                ...state.recipes,
                recipes: action.payload
            }
        case GET_RECIPES_QUERY:
            return{
                ...state.recipes,
                query: action.payload.query,
                recipes: action.payload.data
            }
        case GET_DETAILS:
        case GET_SUGGESTIONS:
            return {
                ...state,
                suggestions: action.payload
            }
        case CREATE_RECIPE:

        default:
            return state;
    }
}

export default rootReducer;