import React, { useEffect, useState } from "react";
import "./Liked.css";
import List from "../../list/list/List";
import { ArticleUp } from "../../../extra/types/ArticleUp";
import Axios, { url } from "../../../extra/axios";
import CircleM from "../../../extra/circlem/CircleM";
const Liked = () => {
  const [articles, setArticles] = useState<ArticleUp[]>([]);
  const [loading, setLoading] = useState(true);
  const axios = Axios();
  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(url + "/api/v1/article/user/liked")
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="liked-box">
      {/* <div className="liked-text">Избранное</div> */}
      <div className="liked-wrapper">
        {articles.length !== 0 ? (
          <List articles={articles} />
        ) : (
          <div className="no-content-text">
            {loading ? (
              <CircleM />
            ) : (
              <div className="no-content-text">
                В избранном пока пусто <br />
                Сохраняйте товары, которые понравились, чтобы долго не искать
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Liked;
