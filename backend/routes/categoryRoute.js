const router = require('express').Router();
const { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/categoryCtrl");


router.get('/', getAllCategories);
router.post('/create', createCategory)
router.get('/:categoryId', getCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

module.exports = router;