import React, { useEffect, useState } from "react";
import "./ManageCategory.css";
import { CategoryType } from "../../extra/types/CategoryType";
import Axios, { url } from "../../extra/axios";
import CircleM from "../../extra/circlem/CircleM";
import CategoryItem from "./categoryItem/CategoryItem";
import { AiOutlineLeft } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageCategory = () => {
  const [parent, setParent] = useState<CategoryType[]>([]);
  const [categories, setCategories] = useState<CategoryType[][]>([]);
  const [loading, setLoading] = useState(true);
  const axios = Axios();
  const navigate = useNavigate();
  const onGoBackHandle = () => {
    setLoading(true);
    let plc = parent;
    plc.pop();
    setParent([...plc]);
    let categoriesPlc = categories;
    categoriesPlc.pop();
    setCategories([...categoriesPlc]);
    setLoading(false);
  };
  const onClickHandle = (category: CategoryType) => {
    setLoading(true);
    axios
      .get(url + "/api/v1/category/children/" + category.id)
      .then((res) => {
        if (res.data.length !== 0) {
          let plc = parent;
          plc.push(category);
          setParent([...plc]);
          let categoriesPlc = categories;
          categoriesPlc.push(res.data);
          setCategories([...categoriesPlc]);
        } else {
          navigate("/by/category/" + category.id);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get(url + "/api/v1/category/parent")
      .then((res) => {
        let plc: CategoryType[][] = categories;
        plc.push(res.data);
        setCategories(plc);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <CircleM />
      ) : (
        <div className="manage-category-box">
          {parent.length > 0 ? (
            <div className="parent-box" onClick={onGoBackHandle}>
              <FaChevronLeft fontWeight={800} className="parent-icon" />
              <div>{parent[parent.length - 1].name}</div>
            </div>
          ) : (
            ""
          )}

          {categories.length > 0 ? (
            categories[categories.length - 1].map((category, index) => (
              <div
                style={{ width: "100%" }}
                onClick={() => onClickHandle(category)}
              >
                <CategoryItem {...category} key={index} />
              </div>
            ))
          ) : (
            <CircleM />
          )}
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
