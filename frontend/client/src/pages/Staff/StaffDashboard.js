import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaTags, FaReceipt, FaBoxOpen} from "react-icons/fa6";

const StaffDashboard = () => {
   
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
                    <div className="position-sticky">
                        <ul className="nav flex-column">
                            {/* <li className="nav-item">
                                <NavLink to="/staff/dashboard" className="nav-link" activeClassName="active">
                                    Dashboard
                                </NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink to="/staff/dashboard/products" className="nav-link" activeClassName="active">
                                    <FaBoxOpen/> Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/staff/dashboard/categories" className="nav-link" activeClassName="active">
                                    <FaTags/> Categories
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/staff/dashboard/orders" className="nav-link" activeClassName="active">
                                    <FaReceipt/> Orders
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {/* Header */}
                    <div className="pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">
                            <i>Staff Dashboard</i>
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="main-content">
                        <Outlet />
                       
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StaffDashboard;
