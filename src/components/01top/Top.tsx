import React, { useState } from "react";
import "./Top.css";
import { BsPerson, BsCart2, BsSearch } from "react-icons/bs";
import { useNavigate, useNavigation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addSearchText } from "../../store/features/search/searchSlice";
import { current } from "@reduxjs/toolkit";
const Top = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let cartCount = 0;
  useAppSelector((state) => state.cart.cart_products).forEach((item) => {
    if (item.amount) {
      cartCount += item.amount;
    } else {
      cartCount += 1;
    }
  });
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState<string>();
  const authenticated = useAppSelector((state) => state.token.authenticated);

  const onSearchCommit = () => {
    let inputItem = document.getElementById("small-input");
    if (inputItem !== null) {
      inputItem.blur();
    }
    //event.preventDefault();
    if (searchText && searchText.length !== 0) {
      dispatch(addSearchText(searchText));
      navigate("/search/" + searchText);
    }
  };

  return (
    <div className="top-box">
      <div className="top-wrapper large-screen">
        <div className="logo-box" onClick={() => navigate("/")}>
          <div className="logo-text">manner</div>
          {/* <img
            src="../mainLogo.svg"
            width={180}
            height={50}
            onClick={() => navigate("/")}
          /> */}
        </div>
        <div className="search-box">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSearchCommit();
            }}
            spellCheck={false}
          >
            <input
              className="search-input"
              placeholder="Я ищу.."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </form>
        </div>
        <div className="menu-box">
          <div
            className="icon-box"
            onClick={() => {
              authenticated ? navigate("/profile") : navigate("/authenticate");
            }}
          >
            <BsPerson className="menu-icon" />
            <span className="icon-text">
              {authenticated ? "Профиль" : "Войти"}
            </span>
          </div>
          <div className="icon-box" onClick={() => navigate("/cart")}>
            <BsCart2 className="menu-icon" />
            {cartCount !== 0 ? (
              <div className="cart-count-box">{cartCount}</div>
            ) : (
              ""
            )}
            <span className="icon-text">Корзина</span>
          </div>
        </div>
      </div>
      <div className="top-wrapper small-screen">
        {!show ? (
          <div className="content-wrapper">
            <h1 className="logo" onClick={() => navigate("/")}>
              manner
            </h1>
            <BsSearch className="icon" onClick={() => setShow(true)} />
          </div>
        ) : (
          <form
            className="content-wrapper"
            onSubmit={(event) => {
              event.preventDefault();
              onSearchCommit();
            }}
          >
            <div className="input-box">
              <input
                spellCheck={false}
                value={searchText}
                id="small-input"
                onChange={(event) => setSearchText(event.target.value)}
                // onSubmit={onSearchCommit}
                onSubmit={(event) => {
                  event.preventDefault();
                  onSearchCommit();
                }}
              />
            </div>
            <div className="cancel-text" onClick={() => setShow(false)}>
              Отмена
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Top;
