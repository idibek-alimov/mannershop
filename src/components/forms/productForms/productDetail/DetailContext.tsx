import React, { createContext, useContext } from "react";
import {
  ArticleDetail,
  emptyArticle,
} from "../../../../extra/types/ArticleDetail";
import { Inventory } from "../../../../extra/types/Inventory";

export interface OtherColorProp {
  id: number;
  mainPic: string;
}

export interface ExtraProp {
  mainPic: string;
  chosenInventory?: Inventory;
  colors: OtherColorProp[];
  pictureDetailShow: boolean;
  scrollIndex: number;
}
let data: ExtraProp = {
  mainPic: "",
  colors: [],
  pictureDetailShow: false,
  scrollIndex: 0,
};

export type GlobalContent = {
  article: ArticleDetail;
  extra?: ExtraProp;
  articleDispatch: React.Dispatch<any>;
  extraDispatch: React.Dispatch<any>;
  getArticle: (articleId: string | number | undefined) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  article: emptyArticle,
  extra: data,
  articleDispatch: () => null,
  extraDispatch: () => null,
  getArticle: (articleId: string | number | undefined) => null,
});

export const useGlobalContext = () => useContext(MyGlobalContext);
