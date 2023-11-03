import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, GET_PRODUCT } from "../constants";


const INITIAL_STATE = {
    products: [],
    categories: []
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                products: [...state.products, action.payload]
            }
        case GET_PRODUCTS:
            return {
                products: [...action.payload]
            }
        case GET_PRODUCT:
            return {
                product: action.payload
            }
        case DELETE_PRODUCT:
            return {
                products: state.products.filter(p => p._id !== action.payload.productId)
            }
        default:
            return state;
    }
}

export default productReducer;