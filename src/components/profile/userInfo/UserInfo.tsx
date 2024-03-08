import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import { UserInfo as UserInfoType } from "../../../extra/types/UserInfo";
import axios from "axios";
import Axios, { url } from "../../../extra/axios";
import { MdModeEdit } from "react-icons/md";
import CircleM from "../../../extra/circlem/CircleM";
interface Prop {
  showName: boolean;
  showNumber: boolean;
}
const initShow: Prop = { showName: false, showNumber: false };
const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    name: "",
    phoneNumber: "",
  });
  const [userInfoProxy, setUserInfoProxy] = useState<UserInfoType>({
    name: "",
    phoneNumber: "",
  });
  const [show, setShow] = useState<Prop>(initShow);
  const [loading, setLoading] = useState(true);
  const axios = Axios();
  const onNameChange = () => {
    axios
      .get(url + "/api/v1/user/change/name/" + userInfoProxy.name)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
    setShow(initShow);
    // window.location.reload();
  };
  const onNumberChange = () => {
    if (userInfoProxy.phoneNumber.length > 8) {
      axios
        .get(url + "/api/v1/user/change/number/" + userInfoProxy.phoneNumber)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
      setShow(initShow);
      //window.location.reload();
    } else {
      alert("Введите правильный номер");
    }
  };
  useEffect(() => {
    axios
      .get(url + "/api/v1/user/userinfo")
      .then((res) => {
        setUserInfo(res.data);
        setUserInfoProxy(res.data);
        setLoading(false);
        // if (res.data.name != null) {
        //   setUserInfo({ ...userInfo, name: res.data.name });
        //   setUserInfoProxy({ ...userInfo, name: res.data.name });
        // }
        // if (res.data.phoneNumber != null) {
        //   setUserInfo({ ...userInfo, phoneNumber: res.data.phoneNumber });
        //   setUserInfoProxy({ ...userInfo, phoneNumber: res.data.phoneNumber });
        // }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="user-info-page-box">
      {loading ? (
        <CircleM />
      ) : (
        <div>
          <div
            className="wrapper-box"
            style={
              show.showName || show.showNumber
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <div
              style={{ zIndex: 10 }}
              className="background-box"
              onClick={() => setShow(initShow)}
            ></div>
            <div
              className="name-change-box popup"
              style={show.showName ? { display: "flex" } : { display: "none" }}
            >
              <div className="change-name-bold">Изменить имя</div>
              <div className="name-wrapper">
                <div className="name-text">Имя</div>
                <div className="input-box">
                  <input
                    spellCheck={false}
                    value={userInfoProxy?.name}
                    type="string"
                    onChange={(event) => {
                      setUserInfoProxy({
                        ...userInfoProxy,
                        name: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="submit-button" onClick={onNameChange}>
                Сохранить
              </div>
            </div>
            <div
              className="name-change-box popup"
              style={
                show.showNumber ? { display: "flex" } : { display: "none" }
              }
            >
              <div className="change-name-bold">Изменить номер</div>
              <div className="name-wrapper">
                <div className="name-text">Номер телефона</div>
                <div className="input-box">
                  <input
                    spellCheck={false}
                    value={userInfoProxy?.phoneNumber}
                    type="number"
                    onChange={(event) => {
                      setUserInfoProxy({
                        ...userInfoProxy,
                        phoneNumber: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="submit-button" onClick={onNumberChange}>
                Сохранить
              </div>
            </div>
          </div>
          <div className="user-info-page-wrapper">
            <div className="first box">
              <div className="user-name-box">
                <div className="user-name-text">
                  {userInfo?.name ? userInfo.name : "Не указано"}
                </div>
                <MdModeEdit
                  className="icon"
                  onClick={() => setShow({ ...initShow, showName: true })}
                />
              </div>
              <div className="user-number-box">
                <span>Телефон</span>
                <div className="phone-number-wrapper">
                  <div className="user-number-text">
                    {userInfo?.phoneNumber
                      ? userInfo.phoneNumber
                      : "Не указано"}
                  </div>
                  <MdModeEdit
                    className="icon"
                    onClick={() => setShow({ ...initShow, showNumber: true })}
                  />
                </div>
              </div>
            </div>
            <div className="second box">
              <div className="logout-text-bold">Выйти из акаунта</div>
              <div className="log-out">Выйти</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
