import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
import cartReducer from "../redux/reducers/cartReducers";

export const CartContext = createContext();


export const CartProvider = ({ children })=> {
  const [cartItems, setCartItems] = useState([]);
  const [state, dispatch] = useReducer(cartReducer, {
    carts: []
  });

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    // all component has access to this provider
    <CartContext.Provider
      value={{ 
        ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
