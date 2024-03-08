import React, { useEffect, useState } from "react";
import "./Shipping.css";
import { ArticleOrder } from "../../../extra/types/ArticleOrder";
import Axios, { url } from "../../../extra/axios";
import ListProductOrder from "../../list/listProductSize/ListProductSize";
import CircleM from "../../../extra/circlem/CircleM";
const Shipping = () => {
  const [articles, setArticles] = useState<ArticleOrder[]>();
  const [loading, setLoading] = useState(true);
  const axios = Axios();
  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(url + "/api/v1/article/ordered/shipping")
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="liked-box">
      {/* <div className="liked-text">Доставки</div> */}
      <div className="liked-wrapper">
        {articles ? (
          <ListProductOrder articles={articles} />
        ) : (
          <div className="no-content-text">
            {loading ? (
              <CircleM />
            ) : (
              <div className="no-content-text">
                Доставок в ближайшем не ожидается
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipping;
