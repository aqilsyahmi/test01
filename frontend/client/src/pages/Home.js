import React, { useEffect, useState } from 'react';
import '../home.css'; // Import the CSS file
import carousel1Image from '../Images/Banner2.jpeg'; // Import the image
import { Link } from 'react-router-dom';
import { getProducts } from '../redux/actions/productActions';
import { getAllCategories } from '../redux/actions/categoryActions';
import { getProductsByFilter } from '../redux/actions/filterActions';
import { useSelector, useDispatch } from 'react-redux';
import { FaSliders } from "react-icons/fa6";

function Home() {

    const [text, setText] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { products } = useSelector(state => state.products)
    const { categories } = useSelector(state => state.categories)
    const dispatch = useDispatch();

    /*event handler*/
    const handleSearch = e => {
        resetState();
        setText(e.target.value);
        dispatch(getProductsByFilter({ type: 'text', query: e.target.value }));
    }

    const handleCategory = (e) => {
        resetState();
        const currentCategoryChecked = e.target.value;
        const updatedCategoryIds = categoryIds.includes(currentCategoryChecked)
            ? categoryIds.filter(id => id !== currentCategoryChecked)
            : [...categoryIds, currentCategoryChecked];
        setCategoryIds(updatedCategoryIds);
        dispatch(getProductsByFilter({ type: 'category', query: updatedCategoryIds }));
    };

    const resetState = () => {
        setText('');
        setCategoryIds([]);
    };


    //get products and categories
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getProducts())
        }
        fetchData();
        dispatch(getAllCategories());
    }, [dispatch])

    return (
        <div className="home">

            {/* Banner Section */}
            <section className="banner">
                <img src={carousel1Image} alt="Banner" />
            </section>

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

            <section className="featured-products" style={{ marginTop: '20px' }}>
                <h2>Featured Products</h2>
                <div className="product-list">
                    {products.map((product) => (
                        <div className="product-card" key={product._id}>
                            <div className="product-image">
                                <img className='img-fluid thumbnail-img'
                                    src={`/uploads/${product.image}`}
                                    alt='product'
                                />
                            </div>

                            <div className="product-details">
                                <h3>{product.product_name}</h3>
                                <p>{product.product_desc}</p>
                                <p className="price">{"$" + product.price}</p>
                            </div>
                            <Link to={`/product/${product._id}`} key={product._id}>
                                <button className="add-to-cart-button">View More</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-logo">EZShop</div>
                <div className="footer-links">
                    <ul>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Terms of Service</Link></li>
                        <li><Link to="#" className="social-link">Facebook</Link></li>
                        <li><Link to="#" className="social-link">Twitter</Link></li>
                        <li><Link to="#" className="social-link">Instagram</Link></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Home;
