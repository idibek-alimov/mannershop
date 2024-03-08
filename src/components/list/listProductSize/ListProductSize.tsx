import React from "react";
import { ArticleUp } from "../../../extra/types/ArticleUp";
import ProductUp from "../../forms/productForms/productUp/ProductUp";
import "./ListProductSize.css";
import { ArticleOrder } from "../../../extra/types/ArticleOrder";
import ProductUpSize from "../../forms/productForms/productUpSize/ProductUpSize";
import CircleM from "../../../extra/circlem/CircleM";

interface articleList {
  articles: ArticleOrder[];
}

const ListProductOrder: React.FC<articleList> = ({
  articles,
}: articleList): JSX.Element => {
  return (
    <div className="list-box">
      {articles ? (
        articles.map((article, index) => {
          return <ProductUpSize article={article} key={article.id} />;
        })
      ) : (
        <CircleM />
      )}
    </div>
  );
};

export default ListProductOrder;
