import React from 'react';
import { isAuthenticated } from '../../helpers/auth';
import NotAuthenticated from '../../components/NotAuthen';

const UserRoute = ({ children }) => {
  return (
    <div>{isAuthenticated() && isAuthenticated().userrole === "user" ?    <div>
      {children}
    </div> : <NotAuthenticated />}
   

    </div>
  );
};

export default UserRoute;