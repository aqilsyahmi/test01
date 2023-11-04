import React from 'react';
import { isAuthenticated } from '../../helpers/auth';
import NotAuthenticated from '../../components/NotAuthen';

const StaffRoute = ({ children }) => {
    return (
        <div>
            <div>{isAuthenticated() && isAuthenticated().userrole === "staff" ? <div>
                {children}
            </div> : <NotAuthenticated />}


            </div>

        </div>
    );
};
export default StaffRoute;
