import React, { useEffect, useState } from "react";
import "./ByCategory.css";
import { useParams } from "react-router-dom";
import Axios, { url } from "../../../extra/axios";
import { ArticleUp } from "../../../extra/types/ArticleUp";
import List from "../list/List";
import CircleM from "../../../extra/circlem/CircleM";

const ByCategory = () => {
  let { id } = useParams();
  const [articles, setArticles] = useState<ArticleUp[]>();

  const axios = Axios();
  useEffect(() => {
    axios
      .get(url + "/api/v1/article/category/" + id)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {articles ? (
        <div style={{ position: "relative" }}>
          {articles.length > 0 ? (
            <List articles={articles} />
          ) : (
            <div className="sorry-text">
              К сожалению по данной котегории продуктов пока что нет
            </div>
          )}
        </div>
      ) : (
        <CircleM />
      )}
    </div>
  );
};

export default ByCategory;
