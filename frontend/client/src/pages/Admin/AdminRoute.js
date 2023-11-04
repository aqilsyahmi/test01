import React from 'react';
import { isAuthenticated } from '../../helpers/auth';
import NotAuthenticated from '../../components/NotAuthen';

const AdminRoute = ({ children }) => {
  return (
    <div>{isAuthenticated() && isAuthenticated().userrole === "admin" ?    <div>
      {children}
    </div> : <NotAuthenticated />}
   

    </div>
  );
};

export default AdminRoute;
