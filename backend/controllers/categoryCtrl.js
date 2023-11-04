const Category = require("../models/categoryModel");
const Product = require("../models/productModel");


/* create a new category */
const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        // Check if a category with the same name already exists
        const existingCat = await Category.findOne({ name });

        if (existingCat) {
            // If category with the same name exists, return an error message
            return res.status(400).json({ errorMessage: `${name} already exists` });
        } 

        // If category with the same name does not exist, create a new category
        const newCategory = await Category.create({ name, description });

        //const category = await Category.create({ name, description });
        res.status(200).json({
            category: newCategory,
            successMessage: `${newCategory.name} has been added successfully`,
            // categoryId: newCategory._id,
            // name: newCategory.name,
            // description: newCategory.description,
        });
        

    } catch (error) {
        res.status(400).json({ errorMessage: "Please try again later" });
    }
};

/* get all categories */
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        res.status(200).json({ categories});
         
    } catch (err) {
        res.status(500).json({ errorMessage: 'Please try again later'})
    }
    
};

/* get a category */
const getCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);

        res.json(category);

    } catch (err) {
        res.status(500).json({
            errorMessage: 'Please try again later'
        });
    }
};

/* update category */
const updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        // Update category details
        await Category.findByIdAndUpdate(categoryId, req.body);

        // Respond with success message
        res.json({
            successMessage: 'Category successfully updated'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
};


/* delete a category */
const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        // Find the category by ID
        const categoryToDelete = await Category.findById(categoryId);

        // Check if there are products associated with the category
        const productsWithCategory = await Product.find({ _category: categoryId });
        if (productsWithCategory.length > 0) {
            return res.status(400).json({ errorMessage: `Cannot delete ${categoryToDelete.name} with associated products` });
        }

        // Find and delete the category
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            // If the category does not exist, return an error response
            return res.status(404).json({ errorMessage: `${deletedCategory.name} not found` });
        }

        // Respond with success message
        res.json({
            successMessage: `${deletedCategory.name} successfully deleted`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
};

module.exports = { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory};
