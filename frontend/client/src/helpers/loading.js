import React, { Fragment } from "react";


export const showLoading = () => (
    <Fragment>
        <div>
            loading...
        </div>

        <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only"></span>
        </div>


    </Fragment>
)