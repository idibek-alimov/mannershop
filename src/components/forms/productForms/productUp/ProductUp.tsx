import React from "react";
import "./ProductUp.css";
import { ArticleUp } from "../../../../extra/types/ArticleUp";
import { useNavigate } from "react-router-dom";
interface Prop {
  article: ArticleUp;
}
const ProductUp = ({ article }: Prop) => {
  const navigate = useNavigate();
  return (
    <div
      className="product-up-box mini-product-up-box"
      onClick={() => {
        navigate("/detail/" + article.id);
        window.scroll(0, 0);
      }}
    >
      <div className="product-up-img-box">
        <img src={article.pic} className="product-up-img" />
        <div className="product-up-discount-box">
          {article.discount ? <div>- {article.discount}%</div> : ""}
        </div>
      </div>
      <div className="product-up-bottom">
        <div className="price-box">
          <div className="price">{article.price} c.</div>
          {article.prevPrice ? (
            <del className="prev-price">{article.prevPrice} c.</del>
          ) : (
            ""
          )}
        </div>
        <div className="name-box name-ellipsis">{article.name}</div>
      </div>
    </div>
  );
};

export default ProductUp;
