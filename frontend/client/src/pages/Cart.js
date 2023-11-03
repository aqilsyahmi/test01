import React, { useEffect, useState } from "react"
import { useCartContext } from "../hooks/useCartContext"
import "../index.css"
import { setAuthentication, isAuthenticated } from "../helpers/auth"
import StripeCheckout from "react-stripe-checkout"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"

const Cart = () => {
  const { carts, dispatch } = useCartContext()
  const publishableKey =
    "pk_test_51O2qtuFH4AZexcWqyk55czvbAepBT3exDYnJjlhrS1pZz2m7Z3Y5GHCELivsK5ZEBueWzJKqK4K0OLxI0wyZKWJ9002rzwbhUe"
  const [cartTotal, setCartTotal] = useState(0)
  const amountInCents = Math.round(cartTotal * 100)
  const [updatedQuantity, setUpdatedQuantity] = useState({})

  // Calculate the total whenever carts or updatedQuantity change
  useEffect(() => {
    calculateTotal(carts);
  }, [carts, updatedQuantity]);
  useEffect(() => {
    const user_id = isAuthenticated() ? isAuthenticated().userId : null;

    const fetchCarts = async () => {
      const response = await fetch(`/api/cart?user_id=${user_id}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_CART', payload: json });
        calculateTotal(json);
      }
    };

    fetchCarts();
  }, [dispatch]);

  const calculate = (quantity, price) => {
    const result = Math.round(quantity * price * 100) / 100;
    return result;
  };

  const calculateTotal = (carts) => {
    let result = 0;
    for (let i = 0; i < carts.length; i++) {
      result += calculate(carts[i].quantity, carts[i].price);
    }
    setCartTotal(result);
  };


  const handleQuantityChange = (itemId, newQuantity) => {
    // Parse newQuantity as an integer
    newQuantity = parseInt(newQuantity, 10);
  
    // Ensure the newQuantity is not less than 1
    if (newQuantity < 1) {
      newQuantity = 1;
    }
  
    // Update the quantity for the specific item in the state
    setUpdatedQuantity({ ...updatedQuantity, [itemId]: newQuantity });
  
    // Send an immediate update to the server
    updateQuantityOnServer(itemId, newQuantity);
  
    // Calculate the total immediately after updating the cart
    const updatedCarts = carts.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    calculateTotal(updatedCarts);
  };

  const updateQuantityOnServer = async (itemId, newQuantity) => {
    const response = await fetch(`/api/cart/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: newQuantity }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const updatedQuantityValue = newQuantity;
      // Update the cart state with the new quantity
      dispatch({
        type: 'UPDATE_CART',
        payload: {
          _id: itemId,
          quantity: updatedQuantityValue
        }
      });
    }
  };

  const handleClick = async (e) => {
    const response = await fetch('/api/cart/' + e, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_CART', payload: json });
    }
  };
  useEffect(() => {
    const user_id = isAuthenticated() ? isAuthenticated().userId : null

    const fetchCarts = async () => {
      const response = await fetch(`/api/cart?user_id=${user_id}`)
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: "SET_CART", payload: json })
        calculateTotal(json)
      }
    }

    fetchCarts()
  }, [dispatch])

  const payNow = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart/payment",
        {
          amount: amountInCents,
          token,
        }
      )
      if (response.data.status === "Success") {
        toast.success("Payment was Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        toast.error("Payment was failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="cart">
      <h2>Cart page</h2>
      <div className="cart-table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product id</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {carts && carts.map((item) => (
              <tr key={item._id} className="cart-item">
                <td>{item.product_id}</td>
                <td>{item.name}</td>
                <td>
                  <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={updatedQuantity[item._id] || item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    disabled
                  />
                  <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                </td>
                <td>${item.price}</td>
                <td><p>{calculate(item.quantity, item.price)}</p></td>
                <td>
                  <button className="delete-button" onClick={() => handleClick(item._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-total">
        <strong>Total: ${cartTotal}</strong>
      </div>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        billingAddress
        shippingAddress
        amount={amountInCents}
        description={`Your total is $${cartTotal}`}
        token={payNow}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
    
  );
};

export default Cart;
