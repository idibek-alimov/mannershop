import React, { useEffect, useState } from "react";
import { ArticleUp } from "../../../extra/types/ArticleUp";
import List from "../list/List";
import Axios, { url } from "../../../extra/axios";
import CircleM from "../../../extra/circlem/CircleM";

const Main = () => {
  const [articles, setArticles] = useState<ArticleUp[]>();
  const axios = Axios();
  useEffect(() => {
    axios
      .get(url + "/api/v1/article/0/10")
      .then((res) => {
        console.log(res.data);
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>{articles ? <List articles={articles} /> : <CircleM />}</div>;
};

export default Main;
