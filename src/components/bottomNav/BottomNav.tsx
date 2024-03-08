import React from "react";
import "./BottomNav.css";
import { PiHouseBold } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSolidCartAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { MdManageSearch } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
const BottomNav = () => {
  const navigate = useNavigate();
  const cartArticles = useAppSelector((state) => state.cart.cart_products);
  let itemCount = 0;

  cartArticles.forEach((article) => {
    if (article.amount) {
      itemCount += article.amount;
    } else {
      itemCount += 1;
    }
  });

  return (
    <div className="bottom-nav-box small-screen">
      <div className="bottom-nav-wrapper">
        <div className="bottom-nav-item" onClick={() => navigate("/")}>
          <PiHouseBold className="bottom-nav-icon" />
        </div>
        <div
          className="bottom-nav-item"
          onClick={() => navigate("/manage/category")}
        >
          <TbListSearch className="bottom-nav-icon" />
        </div>
        <div
          className="bottom-nav-item"
          onClick={() => navigate("/profile/liked")}
        >
          <AiOutlineHeart className="bottom-nav-icon" />
        </div>
        <div className="bottom-nav-item">
          <BiSolidCartAlt
            className="bottom-nav-icon"
            onClick={() => navigate("/cart")}
          />
          {itemCount !== 0 ? (
            <div className="item-count-box">{itemCount}</div>
          ) : (
            ""
          )}
        </div>
        <div className="bottom-nav-item">
          <BsFillPersonFill
            className="bottom-nav-icon"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
