import React from "react";

export const AddCategoryButton = () => (
    <div>
        <div className='container'>
            <div className='row pb-3'>
                <div className='col-md-4 my-1'>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addCategoryModal"
                    >
                        <i>Add Category</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export const AddProductButton = () => (
    <div>
        <div className='container'>
            <div className='col-md-4 my-1'>
                <button
                    type="button"
                    className='btn btn-primary'
                    data-bs-toggle='modal'
                    data-bs-target='#addProductModal'
                >
                    <i>Add Product</i>
                </button>
            </div>
        </div>
    </div>
);
