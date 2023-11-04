import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AddCategoryButton } from '../../components/StaffActionBtns';
import StaffCategoryModal from '../../components/StaffCategoryModal';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../redux/actions/categoryActions';
import { deleteCategory } from '../../redux/actions/categoryActions';
import { showErrorMsg, showSuccessMsg } from '../../helpers/message';

const CategoriesView = () => {
    const { categories } = useSelector(state => state.categories);
    const { successMsg, errorMsg } = useSelector(state => state.messages)
    const dispatch = useDispatch();

    // Get categories
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <div className='container'>
            {successMsg && showSuccessMsg(successMsg)}
            {errorMsg && showErrorMsg(errorMsg)}
            <AddCategoryButton />
            <StaffCategoryModal />

            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Link to={`/staff/dashboard/categories/${category._id}`} className='btn btn-secondary btn-sm mr-2'>
                                    Edit
                                </Link>
                                <button className='btn btn-danger btn-sm' onClick={() => dispatch(deleteCategory(category._id))}>
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default CategoriesView;


