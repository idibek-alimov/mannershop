import React, { LegacyRef, MutableRefObject, useRef, useState } from "react";
import "./ChooseColor.css";
import { useGlobalContext } from "../DetailContext";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const ChooseColor = () => {
  const { extra, article, getArticle } = useGlobalContext();
  const ref = useRef<HTMLDivElement>(null);
  const onScroll = (offset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += offset;
    }
  };
  return (
    <div className="choose-color-box">
      <div
        onClick={() => onScroll(-20)}
        className="left-right"
        style={
          extra?.colors && extra.colors.length < 3 ? { display: "none" } : {}
        }
      >
        <AiOutlineArrowLeft className="icon" />
      </div>
      <div className="choose-color-wrapper" ref={ref}>
        {extra?.colors
          ? extra.colors.map((pic, index) => (
              <div
                className={
                  pic.id == article.id ? "pic-box chosen-color" : "pic-box"
                }
              >
                <img
                  className="color-pic"
                  src={pic.mainPic}
                  key={pic.id}
                  onClick={() => {
                    if (pic.id !== article.id) {
                      getArticle(pic.id);
                    }
                  }}
                />
              </div>
            ))
          : ""}
      </div>
      <div
        onClick={() => onScroll(20)}
        className="left-right"
        style={
          extra?.colors && extra.colors.length < 3 ? { display: "none" } : {}
        }
      >
        <AiOutlineArrowLeft className="icon rotate" />
      </div>
    </div>
  );
};

export default ChooseColor;
