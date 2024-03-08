import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CartArticle from "./cartArticle/CartArticle";
import Axios, { url } from "../../extra/axios";
import { clearTheCart } from "../../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import CircleM from "../../extra/circlem/CircleM";
import { MdModeEdit } from "react-icons/md";
import { useGlobalContext } from "./CartContext";

interface ItemProp {
  inventory: number;
  quantity: number;
}
interface OrderProp {
  address: string;
  items: ItemProp[];
}
const Cart = () => {
  const cartArticles = useAppSelector((state) => state.cart.cart_products);
  const authenticated = useAppSelector((state) => state.token.authenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [show, setShow] = useState<boolean>(false);
  // const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { chosenAddress, extraInfo, setMapAddress } = useGlobalContext();

  let inventories: ItemProp[] = [];
  const axios = Axios();
  let sum = 0;
  let itemCount = 0;

  cartArticles.forEach((article) => {
    if (article.amount) {
      sum += article.amount * article.price;
      itemCount += article.amount;
      inventories.push({
        inventory: article.inventory.id,
        quantity: article.amount,
      });
    } else {
      sum += article.price;
      itemCount += 1;
      inventories.push({ inventory: article.inventory.id, quantity: 1 });
    }
  });
  const onSubmitOrder = () => {
    //{"address":{"addressLine":"Nigger house","latitude":"1212","longitude":"23432"},"extraInfo":"Say nigger please","items":[{"inventory":16,"quantity":1}]}
    if (!authenticated) {
      navigate("/authenticate");
      return;
    }
    if (chosenAddress !== undefined) {
      setLoading(true);
      axios
        .post(url + "/api/v1/order/create", {
          address: chosenAddress,
          extraInfo: extraInfo,
          items: inventories,
        })
        .then((res) => {
          console.log(res);
          dispatch(clearTheCart());
          navigate("/cart/success");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      let element = document.getElementById("address-choose-box");
      if (element !== null) {
        element.scrollIntoView();
      }
      alert("Пожалуста выберите адрес доставки");
    }
  };

  return (
    <div className="cart-page-box">
      {loading ? <CircleM /> : ""}
      {cartArticles.length != 0 ? (
        <div className="cart-page-wrapper">
          <div className="left">
            <span className="cart-page-text">Корзина</span>
            {cartArticles.map((article) => {
              return <CartArticle {...article} />;
            })}
          </div>
          <div className="right">
            {/* <div style={show ? { display: "flex" } : { display: "none" }}>
              <div
                className="address-box-background"
                onClick={() => {
                  setShow(!show);
                  document.body.style.overflow = "scroll";
                }}
              ></div>
              <div className="address-box">
                <div className="address-box-text">Ведите адресс</div>
                <div className="address-box-input-box">
                  <input
                    className="address-box-input"
                    placeholder="Ваш адресс"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <button
                  className="address-box-button"
                  onClick={() => setShow(!show)}
                >
                  Ввести адрес
                </button>
              </div>
            </div> */}
            <div
              className="address-choose-box"
              onClick={() => {
                setMapAddress({ showMap: false, showChooseAddress: true });
                // setShow(!show);
                //document.body.style.overflow = "hidden";
              }}
              id="address-choose-box"
            >
              <div className="address-choose-text">Доставка по адресу:</div>
              <div className="address-choose-icon">
                <MdModeEdit className="icon" />
              </div>
            </div>
            <div className="total-info-box">
              {chosenAddress !== undefined
                ? chosenAddress.addressLine
                : "Укажите пожадуста адрес"}
            </div>
            <div className="total-info-box">Товары, {itemCount} шт.</div>
            <div className="total-price-box">
              <div className="total-text">Итого</div>
              <div className="total-price">{sum}</div>
            </div>
            <div className="submit-order-button-box">
              <button className="submit-order-button" onClick={onSubmitOrder}>
                Заказать
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper">
          <div className="empty-cart-page-box">
            <div className="empty-cart-main-text">В корзине пока пусто</div>
            <div className="empty-cart-body-text">
              Загляните на главную, чтобы выбрать товары <br /> или найдите
              нужное в поиске
            </div>
            <button className="empty-cart-button" onClick={() => navigate("/")}>
              Перейти на главную
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
