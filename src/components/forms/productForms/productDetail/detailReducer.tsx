import { Reducer } from "react";
import { ArticleDetail } from "../../../../extra/types/ArticleDetail";
import { ExtraProp } from "./DetailContext";
import { Inventory } from "../../../../extra/types/Inventory";

export enum ArticleActionsKind {
  ADD_ARTICLE = "ADD_ARTICLE",
  CHANGE_LIKE = "CHANGE_LIKE",
}
export interface AppActionType {
  type: ArticleActionsKind;
  payload: ArticleDetail | number;
}

export const articleReducer = (state: ArticleDetail, action: AppActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ArticleActionsKind.ADD_ARTICLE:
      if (typeof payload === "object" && payload !== null) {
        return { ...payload };
      }
      return state;
    case ArticleActionsKind.CHANGE_LIKE:
      console.log("starting liking in reducer");
      return { ...state, like: !state.like };

    default:
      return state;
  }
};

export enum ExtraActionsKind {
  ADD_MAIN_PIC = "ADD_MAIN_PIC",
  ADD_INVENTORY = "ADD_INVENTORY",
  REMOVE_INVENTORY = "REMOVE_INVENTORY",
  ADD_COLORS = "ADD_COLORS",
  CHANGE_PICTURE_MAIN_SHOW = "CHANGE_PICTURE_MAIN_SHOW",
  CHANGE_SCROLL_INDEX = "CHANGE_SCROLL_INDEX",
}
export interface ExtraActionType {
  type: ExtraActionsKind;
  payload: string | Inventory | boolean | number;
}

export const extraReducer = (state: ExtraProp, action: ExtraActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ExtraActionsKind.ADD_MAIN_PIC:
      if (typeof payload === "string" && payload !== null)
        return { ...state, mainPic: payload };
      else return state;
    case ExtraActionsKind.CHANGE_SCROLL_INDEX:
      if (typeof payload === "number" && payload !== null)
        return { ...state, scrollIndex: payload };
      else return state;
    case ExtraActionsKind.CHANGE_PICTURE_MAIN_SHOW:
      if (typeof payload === "boolean" && payload !== null)
        return { ...state, pictureDetailShow: payload };
      else return state;
    case ExtraActionsKind.ADD_INVENTORY:
      if (typeof payload === "object") {
        return { ...state, chosenInventory: payload };
      } else return state;
    case ExtraActionsKind.ADD_COLORS:
      if (Array.isArray(payload)) {
        return { ...state, colors: payload };
      } else return state;
    case ExtraActionsKind.REMOVE_INVENTORY:
      return { ...state, chosenInventory: undefined };
    // case ExtraActionsKind.ADD_COLORS:
    //   if (typeof payload === "object") {
    //     return { ...state, colors: payload };
    //   } else return state;

    default:
      return state;
  }
};
