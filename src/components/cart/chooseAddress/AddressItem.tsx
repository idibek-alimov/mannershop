import React from "react";
import "./ChooseAddress.css";
import AddressType from "../../../extra/types/Address";
import { useGlobalContext } from "../CartContext";

const AddressItem = (address: AddressType) => {
  const { chosenAddress, setChosenAddress } = useGlobalContext();
  return (
    <div
      className={
        chosenAddress?.addressLine === address.addressLine &&
        chosenAddress.id === address.id
          ? "address-item-box chosen-address"
          : "address-item-box"
      }
      onClick={() => setChosenAddress(address)}
    >
      {address.addressLine}
    </div>
  );
};

export default AddressItem;
