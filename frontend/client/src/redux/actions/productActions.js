import axios from 'axios';
import { START_LOADING, STOP_LOADING } from '../constants';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '../constants';
import { CREATE_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT, GET_PRODUCT } from '../constants';

/*Create a product */
export const createProduct = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        dispatch({ type: START_LOADING });
        const response = await axios.post('/api/products/create', formData, config);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        });

        // Ensure that the category ID in the created product matches an existing category
        const createdProductWithCategory = {
            ...response.data.product,
            _category: formData.get('_category') // Assuming '_category' is the field name for category ID in your form data
        };

        dispatch({
            type: CREATE_PRODUCT,
            payload: createdProductWithCategory
        })


    } catch (err) {
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        });
    }
};

/*Get all products */
export const getProducts = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get('/api/products');
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data.products
        });
    } catch (err) {
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        });
    }
};

/*Get a specific product */
export const getProduct = (productId) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get(`/api/products/${productId}`);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_PRODUCT,
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

/* */
export const getProductsByCount = () => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.get(
			'/api/product/count'
		);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: GET_PRODUCTS,
			payload: response.data.products,
		});
	} catch (err) {
		console.log('getProducts api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};

/*Delete a product */
export const deleteProduct = (productId) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.delete(`/api/products/${productId}`);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: DELETE_PRODUCT,
            payload: { productId } // Send only the productId as payload
            
        });

    } catch (err) {
        console.log('deleteProduct api error', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        });
    }
};

