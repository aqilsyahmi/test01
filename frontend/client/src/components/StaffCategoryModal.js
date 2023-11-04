import React, { Fragment, useState } from "react";
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
//redux
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../redux/actions/messageActions";
import { createCategory } from "../redux/actions/categoryActions";


const StaffCategoryModal = () => {
    /***************************
    *REDUX GLOBAL STATE PROPERTIES
    ****************************/

    //from store.js
    const { successMsg, errorMsg } = useSelector(state => state.messages)
    const { loading } = useSelector(state => state.loading)
    const dispatch = useDispatch();

    /***************************
    *COMPONENT STATE PROPERTIES
    ****************************/
    const categoryFormData = {
        name: "",
        description: ""
    };
    const [category, setCategory] = useState(categoryFormData);
    const [clientSideErrorMsg, setClientSideErrorMsg] = useState('')

    /*****************
    * EVENT HANDLERS
    *****************/
    const handleMessages = (evt) => {
        dispatch(clearMessages());
        setClientSideErrorMsg('');
    }

    const handleCategoryChange = (evt) => {
        dispatch(clearMessages())
        setCategory({
            ...category,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleCategorySubmit = (evt) => {
        evt.preventDefault();

        if (validateForm()) {
            dispatch(createCategory(category));
            setCategory('');
        }
    };

    const validateForm = () => {
        const { name, description } = category;

        // client side validation
        if (!name || !description) {
            setClientSideErrorMsg("All fields are required")
            return false;
        }
        setClientSideErrorMsg("")
        
        return true;
    };

    /*************
    *RENDEDER
    **************/
    return (
        <div id='addCategoryModal' className='modal' onClick={handleMessages}>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <form onSubmit={handleCategorySubmit}>
                        {/* modal header */}
                        <div className='modal-header bg-info text-white'>
                            <h5 className='modal-title'>Add Category</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label="Close">
                                <span>
                                    <i className='fas fa-times'></i>
                                </span>
                            </button>
                        </div>

                        {/* modal body */}
                        <div className='modal-body my-2'>
                            {clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)}
                            {successMsg && showSuccessMsg(successMsg)}
                            {errorMsg && showErrorMsg(errorMsg)}
                            {loading ? <div className="text-center"> {showLoading()} </div> : (
                                <Fragment>
                                    <label className='text-secondary'>Category</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='name'
                                        value={category.name}
                                        onChange={handleCategoryChange}
                                    />
                                    <label className='text-secondary'>Description</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='description'
                                        value={category.description}
                                        onChange={handleCategoryChange}
                                    />
                                </Fragment>
                            )}
                        </div>

                        {/* modal footer */}
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
        </div>
    )
};

export default StaffCategoryModal;