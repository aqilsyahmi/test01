import { GET_CATEGORIES, CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY} from "../constants";

const INITAL_STATE = {
    categories: [],
}

const categoryReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case CREATE_CATEGORY:
            return {
                categories: [...state.categories, action.payload]
            }
        case GET_CATEGORIES:
            return {
                categories: [...action.payload]
            }
        case GET_CATEGORY:
            return {
                category: action.payload
            }

        case DELETE_CATEGORY:
            return {
                categories: state.categories.filter(c => c._id !== action.payload.categoryId)
            }
           
        default:
            return state;
    }
};

export default categoryReducer