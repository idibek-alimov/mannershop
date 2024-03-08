import { createSlice } from "@reduxjs/toolkit";
import { ArticleDetail } from "../../../extra/types/ArticleDetail";
import { Inventory } from "../../../extra/types/Inventory";
export interface CartArticle extends ArticleDetail {
  inventory: Inventory;
  amount?: number;
}
interface CartSet {
  cart_products: CartArticle[];
}

const initialState: CartSet = {
  cart_products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let contains = false;
      state.cart_products.map((article) => {
        if (
          article.id === action.payload.id &&
          article.inventory.id === action.payload.inventory.id
        ) {
          contains = true;
        }
      });
      if (!contains) {
        state.cart_products.push({
          ...action.payload,
          amount: 1,
          //price: action.payload.inventories[0].price,
        });
      }
    },
    removeFromCart: (state, action) => {
      console.log(
        "removing article with inventory id",
        action.payload.inventoryId
      );
      console.log(state.cart_products);
      state.cart_products = state.cart_products.filter((article) => {
        console.log("article ->", article.inventory);
        console.log("inventory id->", article.inventory.id);
        return action.payload.inventoryId != article.inventory.id;
      });
    },
    changeAmount: (state, action) => {
      console.log("called change amount");
      state.cart_products = state.cart_products.map((item) =>
        item.inventory.id == action.payload.inventoryId
          ? { ...item, amount: action.payload.amount }
          : item
      );
    },
    clearTheCart: (state) => {
      state.cart_products = [];
    },
  },
});

export const { addToCart, removeFromCart, clearTheCart, changeAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
