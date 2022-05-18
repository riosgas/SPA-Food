import {
    GET_RECIPES,
    GET_DIETS,
    GET_SUGGESTIONS
} from'../actions'

const initialState = {
  home:{
      suggest: true
  },
  recipes:{
      currentPage: 1,
      query: '',
      recipes: []
  },
  suggest:{
      recipes: [],
      diets: []
  },
  details:{}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state.recipes,
                recipes: action.payload
            }
        case GET_SUGGESTIONS:
            return {
                ...state.suggest,
                suggestions: action.payload
            }
        case GET_DIETS:
            return {
                ...state.suggest,
                diets: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;