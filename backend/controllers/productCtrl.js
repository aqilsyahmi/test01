const Product = require("../models/productModel");
const Category = require('../models/categoryModel');
const fs = require('fs'); // file system

/* create a product */
const createProduct = async (req, res) => {

    const { product_name, product_desc, price, _category, stock } = req.body;

    //get image path from Multer upload middleware
    const { filename } = req.file;

    try {
        // Verify if the provided _category ID is valid
        const isValidCategory = await Category.findById(_category);
        if (!isValidCategory) {
            return res.status(400).json({ error: "Category not found" });
        }

        // Create the product
        const newProduct = await Product.create({ image: filename, product_name, product_desc, price, _category, stock });

        res.status(200).json({
            product: newProduct,
            successMessage: `${newProduct.product_name} has been added successfully`
        });
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
};

/* get all products */
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('_category', 'category');
        res.json({ products });

    } catch (err) {
        console.log(err, 'productCtrl getAllProduct error');
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
};

/* get products by count*/
const getProductByCount = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('productCategory', 'category')
            .limit(6);

        res.json({ products });
    } catch (err) {
        console.log(err, 'productController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
}

/* get a product */
const getProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        res.json(product);

    } catch (err) {
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
};

/* update product*/
const updateProduct = async (req, res) => {
    const productId = req.params.productId;

    if (req.file !== undefined) {
        req.body.image = req.file.filename;
    }

    const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

    if (req.file !== undefined && req.file.filename !== oldProduct.image) {
        fs.unlink(`uploads/${oldProduct.image}`, err => {
            if (err) throw err;
            console.log('Image deleted from the filesystem');
        });
    }

    res.json({
        successMessage: 'Product successfully updated',
    });

};

/* delete a product */
const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            // If the product does not exist, return an error response
            return res.status(404).json({ errorMessage: 'Product not found' });
        }

        if (fs.existsSync(`uploads/${deletedProduct.image}`)) {
            fs.unlinkSync(`uploads/${deletedProduct.image}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ errorMessage: 'Failed to delete product image' });
                }
                console.log('Image deleted from the filesystem');
            });
        }

        // Respond with success message
        res.json({
            successMessage: 'Product successfully deleted'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
};

module.exports = { createProduct, getAllProducts, getProductByCount, getProduct, updateProduct, deleteProduct };
