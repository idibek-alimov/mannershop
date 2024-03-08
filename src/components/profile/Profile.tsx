import React, { useEffect, useState } from "react";
import "./Profile.css";
import Axios, { url } from "../../extra/axios";
import { ArticleOrder } from "../../extra/types/ArticleOrder";
import { useLocation, useNavigate } from "react-router-dom";
import { PiHouseBold } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck, BsFillPersonFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { UserInfo } from "../../extra/types/UserInfo";
import { useAppDispatch } from "../../store/hooks";
import { removeToken } from "../../store/features/token/tokenSlice";
import CircleM from "../../extra/circlem/CircleM";
const Profile = () => {
  const axios = Axios();
  const [likedPictures, setLikedPictures] = useState<string[]>();
  const [shipping, setShipping] = useState<ArticleOrder[]>();
  const [delivered, setDelivered] = useState<ArticleOrder[]>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLogOut = () => {
    dispatch(removeToken());
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    axios
      .get(url + "/api/v1/like/liked/pictures")
      .then((res) => {
        console.log("liked pictures ", res.data);
        setLikedPictures(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(url + "/api/v1/article/ordered/shipping")
      .then((res) => setShipping(res.data.slice(0, 5)))
      .catch((err) => console.log(err));
    axios
      .get(url + "/api/v1/article/ordered/delivered")
      .then((res) => setDelivered(res.data.slice(0, 5)))
      .catch((err) => console.log(err));
    axios
      .get(url + "/api/v1/user/userinfo")
      .then((res) => {
        setUserInfo(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  // useEffect(() => {
  //   axios
  //     .get(url + "/api/v1/like/liked/pictures")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <div className="profile-box">
      {loading ? (
        <CircleM />
      ) : (
        <div className="profile-wrapper">
          <div
            className="liked-products-box user-info-box"
            onClick={() => navigate("/profile/person")}
          >
            <div className="user-name-box">
              {userInfo?.name ? userInfo.name : "Не указано"}
            </div>
            <div className="user-number-box">
              <div className="user-number-text">Телефон</div>
              <div className="user-number">
                {userInfo?.phoneNumber ? userInfo.phoneNumber : "Не указано"}
              </div>
            </div>
            <div className="log-out-box" onClick={onLogOut}>
              Выйти
            </div>
          </div>
          <div
            className="liked-products-box"
            onClick={() => navigate("/profile/delivered")}
          >
            <div className="liked-products-text">Покупки</div>
            <div className="liked-products-wrapper">
              {delivered?.length ? (
                delivered.map((item, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={item.pic}
                        className="liked-products-picture"
                        style={{ zIndex: 2 + index }}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="absent-text"></div>
              )}
            </div>
          </div>

          <div
            className="liked-products-box"
            onClick={() => navigate("/profile/shipping")}
          >
            <div className="liked-products-text">Доставки</div>
            <div className="liked-products-wrapper">
              {shipping ? (
                shipping.map((item, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={item.pic}
                        className="liked-products-picture"
                        style={{ zIndex: 2 + index }}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="absent-text">
                  Доставки в ближайшем не ожидается
                </div>
              )}
            </div>
          </div>
          <div
            className="liked-products-box"
            onClick={() => navigate("/profile/liked")}
          >
            <div className="liked-products-text">Избранное</div>
            <div className="liked-products-wrapper">
              {likedPictures ? (
                likedPictures.map((item, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={item}
                        className="liked-products-picture"
                        style={{ zIndex: 2 + index }}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="absent-text">В избранных пока пусто</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
