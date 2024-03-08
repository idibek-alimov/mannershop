import React from "react";
import "./CartArticle.css";
import {
  CartArticle as CartArticleType,
  changeAmount,
  removeFromCart,
} from "../../../store/features/cart/cartSlice";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineDelete,
} from "react-icons/ai";
import { useAppDispatch } from "../../../store/hooks";

const CartArticle = (article: CartArticleType) => {
  const dispatch = useAppDispatch();
  return (
    <div className="cart-article-box-parent">
      <div className="cart-article-box">
        <div className="img-box box-one">
          <img className="cart-article-img" src={article.mainPic} />
        </div>
        <div className="article-info-box box-two">
          <div className="article-name small-screen">{article.price} C.</div>
          <div className="article-name">{article.name}</div>
          <div className="article-color-and-size">
            <div className="article-color">{article.color}</div>
            <div className="article-size">{article.inventory.size}</div>
          </div>
        </div>
        <div className="article-amount-box large-screen box-three">
          <div
            className="icon-box"
            onClick={() => {
              if (article.amount && article.amount !== 1)
                dispatch(
                  changeAmount({
                    id: article.id,
                    inventoryId: article.inventory.id,
                    size: article.inventory,
                    amount: article.amount - 1,
                  })
                );
            }}
          >
            <AiOutlineMinus className="icon" />
          </div>
          <div className="counter">{article.amount}</div>
          <div
            className="icon-box"
            onClick={() => {
              if (article.amount)
                dispatch(
                  changeAmount({
                    id: article.id,
                    inventoryId: article.inventory.id,
                    size: article.inventory,
                    amount: article.amount + 1,
                  })
                );
            }}
          >
            <AiOutlinePlus className="icon" />
          </div>
        </div>
        <div className="price-and-delete large-screen box-four">
          <div className="price-box">
            <div className="article-price-box">
              {article.amount ? article.amount * article.price : article.price}{" "}
              C.
            </div>
            {article.prevPrice ? (
              <del className="article-prev-price-box">
                {article.amount && article.prevPrice
                  ? article.amount * article.prevPrice
                  : article.prevPrice}{" "}
                C.
              </del>
            ) : (
              ""
            )}
          </div>
          <div>
            {/* {article.like ? <AiFillHeart /> : <AiOutlineHeart />} */}
            <AiOutlineDelete
              className="delete-icon"
              onClick={() =>
                dispatch(removeFromCart({ inventoryId: article.inventory.id }))
              }
            />
          </div>
        </div>
      </div>
      <div className="cart-bottom-box small-screen">
        <div className="article-amount-box">
          <div
            className="icon-box"
            onClick={() => {
              if (article.amount && article.amount !== 1)
                dispatch(
                  changeAmount({
                    id: article.id,
                    inventoryId: article.inventory.id,
                    size: article.inventory,
                    amount: article.amount - 1,
                  })
                );
            }}
          >
            <AiOutlineMinus className="icon" />
          </div>
          <div className="counter">{article.amount}</div>
          <div
            className="icon-box"
            onClick={() => {
              if (article.amount)
                dispatch(
                  changeAmount({
                    id: article.id,
                    inventoryId: article.inventory.id,
                    size: article.inventory,
                    amount: article.amount + 1,
                  })
                );
            }}
          >
            <AiOutlinePlus className="icon" />
          </div>
        </div>
        <div className="delete-small-box">
          <AiOutlineDelete
            className="delete-icon"
            onClick={() =>
              dispatch(removeFromCart({ inventoryId: article.inventory.id }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CartArticle;
