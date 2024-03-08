import React, { useEffect, useState } from "react";
import "./SearchList.css";
import { useParams } from "react-router-dom";
import { ArticleUp } from "../../../extra/types/ArticleUp";
import Axios, { url } from "../../../extra/axios";
import List from "../list/List";
import CircleM from "../../../extra/circlem/CircleM";
import { useAppSelector } from "../../../store/hooks";
const SearchList = () => {
  let { text } = useParams();
  const [articles, setArticles] = useState<ArticleUp[]>();
  const axios = Axios();
  const search = useAppSelector((state) => state.search.text);

  useEffect(() => {
    setArticles(undefined);
    axios
      .get(url + "/api/v1/article/search/" + text + "/0/10")
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  }, [text]);

  return (
    <div className="search-box">
      <div className="search-text">
        Результаты по запросу <span>{text}</span>
      </div>
      {articles ? (
        <div>
          {articles.length !== 0 ? (
            <List articles={articles} />
          ) : (
            <div className="feedback-text">
              По запросу {text} ничего не найдено
            </div>
          )}
        </div>
      ) : (
        <CircleM />
      )}
    </div>
  );
};

export default SearchList;
