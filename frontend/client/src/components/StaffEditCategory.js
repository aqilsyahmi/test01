
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getAllCategories} from '../redux/actions/categoryActions';
const StaffEditCategory = () => {
    /********************************
    * PARAMS
    ********************************/
    const { categoryId } = useParams();
    const navigate = useNavigate();
    /********************************
    * REDUX GLOBAL STATE PROPERTIES
    ********************************/
    const dispatch = useDispatch();
    const { category } = useSelector(state => state.categories);    
    
    /********************************
    * COMPONENT STATE PROPERTIES
    ********************************/
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        if (!category) {
            dispatch(getCategory(categoryId));
            dispatch(getAllCategories());
        } else {
            setName(category.name);
            setDescription(category.description);
          
        }
    }, [dispatch, categoryId, category]);
    

    /********************************
    * EVENT HANDLERS
    ********************************/
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios
            .put(`/api/categories/${categoryId}`, formData, config)
            .then(res => {
                navigate('/staff/dashboard/categories');
            }).catch(err => {
                console.log(err)
            })
        
    };

    return (
        <Fragment>
            <div className='container my-3'>
                <div className='row'>
                    <div className='col-md-8 mx-auto'>
                        <Link to='/staff/dashboard/categories' className='btn btn-secondary'>
                            Go back
                        </Link>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header bg-warning text-white'>
                                <h5 className='mb-0'>Update Category</h5>
                            </div>

                            <div className='card-body'>
                                <form onSubmit={handleCategorySubmit}>
                                    {/* Category Name */}
                                    <div className='form-group'>
                                        <label htmlFor='categoryName'>Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='categoryName'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    {/* Category Description */}
                                    <div className='form-group'>
                                        <label htmlFor='categoryDescription'>Description</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='categoryDescription'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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
export default StaffEditCategory;
