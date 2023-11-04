const router = require('express').Router();
// const {  } = require("../controllers/cartCtrl");
const {createCart, getCarts, getCart, deleteCart, updateCart,paymentCart, paymentTransaction} = require("../controllers/cartCtrl");


router.get('/', getCarts);

router.get('/:id', getCart);

router.post('/', createCart);

router.delete('/:id', deleteCart);

router.patch('/:id', updateCart);

router.post('/payment', paymentCart)

router.get("/charges", paymentTransaction)

module.exports = router