import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSliders} from "react-icons/fa6";

//components
import { AddProductButton } from '../../components/StaffActionBtns';
import StaffProductModal from '../../components/StaffProductModal';
import { showLoading } from "../../helpers/loading";

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../redux/actions/categoryActions';
import { getProducts } from '../../redux/actions/productActions';
import { deleteProduct } from '../../redux/actions/productActions';
import { getProductsByFilter } from '../../redux/actions/filterActions';


const ProductsView = () => {
    const [text, setText] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { products } = useSelector(state => state.products)
    const { categories } = useSelector(state => state.categories);
    const { loading } = useSelector(state => state.loading)

    const dispatch = useDispatch();

    //get categories and products
    useEffect(() => {
        const fetchData = async () => {
           await dispatch(getProducts())
        }
        fetchData();
        dispatch(getAllCategories());
    }, [dispatch])

    /*event handler*/
    const handleSearch = e => {
        resetState();
        setText(e.target.value);
        dispatch(getProductsByFilter({ type: 'text', query: e.target.value }));
    }

    const handleCategory = (e) => {
        resetState();
        const currentCategoryChecked = e.target.value;
		const allCategoriesChecked = [...categoryIds];
		const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

		let updatedCategoryIds;
		if (indexFound === -1) {
			// add
			updatedCategoryIds = [...categoryIds, currentCategoryChecked];
			setCategoryIds(updatedCategoryIds);
		} else {
			// remove
			updatedCategoryIds = [...categoryIds];
			updatedCategoryIds.splice(indexFound, 1);
			setCategoryIds(updatedCategoryIds);
		}

		dispatch(
			getProductsByFilter({ type: 'category', query: updatedCategoryIds })
		);
    };

    const resetState = () => {
        setText('');
        setCategoryIds([]);
    };

    const getCategoryName = categoryId => {
        const category = categories.find(category => category._id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    return (
        <div className='container'>
            <AddProductButton />
            <StaffProductModal />

             {/* Search and Filter */}
             <section className='search-filter-section p-3'>
                <div className='container'>
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3">
                            <form>
                                <div className='input-group'>
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        name='search'
                                        value={text}
                                        onChange={handleSearch}
                                    />
                                    <button className="btn btn-outline-secondary" type="submit">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='col-md-6 text-end'>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                Filter <FaSliders/> <i className={`${isFilterOpen ? 'up' : 'down'}`} />
                            </button>
                        </div>
                        {isFilterOpen && (
                            <div className="col-12 mt-3">
                                <div className="filters">
                                    {categories &&
                                        categories.map(c => (
                                            <div key={c._id} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="category"
                                                    value={c._id}
                                                    id={`category-${c._id}`}
                                                    checked={categoryIds.includes(c._id)}
                                                    onChange={handleCategory}
                                                />
                                                <label className="form-check-label" htmlFor={`category-${c._id}`}>
                                                    {c.name}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </section>

            {loading ? <div className="text-center"> {showLoading()} </div> : (
                <Fragment>
                    <table className='table'>
                        {/* Table header */}
                        <thead>
                            <tr>
                                <th scope='col'>Image</th>
                                <th scope='col'>Product Name</th>
                                <th scope='col'>Description</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Stock</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map(product => (
                                <tr key={product._id} product={product}>
                                    {/* image */}
                                    <td>
                                        <a href='#!'>
                                            <img
                                                className='img-fluid thumbnail-img'
                                                src={`/uploads/${product.image}`}
                                                alt='product'
                                            />
                                        </a>
                                    </td>

                                    {/* product name */}
                                    <td> {product.product_name} </td>

                                    {/* description */}
                                    <td> {product.product_desc.length > 60
                                        ? (product.product_desc.substring(0, 60) + '...')
                                        : (product.product_desc.substring(0, 60))}
                                    </td>

                                    {/* price */}
                                    <td> {product.price.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'SGD',
                                    })}
                                    </td>

                                    {/* category */}
                                    <td> {getCategoryName(product._category._id)}</td>

                                    {/* stock */}
                                    <td>{product.stock}</td>

                                    {/* actions */}
                                    <td>
                                        <Link
                                            to={`/staff/dashboard/products/${product._id}`}
                                            type='button'
                                            className='btn btn-secondary btn-sm mr-1 my-1'>
                                            Edit
                                        </Link>
                                        {/* delete product button*/}
                                        <button
                                            type='button'
                                            className='btn btn-danger btn-sm'
                                            onClick={() => dispatch(deleteProduct(product._id))}>
                                            Delete
                                        </button>


                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </Fragment>
            )}


        </div>
    );
}

export default ProductsView;