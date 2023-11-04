import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { getAllCategories } from '../redux/actions/categoryActions';

const StaffEditProduct = () => {
    /********************************
    * PARAMS
    ********************************/
    const { productId } = useParams();
    let navigate = useNavigate();

    /********************************
    * REDUX GLOBAL STATE PROPERTIES
    ********************************/
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.categories);



    /********************************
    * COMPONENT STATE PROPERTIES
    ********************************/
    const [image, setImage] = useState(null);
    const [product_name, setProductName] = useState('');
    const [product_desc, setProductDesc] = useState('');
    const [price, setPrice] = useState('');
    const [_category, setCategory] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if (!product) {
            dispatch(getProduct(productId));
            dispatch(getAllCategories());
        } else {
            setImage(product.image);
            setProductName(product.product_name);
            setProductDesc(product.product_desc);
            setPrice(product.price);
            setCategory(product._category);
            setStock(product.stock);
        }
    }, [dispatch, productId, product]);

    /********************************
    * EVENT HANDLERS
    ********************************/

    const handleImageUpload = e => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setImage(selectedFile);
        }
    };

    const handleProductSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('product_name', product_name);
        formData.append('product_desc', product_desc);
        formData.append('price', price);
        formData.append('_category', _category);
        formData.append('stock', stock);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        await axios
            .put(`/api/products/${productId}`, formData, config)
            .then(res => {
                navigate('/staff/dashboard/products');
            }).catch(err => {
                console.log(err)
            })
    }



    /********************************
    * RENDERER
    ********************************/

    return (
        <Fragment>
            <div className='container my-3'>
                <div className='row'>
                    <div className='col-md-8 mx-auto'>
                        <Link to='/staff/dashboard/products' className='btn btn-secondary mb-3'>
                            Go back
                        </Link>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header bg-warning text-white'>
                                <h5 className='mb-0'>Update Product</h5>
                            </div>

                            <div className='card-body'>
                                <form onSubmit={handleProductSubmit}>
                                    {/* Image Upload */}
                                    <div className='form-group'>
                                        <label htmlFor='image'>Choose Image</label>
                                        <input
                                            type='file'
                                            className='form-control-file'
                                            id='image'
                                            accept='images/*'
                                            onChange={handleImageUpload}
                                        />
                                        {image &&
                                            image.name ? (
                                            <span className='badge badge-secondary'>
                                                {image.name}
                                            </span>
                                        ) : image ? (
                                            <img
                                                className='mt-3 img-thumbnail'
                                                style={{ width: '120px', height: '80px' }}
                                                src={`/uploads/${image}`}
                                                alt='product'
                                            />
                                        ) : null}
                                    </div>

                                    {/* Product Name */}
                                    <div className='form-group mb-3'>
                                        <label htmlFor='productName'>Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='productName'
                                            value={product_name}
                                            onChange={e => setProductName(e.target.value)}
                                        />
                                    </div>

                                    {/* Product Description */}
                                    <div className='form-group mb-3'>
                                        <label htmlFor='productDesc'>Description</label>
                                        <textarea
                                            className='form-control'
                                            id='productDesc'
                                            rows='3'
                                            value={product_desc}
                                            onChange={e => setProductDesc(e.target.value)}
                                        />
                                    </div>

                                    {/* Product Price */}
                                    <div className='form-group mb-3'>
                                        <label htmlFor='price'>Price</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='price'
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </div>

                                    {/* Product Category */}
                                    <div className='form-group mb-3'>
                                        <label htmlFor='category'>Category</label>
                                        <div>
                                            <select
                                                className='btn btn-outline border-dark dropdown-toggle'
                                                id='category'
                                                value={_category}
                                                onChange={e => setCategory(e.target.value)}
                                            >
                                                <option value=''>Choose one...</option>
                                                {categories &&
                                                    categories.map(c => (
                                                        <option key={c._id} value={c._id}>
                                                            {c.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Product Stock */}
                                    <div className='form-group mb-3'>
                                        <label htmlFor='stock'>Stock</label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            id='stock'
                                            min='0'
                                            max='1000'
                                            value={stock}
                                            onChange={e => setStock(e.target.value)}
                                        />
                                    </div>

                                    <div className='text-center'>
                                        <button type='submit' className='btn btn-warning'>
                                            Submit Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default StaffEditProduct;