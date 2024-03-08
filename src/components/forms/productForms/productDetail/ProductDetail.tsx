import React, { useEffect, useReducer, useRef, useState } from "react";
import "./ProductDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import Axios, { url } from "../../../../extra/axios";
import {
  ArticleDetail,
  emptyArticle,
} from "../../../../extra/types/ArticleDetail";
import {
  ArticleActionsKind,
  ExtraActionsKind,
  articleReducer,
  extraReducer,
} from "./detailReducer";
import { MyGlobalContext } from "./DetailContext";
import ChooseColor from "./chooseColor/ChooseColor";
import ChooseInventory from "./chooseInventory/ChooseInventory";
import CartBox from "./cartBox/CartBox";
import { useAppSelector } from "../../../../store/hooks";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CircleM from "../../../../extra/circlem/CircleM";
import PictureDetail from "./pictureDetail/PictureDetail";

const ProductDetail = () => {
  let { id } = useParams();
  const [article, articleDispatch] = useReducer(articleReducer, emptyArticle);
  const [showDescription, setShowDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [extra, extraDispatch] = useReducer(extraReducer, {
    mainPic: "",
    colors: [],
    pictureDetailShow: false,
    scrollIndex: 0,
  });
  const navigate = useNavigate();
  const authenticated = useAppSelector((state) => state.token.authenticated);
  const onLike = () => {
    if (authenticated) {
      console.log(1);
      articleDispatch({
        type: ArticleActionsKind.CHANGE_LIKE,
        payload: 12,
      });
      axios
        .get(url + "/api/v1/like/" + article.id)
        .then((res) => console.log(res))
        .catch((err) => console.log("the error", err.toJSON()));
    } else {
      navigate("/authenticate");
    }
  };
  const axios = Axios();
  const getArticle = (articleId: string | number | undefined) => {
    setLoading(true);
    if (ref !== null) {
      ref.current?.scroll(0, 0);
    }
    window.scroll(0, 0);
    axios
      .get(url + "/api/v1/article/" + articleId)
      .then((res) => {
        setLoading(false);
        console.log("artice", res.data);
        articleDispatch({
          type: ArticleActionsKind.ADD_ARTICLE,
          payload: res.data,
        });
        extraDispatch({
          type: ExtraActionsKind.ADD_MAIN_PIC,
          payload: res.data.mainPic,
        });
        extraDispatch({
          type: ExtraActionsKind.REMOVE_INVENTORY,
          payload: "hello",
        });
      })
      .catch((err) => setLoading(false));
    axios
      .get(url + "/api/v1/article/colors/" + articleId)
      .then((res) => {
        extraDispatch({
          type: ExtraActionsKind.ADD_COLORS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getArticle(id);
  }, []);
  const setMainPic = (pic: string) => {
    extraDispatch({
      type: ExtraActionsKind.ADD_MAIN_PIC,
      payload: pic,
    });
  };
  const onPictureClick = (index: number) => {
    extraDispatch({
      type: ExtraActionsKind.CHANGE_PICTURE_MAIN_SHOW,
      payload: true,
    });
    extraDispatch({
      type: ExtraActionsKind.CHANGE_SCROLL_INDEX,
      payload: index,
    });
  };
  return (
    <MyGlobalContext.Provider
      value={{ article, extra, articleDispatch, extraDispatch, getArticle }}
    >
      {loading ? <CircleM /> : ""}
      <div className="product-detail-box">
        {article.id !== 0 ? (
          <div>
            <div className="product-detail-wrapper">
              {extra.pictureDetailShow ? <PictureDetail /> : ""}

              <div className="product-detail-top large-screen">
                <div className="product-detail-name">{article.name}</div>
              </div>
              <div className="product-detail-bottom">
                <div
                  className="pic-choose "
                  // style={{ scrollMarginInlineStart: article ? 0 : "" }}
                  ref={ref}
                >
                  <div className="like-mini-box small-screen">
                    {article.like ? (
                      <AiFillHeart onClick={onLike} className="like-icon" />
                    ) : (
                      <AiOutlineHeart onClick={onLike} className="like-icon" />
                    )}
                  </div>
                  <img
                    src={article.mainPic}
                    className="pic-choose-img"
                    onClick={() => {
                      setMainPic(article.mainPic);
                      onPictureClick(0);
                    }}
                  />
                  {article.pics.map((pic, index) => (
                    <img
                      src={pic}
                      className="pic-choose-img"
                      onClick={() => {
                        setMainPic(pic);
                        onPictureClick(1 + index);
                      }}
                    />
                  ))}
                </div>
                <div className="main-pic large-screen">
                  <img
                    src={
                      extra.mainPic !== ""
                        ? extra.mainPic
                        : "https://basket-09.wb.ru/vol1233/part123322/123322921/images/c516x688/1.webp"
                    }
                    className="main-img"
                  />
                </div>
                <div className="detail-right">
                  <div className="price-box small-screen">
                    {article.price} C.
                  </div>
                  <div className="product-color-box">
                    {"Цвет: "}
                    <div className="product-color">{article.color}</div>
                  </div>
                  <ChooseColor />
                  <ChooseInventory />
                  <div className="break small-screen"></div>
                  <div className="product-name-box small-screen">
                    {article.name}
                  </div>
                  <div className="break small-screen"></div>
                  <div className="product-detail-text-box">
                    {"Описание: "}
                    {article.description.length > 600 ? (
                      <div className="product-detail-text-wrapper">
                        {showDescription ? (
                          <div>
                            <div className="detail-overflow-visible">
                              {article.description}
                            </div>
                            <div
                              onClick={() => setShowDescription(false)}
                              className="fold-box"
                            >
                              Свернуть описание
                            </div>
                          </div>
                        ) : (
                          <div className="">
                            <div className="detail-overflow-hidden">
                              {article.description}
                            </div>
                            <div
                              onClick={() => setShowDescription(true)}
                              className="fold-box glow"
                            >
                              Развернуть описание
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="product-detail-text">
                        {article.description.slice(0, 600)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="add-to-cart-box">
                  <CartBox />
                </div>
              </div>
            </div>
            <div className="product-detail-wrapper small-screen"></div>
          </div>
        ) : (
          <CircleM />
        )}
      </div>
    </MyGlobalContext.Provider>
  );
};

export default ProductDetail;
