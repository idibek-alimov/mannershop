import React, { useEffect } from "react";
import "./Profile.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { PiHouseBold } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck, BsFillPersonFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import Shipping from "./shipping/Shipping";
import Delivered from "./delivered/Delivered";
import Liked from "./liked/Liked";
import UserInfo from "./userInfo/UserInfo";
import { useAppSelector } from "../../store/hooks";
import CircleM from "../../extra/circlem/CircleM";
const ProfileWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = useAppSelector((state) => state.token.authenticated);

  useEffect(() => {
    if (!authenticated) {
      navigate("/authenticate");
    }
  }, []);
  return (
    <div>
      {authenticated ? (
        <div>
          <div className="profile-nav large-screen">
            <div
              className="profile-nav-item-box"
              style={
                location.pathname === "/profile" ? { color: "blueviolet" } : {}
              }
              onClick={() => navigate("/profile")}
            >
              <PiHouseBold className="profile-nav-icon" />
              <div className="profile-nav-item-text">Главная</div>
            </div>
            <div
              className="profile-nav-item-box"
              style={
                location.pathname === "/profile/liked"
                  ? { color: "blueviolet" }
                  : {}
              }
              onClick={() => navigate("/profile/liked")}
            >
              <AiOutlineHeart className="profile-nav-icon" />
              <div className="profile-nav-item-text">Избранное</div>
            </div>
            <div
              className="profile-nav-item-box"
              style={
                location.pathname === "/profile/delivered"
                  ? { color: "blueviolet" }
                  : {}
              }
              onClick={() => navigate("/profile/delivered")}
            >
              <BsBagCheck className="profile-nav-icon" />
              <div className="profile-nav-item-text">Покупки</div>
            </div>
            <div
              className="profile-nav-item-box"
              style={
                location.pathname === "/profile/shipping"
                  ? { color: "blueviolet" }
                  : {}
              }
              onClick={() => navigate("/profile/shipping")}
            >
              <TbTruckDelivery className="profile-nav-icon" />
              <div className="profile-nav-item-text">Доставки</div>
            </div>
            <div
              className="profile-nav-item-box"
              style={
                location.pathname === "/profile/person"
                  ? { color: "blueviolet" }
                  : {}
              }
              onClick={() => navigate("/profile/person")}
            >
              <BsFillPersonFill className="profile-nav-icon" />
              <div className="profile-nav-item-text">Профиль</div>
            </div>
          </div>
          <Routes>
            <Route index path="" element={<Profile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/delivered" element={<Delivered />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/person" element={<UserInfo />} />
          </Routes>
        </div>
      ) : (
        <CircleM />
      )}
    </div>
  );
};

export default ProfileWrapper;
