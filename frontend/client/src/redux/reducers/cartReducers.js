import { CREATE_CART, SET_CART, DELETE_CART, UPDATE_CART } from "../constants"

const INITIAL_STATE = {
    carts: []
}

// state is reliable previous state value, then action which is object we passed into dispatch
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CART:
            return {
                carts: action.payload
            } 
        case CREATE_CART: //ADD_TO_CART
            return {
                // single new cart object
                carts: [action.payload]
            }
        case DELETE_CART:
            return {
                carts: state.carts.filter((cart) => cart._id !== action.payload._id)

            }
        case UPDATE_CART:
            const updatedCart = state.carts.map((cart) => {
                if (cart._id === action.payload._id) {
                    // Update the item with the new data
                    return { ...cart, ...action.payload };
                }
                return cart;
            });

            return {
                carts: updatedCart,
            };

        default:
            //unchanged
            return state
    }
}

export default cartReducer;