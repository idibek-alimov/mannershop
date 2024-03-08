import React from "react";
import "./CategoryItem.css";
import { CategoryType } from "../../../extra/types/CategoryType";
import { BsChevronRight } from "react-icons/bs";

const CategoryItem = (category: CategoryType) => {
  return (
    <div className="category-box">
      <div className="category-text">{category.name}</div>
      <BsChevronRight className="category-icon" />
    </div>
  );
};

export default CategoryItem;
