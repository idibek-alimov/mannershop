import React from "react";
import "./ChooseInventory.css";
import { useGlobalContext } from "../DetailContext";
import { ExtraActionsKind } from "../detailReducer";
const ChooseInventory = () => {
  const { extra, article, getArticle, extraDispatch } = useGlobalContext();
  return (
    <div className="inventories-box">
      <div className="inventory-text">
        {article.inventories.length !== 0 ? "Таблица размеров" : ""}
      </div>
      <div className="inventories-wrapper">
        {article.inventories.map((inventory) => (
          <div
            className={
              extra?.chosenInventory &&
              extra.chosenInventory.id === inventory.id
                ? "inventory-item chosen-inventory"
                : "inventory-item"
            }
            onClick={() => {
              extraDispatch({
                type: ExtraActionsKind.ADD_INVENTORY,
                payload: inventory,
              });
            }}
          >
            {inventory.size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseInventory;
