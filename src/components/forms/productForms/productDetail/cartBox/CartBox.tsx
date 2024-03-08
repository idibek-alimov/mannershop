import React from "react";
import "./CartBox.css";
import { useGlobalContext } from "../DetailContext";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import { addToCart } from "../../../../../store/features/cart/cartSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Axios, { url } from "../../../../../extra/axios";
import { useNavigate } from "react-router-dom";
import { ArticleActionsKind } from "../detailReducer";
const CartBox = () => {
  const { extra, article, getArticle, articleDispatch, extraDispatch } =
    useGlobalContext();
  const authenticated = useAppSelector((state) => state.token.authenticated);
  const axios = Axios();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onAddToCart = () => {
    if (!extra?.chosenInventory) {
      alert("Пожалуста выберите размер");
    } else {
      dispatch(addToCart({ ...article, inventory: extra.chosenInventory }));
    }
  };

  const onLike = () => {
    if (authenticated) {
      console.log(1);
      articleDispatch({
        type: ArticleActionsKind.CHANGE_LIKE,
        payload: "hll",
      });
      console.log(2);
      axios
        .get(url + "/api/v1/like/" + article.id)
        .then((res) => console.log(res))
        .catch((err) => console.log("the error", err.toJSON()));
    } else {
      navigate("/authenticate");
    }
  };
  return (
    <div className="cart-box">
      <div className="cart-wrapper">
        <div className="price-box large-screen">
          <div className="price-wrapper">
            <div className="price">{article.price} c.</div>
            {article.prevPrice != null ? (
              <del className="prev-price">{article.prevPrice} c.</del>
            ) : (
              ""
            )}
          </div>
          {article.like ? (
            <AiFillHeart onClick={onLike} className="like-icon" />
          ) : (
            <AiOutlineHeart onClick={onLike} className="like-icon" />
          )}
        </div>
        <div className="button-box">
          <button className="cart-button" onClick={onAddToCart}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartBox;
