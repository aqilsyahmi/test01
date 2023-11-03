import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout, getUserRole } from '../helpers/auth';
import orders from '../Images/png-clipart-computer-icons-icon-design-order-icon-cdr-angle.png'

const Navbar = () => {

  const navigate = useNavigate();
  const handleLogout = evt => {
    logout(() => {
      navigate('/login');
    });
  }

  const username = isAuthenticated() ? isAuthenticated().username : null;
  const userRole = isAuthenticated() ? getUserRole() : null;

  //views
  const showNavigation = () => (
    <nav className="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <Link to='/' className="navbar-brand">
          EzShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">

            {/* Admin */}
            {userRole === "admin" && (
              <Fragment>
                <li className='nav-item'>
                  <Link to='/admin/dashboard' className='nav-link'>
                    Admin Dashboard
                  </Link>
                </li>
              </Fragment>
            )}

            {/* Staff */}
            {userRole === "staff" && (
              <Fragment>
                {/* Staff Dashboard */}
                <li className='nav-item'>
                  <Link to='/staff/dashboard' className='nav-link'>
                    Staff Dashboard
                  </Link>
                </li>
              </Fragment>
            )}


            {/* user */}
            {userRole === "user" && (
              <Fragment>
                <li className='nav-item'>
                  <Link to='/user/dashboard' className='nav-link'>
                    User Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                  <img src={orders}  style={{width:"40px",height:"20px",objectFit:"contain"}}/> 
                    Cart
                  </Link>
                </li>

              </Fragment>
            )}

            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile setting
                  </Link>

                </li>

                <li className="nav-item">
                  <button className="btn btn-link text-secondary text-decoration-none pl-0">
                    {username}
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-link text-secondary text-decoration-none pl-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

              </Fragment>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </li>
              </Fragment>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
  //render the view
  return (
    <header id='header'>
      {showNavigation()}
    </header>
  );

}
export default Navbar
