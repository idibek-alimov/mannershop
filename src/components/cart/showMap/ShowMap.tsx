import { useState } from "react";
import {
  GeolocationControl,
  Map,
  Placemark,
  SearchControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import "./ShowMap.css";
import axios from "axios";
import { useGlobalContext } from "../CartContext";
import AddressType from "../../../extra/types/Address";
import { BsChevronCompactDown } from "react-icons/bs";

const ShowMap = () => {
  const { setChosenAddress, setExtraInfo, setMapAddress } = useGlobalContext();
  const [clickPoint, setClickPoint] = useState<number[]>();
  const [addressText, setAddressText] = useState("");
  const [hidden, setHidden] = useState(false);

  const onHandleAddress = () => {
    if (addressText && clickPoint) {
      setChosenAddress({
        addressLine: addressText,
        latitude: clickPoint[0],
        longitude: clickPoint[1],
        id: null,
        userId: null,
      });
      setMapAddress({ showMap: false, showChooseAddress: false });
    } else {
      alert("Пожалуста выберите адрес");
    }
  };

  const onChangeCoordinates = (coordinates: number[]) => {
    setClickPoint(coordinates);
    setAddressText("Поиск");
    axios
      .get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=baf16ae4-46ab-48a8-bc5e-e3cac17c7733&geocode=${coordinates[1]},${coordinates[0]}&format=json`
      )
      .then((res) => {
        setAddressText(
          res.data["response"]["GeoObjectCollection"]["featureMember"][0][
            "GeoObject"
          ]["name"]
        );
      });
  };

  return (
    <div className="show-map-box">
      {!addressText ? (
        <div className="left">
          <div className="left-main-text">Выберите курьерский адрес</div>
          <div className="left-secondary-text">Куда привезти заказ?</div>
          <div className="left-detail-text">
            Укажите адрес на карте или найдите с помощью поиска
          </div>
        </div>
      ) : (
        <div className={hidden ? "left" : "left left-big"}>
          {!hidden ? (
            <div
              className="small-screen folder-box"
              onClick={() => setHidden(!hidden)}
            >
              <BsChevronCompactDown className="folder-box-icon" />
            </div>
          ) : (
            ""
          )}
          <div className="left-secondary-text">{addressText}</div>
          <div className="left-secondary-text">Координаты доставки:</div>
          <div className="coordinate-item">
            <div className="coordinate-text">Широта:</div>
            <div className="coordinate-number">
              {clickPoint && clickPoint.length > 1 ? clickPoint[0] : "0"}
            </div>
          </div>
          <div className="coordinate-item">
            <div className="coordinate-text">Долгота:</div>
            <div className="coordinate-number">
              {clickPoint && clickPoint.length > 1 ? clickPoint[1] : "0"}
            </div>
          </div>
          <div className="left-secondary-text">Дополнительная информация:</div>
          <textarea
            onChange={(event) => setExtraInfo(event.target.value)}
            className="delivery-detail-text"
            placeholder="Ваши дополнительные пожелания"
          />
          <button className="address-button" onClick={onHandleAddress}>
            Выбрать
          </button>
        </div>
      )}
      <div className="right">
        <Map
          width={"100%"}
          height={"100%"}
          defaultState={{
            center: [38.0098, 68.787],
            zoom: 10,
          }}
          onClick={(event: any) => {
            setHidden(false);
            onChangeCoordinates(
              event["_sourceEvent"]["originalEvent"]["coords"]
            );
          }}
        >
          {/* <GeolocationControl options={{ float: "left" }} /> */}
          <Placemark
            defaultGeometry={clickPoint}
            geometry={clickPoint}
            properties={{ iconCaption: addressText }}
          />
          <SearchControl options={{ float: "right" }} />
          <ZoomControl options={{ position: { right: 20, top: 150 } }} />
        </Map>
      </div>
    </div>
  );
};

export default ShowMap;
