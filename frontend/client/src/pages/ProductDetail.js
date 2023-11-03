import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import { isAuthenticated } from "../helpers/auth";
import { getProducts } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const user_id = isAuthenticated() ? isAuthenticated().userId : null;
  const { dispatch } = useCartContext();
  const [product_id, setProductId] = useState("");
  const [cart_id, setCartId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("Placeholder");
  const [image, setImage] = useState("Placeholder");
  const [stock, setStock] = useState("Placeholder");

  const { products } = useSelector((state) => state.products);

  const dispatcher = useDispatch();

  //get products
  useEffect(() => {
    const fetchData = async () => {
      await dispatcher(getProducts());
    };
    fetchData();
  }, [dispatcher]);

  // Function to get the product details based on product_id
  const getProductDetails = (productId) => {
    const product = products.find((product) => product._id === productId);
    console.log(products);
    if (product) {
      setProductId(product._id);
      setName(product.product_name);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.product_desc);
      setStock(product.stock);
    }
  };

  const checkCartExist = async () => {
    const response = await fetch(`/api/cart?user_id=${user_id}`);
    const json = await response.json();

    if (response.ok) {
      checkExists(json);
    }
  };

  const acceptRange = (quantity) => {
    if (0 < quantity && quantity <= stock) {
      return true;
    } else {
      return false;
    }
  };

  const deleteCart = async (e) => {
    const response = await fetch("/api/cart/" + e, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CART", payload: json });
    }
  };

  const createCart = async (name, quantity, price) => {
    const product = { product_id, name, user_id, quantity, price };
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "CREATE_CART", payload: json });
      console.log("New cart item added", json);
    }
  };

  const addToCart = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/cart?user_id=${user_id}`);
    const json = await response.json();

    if (response.ok) {
      if (isAuthenticated()) {
        if (acceptRange(quantity)) {
          const cartExists = checkExists(json);
          if (!cartExists) {
            createCart(name, quantity, price);
            alert("Item added to cart!");
          } else {
            const userConfirmed = window.confirm(
              "Item already exists in the cart. Update cart?"
            );
            if (userConfirmed) {
              // Instead of deleting and creating, update the quantity of the existing item
              updateCart(cart_id, quantity); // Call the updateCart function
              alert("Cart updated!");
            } else {
            }
          }
          setQuantity(0);
        } else {
          alert("Please enter a number between 1 and " + stock.toString());
        }
      } else {
        alert("Please login first");
      }
    }
  };

  const updateCart = async (cartId, newQuantity) => {
    const response = await fetch(`/api/cart/${cartId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity: newQuantity }), // Send the new quantity
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_CART", payload: json });
      console.log("Cart item updated", json);
    } else {
      console.error("Error updating cart item:", json);
    }
  };

  function checkExists(cartItems) {
    let exist = false;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].product_id === id) {
        setCartId(cartItems[i]._id);
        exist = true;
        return cartItems[i]; // Return the existing cart item
      }
    }
    return exist;
  }

  useEffect(() => {
    getProductDetails(id); // Get product details based on id
    console.log(id);
    checkCartExist();
  }, [id]);

  return (
    <div className="product-detail-container">
      <p>Product ID: {product_id}</p>
      <h2>Product Details</h2>
      <div className="product-details">
        <img
          className="img-fluid thumbnail-img"
          src={`/uploads/${image}`}
          alt="product"
        />

        <h4>Name: {name}</h4>
        <p>Price: ${price}</p>
        <p>Description: {description}</p>
        <p>Stock Left: {stock}</p>
        <label>Quantity:</label>
        <input
          type="number"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          value={quantity}
        ></input>
      </div>
      <button className="add-to-cart-button" onClick={(e) => addToCart(e)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
