const Cart = require("../models/cartModel")
const mongoose = require("mongoose")
const stripe = require("stripe")(
  "sk_test_51O2qtuFH4AZexcWqAvdKMxaZmJX4cgAncxMZLIRkBj6snkst3oT3aYBNjHbSlLILYlSdWhsHY86vILlA0KtLWBws00Kpd1egA4 "
)
// get all cart items
const getCarts = async (req, res) => {
  const { user_id } = req.query // Access the user_id from the query parameters
  const carts = await Cart.find({ user_id }).sort({ createdAt: -1 })
  res.status(200).json(carts)
}

//get a single cart
const getCart = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such cart" })
  }
  const cart = await Cart.findById(id)

  if (!cart) {
    return res.status(400).json({ error: "No such cart" })
  }
  res.status(200).json(cart)
}

//create new cart item
const createCart = async (req, res) => {
  // extracts specific pieces of data from the request body using destructuring
  const { product_id, name, user_id, quantity, price } = req.body
  console.log(product_id, name, user_id, quantity, price)

  //add doc to db
  try {
    console.log(product_id, name, user_id, quantity, price)
    const cart = await Cart.create({
      product_id,
      name,
      user_id,
      quantity,
      price,
    })
    //send as response to browser
    res.status(200).json({ cart })
  } catch (error) {
    console.log("Error adding to cart")
    res.status(400).json({ error: error.message })
  }
  // res.json({ mssg: "POST all carts" });
}

//delete a cart item
const deleteCart = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such cart" })
  }
  const cart = await Cart.findOneAndDelete({ _id: id })
  if (!cart) {
    return res.status(400).json({ error: "No such cart" })
  }
  res.status(200).json(cart)
}

//update a cart item
const updateCart = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such cart" })
  }
  const cart = await Cart.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  )
  if (!cart) {
    return res.status(400).json({ error: "No such cart" })
  }
  res.status(200).json(cart)
}

const paymentCart = async (req, res) => {
  let status, error
  const { token, amount } = req.body
  console.log(token, "token")
  try {
    const amountInCents = Math.round(amount) // Convert to cents
    await stripe.charges.create({
      source: token.id,
      amount: amountInCents,
      currency: "usd",
    })
    status = "Success"
  } catch (error) {
    console.log(error)
    status = "Failure"
  }

  res.json({ error, status })
}

const paymentTransaction = async (req, res) => {
  try {
    const charges = await stripe.charges.list({ limit: 10 }); // Add necessary parameters as per Stripe API documentation
    console.log(charges, 'charges');
    res.json({ charges });
  } catch (error) {
    console.error("Error retrieving charges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  createCart,
  getCarts,
  getCart,
  deleteCart,
  updateCart,
  paymentCart,
  paymentTransaction,
}