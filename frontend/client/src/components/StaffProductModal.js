import React, { Fragment, useState } from "react";
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from "../helpers/loading";
//redux
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../redux/actions/messageActions";
import { createProduct } from "../redux/actions/productActions";

const StaffProductModal = () => {

    /***************************
    * REDUX GLOBAL STATE PROPERTIES
    ****************************/

    //from store.js
    const { loading } = useSelector(state => state.loading)
    const { successMsg, errorMsg } = useSelector(state => state.messages)
    const { categories } = useSelector(state => state.categories)

    const dispatch = useDispatch();

    /***************************
    * COMPONENT STATE PROPERTIES
    ****************************/

    // client-side error message
    const [clientSideError, setClientSideError] = useState('')

    // initial product data state
    const [productData, setProductData] = useState({
        image: null,
        product_name: '',
        product_desc: '',
        price: '',
        _category: '',
        stock: '',
    });

    const {
        image,
        product_name,
        product_desc,
        price,
        _category,
        stock,
    } = productData;

    /*****************
    * EVENT HANDLERS
    *****************/
    const handleMessages = (evt) => {
        dispatch(clearMessages());
        setClientSideError('');
    };

    const handleProductChange = (evt) => {
        setProductData({
            ...productData,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleProductImage = (evt) => {
        setProductData({
            ...productData,
            [evt.target.name]: evt.target.files[0],
        });
    };

    const handleProductSubmit = (evt) => {
        evt.preventDefault();
        if (validateProductForm()) {

            //save the details
            let formData = new FormData();
            formData.append('image', image);
            formData.append('product_name', product_name);
            formData.append('product_desc', product_desc);
            formData.append('price', price);
            formData.append('_category', _category);
            formData.append('stock', stock);

            dispatch(createProduct(formData));

            //set back to empty string
            setProductData({
                image: null,
                product_name: '',
                product_desc: '',
                price: '',
                _category: '',
                stock: '',
            });
        }
    };

    const validateProductForm = () => {
        const { image, product_name, product_desc, price, _category, stock } = productData;

        //client-side validation
        if (image === null) {
            setClientSideError("Please Select an image");
            return false;
        }
        if (!product_name || !product_desc || !price) {
            setClientSideError("All fields are required");
            return false;
        }
        if (!_category) {
            setClientSideError("Please select a categlory");
            return false;
        }
        if (!stock) {
            setClientSideError("Please select a stock quantity");
            return false;
        }

        return true;
    };

    /*****************
    * RENDERER
    *****************/
    return (
        <div id='addProductModal' className='modal' onClick={handleMessages}>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <form onSubmit={handleProductSubmit}>
                        {/* modal header */}
                        <div className='modal-header bg-info text-white'>
                            <h5 className='modal-title'>Add Product</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label="Close">
                                <span>
                                    <i className='fas fa-times'></i>
                                </span>
                            </button>
                        </div>

                        {/* modal body */}
                        <div className='modal-body my-2'>
                            {clientSideError && showErrorMsg(clientSideError)}
                            {successMsg && showSuccessMsg(successMsg)}
                            {errorMsg && showErrorMsg(errorMsg)}

                            {loading ? <div className="text-center"> {showLoading()} </div> : (
                                <Fragment>
                                    {/* insert image */}
                                    <div className='custom-file mb-2'>
                                        <input
                                            type='file'
                                            className='custom-file-input'
                                            name='image'
                                            onChange={handleProductImage}
                                        />
                                    </div>

                                    {/* product name */}
                                    <div className='form-group'>
                                        <label className='text-secondary'>Name</label>
                                        <input type='text' className='form-control' name='product_name' value={product_name} onChange={handleProductChange} />
                                    </div>

                                    {/* product description */}
                                    <div className='form-group'>
                                        <label className='text-secondary'>Description</label>
                                        <textarea className='form-control' rows='3' name='product_desc' value={product_desc} onChange={handleProductChange}></textarea>
                                    </div>

                                    {/* product price */}
                                    <div className='form-group'>
                                        <label className='text-secondary'>Price</label>
                                        <input type='text' className='form-control' name='price' value={price} onChange={handleProductChange} />
                                    </div>

                                    {/* product category */}
                                    <div className='form-row'>
                                        <div className='form-group col-md-6'>
                                            <label className='text-secondary'>
                                                Category
                                            </label>
                                            <select className='custom-select mr-sm-2' name='_category' value={_category} onChange={handleProductChange}>
                                                <option value=''>Choose one...</option>
                                                {categories && categories.map((c) => (
                                                    <option key={c._id} value={c._id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>


                                    {/* product stock */}
                                    <div className='form-group col-md-6'>
                                        <label className='text-secondary'>Stock</label>
                                        <input type='number' className='form-control' min='0' max='1000' name='stock' value={stock} onChange={handleProductChange} />
                                    </div>
                                </Fragment>
                            )}

                        </div>

                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                Close
                            </button>
                            <button type='submit' className='btn btn-info'>
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    )
};

export default StaffProductModal;
