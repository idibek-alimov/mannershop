import React from "react";
import "./ProductUpSize.css";
import { ArticleUp } from "../../../../extra/types/ArticleUp";
import { useNavigate } from "react-router-dom";
import { ArticleOrder } from "../../../../extra/types/ArticleOrder";
interface Prop {
  article: ArticleOrder;
}
const ProductUpSize = ({ article }: Prop) => {
  const navigate = useNavigate();
  return (
    <div
      className="size-product-up-box"
      onClick={() => {
        navigate("/detail/" + article.id);
        window.scroll(0, 0);
      }}
    >
      <div className="size-box">{article.size}</div>
      <img src={article.pic} className="size-product-up-img" />
      <div className="size-product-up-bottom">
        <div className="price-box">{article.price} C.</div>
        <div className="name-box">{article.name}</div>
      </div>
    </div>
  );
};

export default ProductUpSize;
