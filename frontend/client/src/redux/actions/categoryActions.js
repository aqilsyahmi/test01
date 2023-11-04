import axios from 'axios';
import { START_LOADING, STOP_LOADING } from "../constants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants";
import { GET_CATEGORIES, CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY} from "../constants";

/* Create a new category*/
export const createCategory = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        dispatch({ type: START_LOADING});
        const response = await axios.post('/api/categories/create', formData, config)
        dispatch({type: STOP_LOADING})
        dispatch({type: SHOW_SUCCESS_MESSAGE, payload: response.data.successMessage})
        dispatch({type: CREATE_CATEGORY, payload: response.data.category});

    } catch(err){
        console.log('createCategory api error: ', err);
        dispatch({type: STOP_LOADING})
        dispatch({type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage
        });
    }
};

/* Get all the categories list */
export const getAllCategories = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING});
        const response = await axios.get('/api/categories');
        dispatch({type: STOP_LOADING});
        dispatch({type: GET_CATEGORIES, payload: response.data.categories});
    } catch(err){
        dispatch({type: STOP_LOADING});
        dispatch({type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage});
    }
};


/*Get a specific product */
export const getCategory = (categoryId) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get(`/api/categories/${categoryId}`);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_CATEGORY,
            payload: response.data
        });
    } catch (err) {
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        });
    }
};

export const deleteCategory = (categoryId) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.delete(`/api/categories/${categoryId}`);
        dispatch({ type: STOP_LOADING });

        //Check if the category was deleted successfully on the server
        if (response.data.success) {
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: response.data.successMessage });
            dispatch({ type: DELETE_CATEGORY, payload: {categoryId} });
            dispatch(getAllCategories());
        } else {
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: response.data.errorMessage });
        }
    } catch (err) {
        console.log('deleteCategory api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }
   
};
