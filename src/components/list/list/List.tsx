import React from "react";
import { ArticleUp } from "../../../extra/types/ArticleUp";
import ProductUp from "../../forms/productForms/productUp/ProductUp";
import "./List.css";
import CircleM from "../../../extra/circlem/CircleM";

interface articleList {
  articles: ArticleUp[];
}

const List: React.FC<articleList> = ({
  articles,
}: articleList): JSX.Element => {
  return (
    <div className="l-list-wrapper">
      <div className="l-list-box">
        {articles.map((article, index) => {
          return <ProductUp article={article} key={article.id} />;
        })}
      </div>
    </div>
  );
};

export default List;
