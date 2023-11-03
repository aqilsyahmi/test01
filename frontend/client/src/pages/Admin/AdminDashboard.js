import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUserPlus, FaKey} from "react-icons/fa6";

const AdminDashboard = () => {

    /*RENDER*/
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
                    <div className="position-sticky">
                        <ul className="nav flex-column">

                            <li className="nav-item">

                                <NavLink to="/admin/dashboard/staffs" className="nav-link" activeClassName="active">
                                    <FaUserPlus /> Add New Staff
                                </NavLink>

                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/dashboard/password" className="nav-link" activeClassName="active">
                                    <FaKey /> Reset Password
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
                            <i>Admin Dashboard</i>
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
}

export default AdminDashboard;
