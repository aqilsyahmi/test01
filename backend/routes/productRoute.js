const router = require('express').Router();
const { getAllProducts, createProduct, deleteProduct, getProduct, updateProduct, getProductByCount } = require("../controllers/productCtrl");
const upload = require('../middlewares/multer')

router.post('/create', upload.single('image'), createProduct)
router.get('/', getAllProducts);
router.get('/count', getProductByCount);
router.get('/:productId', getProduct);
router.put('/:productId', upload.single('image'), updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;