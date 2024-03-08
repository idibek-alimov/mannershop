import React from "react";
import "./Nav.css";
import { Route, Routes } from "react-router-dom";
import Main from "../list/main/Main";
import ProductDetail from "../forms/productForms/productDetail/ProductDetail";
import SearchList from "../list/searchList/SearchList";
import Register from "../auth/register/Register";
import Profile from "../profile/Profile";
import Cart from "../cart/Cart";
import CartSuccess from "../cart/cartSuccess/CartSuccess";
import Shipping from "../profile/shipping/Shipping";
import Delivered from "../profile/delivered/Delivered";
import Liked from "../profile/liked/Liked";
import ProfileWrapper from "../profile/ProfileWrapper";
import Authenticate from "../auth/authenticate/Authenticate";
import CartWrapper from "../cart/CartWrapper";
import ManageCategory from "../manageCategory/ManageCategory";
import ByCategory from "../list/byCategory/ByCategory";
const Nav = () => {
  return (
    <div className="nav-box">
      <div className="nav-wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/manage/category" element={<ManageCategory />} />
          <Route path="/by/category/:id" element={<ByCategory />} />
          <Route path="/search/:text" element={<SearchList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/profile/*" element={<ProfileWrapper />} />
          <Route path="/cart" element={<CartWrapper />} />
          <Route path="/cart/success" element={<CartSuccess />} />
        </Routes>
      </div>
    </div>
  );
};

export default Nav;
