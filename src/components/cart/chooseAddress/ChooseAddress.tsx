import React from "react";
import "./ChooseAddress.css";
import { useGlobalContext } from "../CartContext";
import AddressItem from "./AddressItem";

const ChooseAddress = () => {
  const { setMapAddress, addresses, chosenAddress } = useGlobalContext();
  return (
    <div className="choose-address-box">
      <div
        className="choose-address-background"
        onClick={() =>
          setMapAddress({
            showMap: false,
            showChooseAddress: false,
          })
        }
      ></div>
      <div className="choose-address-outer-wrapper">
        <div className="choose-address-wrapper">
          <div className="choose-address-main-text">Выбрать адрес доставки</div>
          <div className="choose-address-items-wrapper">
            {addresses.map((item) => (
              <AddressItem {...item} />
            ))}
            {chosenAddress && !chosenAddress.id ? (
              <AddressItem {...chosenAddress} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="open-map-button-box">
          <button
            className="choose-address-button"
            onClick={() =>
              setMapAddress({ showMap: false, showChooseAddress: false })
            }
          >
            Выбрать адрес
          </button>
          <button
            className="open-map-button"
            onClick={() =>
              setMapAddress({ showMap: true, showChooseAddress: false })
            }
          >
            Добавить новый адрес
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseAddress;
