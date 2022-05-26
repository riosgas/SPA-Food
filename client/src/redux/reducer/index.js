import {
    GET_DIETS,
    GET_DIETS_RECIPES,
    GET_RECIPES,
    GET_RECIPES_QUERY,
    GET_DETAILS,
    GET_SUGGESTIONS,
    CHANGE_PAGE,
    CLEAN_DETAILS,
    SET_SORT,
    SET_FILTERED,
    SET_CURRENT_PAGE
} from'../actions'

const initialState = {
    details:{},
    diets: [],
    home:{
        suggest: true,
        currentPage: 1,
        query: '',
        recipes: []
    },
    sort:{
        alpha:'',
        diet:'',
        score:''
    },
    suggestions:[],
    filtered:[]
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
                ...state, home : {
                    ...state.home,
                    query: action.payload.query,
                    recipes: action.payload.data
                }
            }
        case GET_RECIPES:////ok
            return {
                ...state, home : {
                    ...state.home,
                    query: '',
                    recipes: action.payload
                }
            }
        case GET_RECIPES_QUERY:
            return {
                ...state, home : {
                    ...state.home,
                    query: action.payload.query,
                    recipes: action.payload.data
                }
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_SUGGESTIONS:
            return {
                ...state,
                suggestions: action.payload
            }
        case CHANGE_PAGE:
            return {
                ...state, home : {
                    ...state.home,
                    suggest: action.payload,
                    recipes: []
                }
            }
        case CLEAN_DETAILS:
            return{
                ...state,
                details: []
            }
        case SET_SORT:
            let {name, value} = action.payload;
            if (name === 'all') {
                return {...state,
                    sort: {
                        alpha:'',
                        diet:'',
                        score:''
                    }
            }} else {
                return {...state,
                    sort: {
                        ...state.sort,
                        [name]: value
                    }
                }
            }
        case SET_FILTERED:
            return{
                ...state,
                filtered: action.payload
            }
        case SET_CURRENT_PAGE:
            return{
                ...state,
                home: {
                    ...state.home,
                    currentPage: action.payload
                }
            }
        default:
            return state;
    }
}

export default rootReducer;