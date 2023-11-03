import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserDashboard from './pages/User/UserDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './pages/Admin/AdminRoute';
import UserRoute from './pages/User/UserRoute';
import StaffRoute from './pages/Staff/StaffRoute';
import NotFound from './components/NotFound';
import Cart from './pages/Cart';
import StaffDashboard from './pages/Staff/StaffDashboard';
import StaffEditProduct from './components/StaffEditProduct';
import ProductDetail from './pages/ProductDetail';
import StaffEditCategory from './components/StaffEditCategory';
import ProductsView from './pages/Staff/ProductsView';
import CategoriesView from './pages/Staff/CategoriesView';
import OrdersView from './pages/Staff/OrdersView';
import AdminAddStaff from './pages/Admin/AdminAddStaff';
import AdminResetPassword from './pages/Admin/AdminResetPassword';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgetpw" element={<ForgetPassword />} />
        <Route path="/resetpw" element={<ResetPassword />} />  
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/profile" element={<Profile/>}/>

        <Route path="/user/dashboard" element={<UserRoute><UserDashboard /></UserRoute>} />

        <Route path="/admin/dashboard/*" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
          <Route path="staffs" element={<AdminAddStaff/>}/>
          <Route path="password" element={<AdminResetPassword/>}/>
        </Route>


        <Route path="/staff/dashboard/*" element={<StaffRoute><StaffDashboard /></StaffRoute>}>
          <Route index element={<ProductsView />} />
          <Route path="products" element={<ProductsView />} />
          <Route path="categories" element={<CategoriesView />} />
          <Route path="orders" element={<OrdersView />} />
          <Route path="categories/:categoryId" element={<StaffEditCategory />} />
          <Route path="products/:productId" element={<StaffEditProduct />} />
        </Route>
        

        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
