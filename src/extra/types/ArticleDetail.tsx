import { Inventory } from "./Inventory";

export interface ArticleDetail {
  id: number; // Long id;
  name: string; // String name;
  price: number; // Double price;
  mainPic: string; // String mainPic;
  description: string; // String description;
  pics: string[]; // List<String> pics;
  like: boolean; // Boolean like;
  inventories: Inventory[];
  color: string;
  prevPrice: number;
  discount: number;
}

export var emptyArticle: ArticleDetail = {
  id: 0,

  name: "",
  price: 0,
  prevPrice: 0,
  discount: 0,
  mainPic: "",
  description: "",
  pics: [],
  like: false,
  inventories: [],
  color: "",
};
