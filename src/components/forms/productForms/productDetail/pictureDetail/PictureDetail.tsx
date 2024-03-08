import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../DetailContext";
import "./PictureDetail.css";
import { ExtraActionsKind } from "../detailReducer";
import { IoCloseSharp } from "react-icons/io5";

const PictureDetail = () => {
  const { article, extraDispatch, extra } = useGlobalContext();
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement[]>([]);

  const onPictureClick = (index: number) => {
    if (imgRef.current[index] !== null) {
      imgRef.current[index].scrollIntoView();
    }
    extraDispatch({
      type: ExtraActionsKind.CHANGE_SCROLL_INDEX,
      payload: index,
    });
  };
  useEffect(() => {
    if (extra?.scrollIndex && imgRef.current[extra?.scrollIndex] !== null) {
      imgRef.current[extra.scrollIndex].scrollIntoView();
    }
  }, [extra?.scrollIndex]);

  return (
    <div className="small-screen picture-detail-show-box">
      {/* <div className="picture-detail-show-background"></div> */}
      <div className="top">
        <div
          className="exit"
          onClick={() => {
            extraDispatch({
              type: ExtraActionsKind.CHANGE_PICTURE_MAIN_SHOW,
              payload: false,
            });
          }}
        >
          <IoCloseSharp className="close-icon" />
        </div>
      </div>
      <div className="middle" ref={ref}>
        {/* <div className="large-picture-box"> */}
        <img
          src={article.mainPic}
          className="large-picture"
          // id={"middle-pic-" + 0}
          ref={(el) => {
            if (el) {
              imgRef.current[0] = el;
            }
          }}
        />
        {/* </div> */}
        {article.pics.map((pic, index) => (
          //   <div className="large-picture-box">
          <img
            src={pic}
            className="large-picture"
            // id={"middle-pic-" + (index + 1)}
            ref={(el) => {
              if (el) {
                imgRef.current[1 + index] = el;
              }
            }}
            // ref={
            //   extra?.scrollIndex && extra.scrollIndex === index + 1
            //     ? newRef
            //     : randomRef
            // }
          />
          //   </div>
        ))}
      </div>
      <div className="bottom">
        <div className="small-picture-box" onClick={() => onPictureClick(0)}>
          <img
            src={article.mainPic}
            className={
              extra?.scrollIndex === 0
                ? "small-picture chosen-img"
                : "small-picture "
            }
          />
        </div>
        {article.pics.map((pic, index) => (
          <div
            className="small-picture-box"
            onClick={() => onPictureClick(index + 1)}
          >
            <img
              src={pic}
              className={
                extra?.scrollIndex === 1 + index
                  ? "small-picture chosen-img"
                  : "small-picture "
              }
            />
          </div>
        ))}
      </div>
      {/* <div className="picture-detail-show-wrapper"></div> */}
    </div>
  );
};

export default PictureDetail;
