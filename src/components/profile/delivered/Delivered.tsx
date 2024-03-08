import React, { useEffect, useState } from "react";
import "./Delivered.css";
import { ArticleOrder } from "../../../extra/types/ArticleOrder";
import Axios, { url } from "../../../extra/axios";
import ListProductOrder from "../../list/listProductSize/ListProductSize";
import CircleM from "../../../extra/circlem/CircleM";
const Delivered = () => {
  const [articles, setArticles] = useState<ArticleOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const axios = Axios();
  useEffect(() => {
    window.scroll(0, 0);
    // setTimeout(() => {
    //   console.log(1);
    // }, 1000);
    axios
      .get(url + "/api/v1/article/ordered/delivered")
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="liked-box">
      {/* <div className="liked-text">Покупки</div> */}
      {/* {articles ? ( */}
      <div className="liked-wrapper">
        {articles.length !== 0 ? (
          <ListProductOrder articles={articles} />
        ) : (
          <div className="no-content-text">
            {loading ? (
              <CircleM />
            ) : (
              <div className="no-content-text">В покупках пока пусто</div>
            )}
          </div>
        )}
      </div>
      {/* // ) : (
      //   <CircleM />
      // )} */}
    </div>
  );
};

export default Delivered;
