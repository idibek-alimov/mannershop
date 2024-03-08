import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import AddressType from "../../extra/types/Address";
import Axios, { url } from "../../extra/axios";
import { MyGlobalContext } from "./CartContext";
import ChooseAddress from "./chooseAddress/ChooseAddress";
import ShowMap from "./showMap/ShowMap";
import { YMaps } from "@pbe/react-yandex-maps";
import { useAppSelector } from "../../store/hooks";

export interface ShowMapOrChooseAddressType {
  showMap: boolean;
  showChooseAddress: boolean;
}

const CartWrapper = () => {
  const authenticated = useAppSelector((state) => state.token.authenticated);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [chosenAddress, setChosenAddress] = useState<AddressType>();
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [mapAddress, setMapAddress] = useState<ShowMapOrChooseAddressType>({
    showMap: false,
    showChooseAddress: false,
  });
  const axios = Axios();
  useEffect(() => {
    if (authenticated) {
      axios
        .get(url + "/api/v1/user/address")
        .then((res) => {
          console.log("addresses response from axios", res);
          setAddresses(res.data);
          if (res.data.length > 0) {
            setChosenAddress(res.data[0]);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <YMaps
      query={{
        // load: "package.full",
        ns: "use-load-option",
        apikey: "baf16ae4-46ab-48a8-bc5e-e3cac17c7733",
        //apikey: "b3583a9d-e8f7-4706-aaff-29dde2291678",
        suggest_apikey: "83a52a4a-142f-4f79-b001-0f209effbb50",
      }}
    >
      <MyGlobalContext.Provider
        value={{
          addresses,
          chosenAddress,
          mapAddress,
          extraInfo,
          setExtraInfo,
          setMapAddress,
          setAddresses,
          setChosenAddress,
        }}
      >
        {mapAddress.showChooseAddress ? <ChooseAddress /> : ""}
        {mapAddress.showMap ? <ShowMap /> : ""}
        <Cart />
      </MyGlobalContext.Provider>
    </YMaps>
  );
};

export default CartWrapper;
