import React from "react";
import "./CartSuccess.css";
import { useNavigate } from "react-router-dom";
const CartSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="cart-success-box">
      <div className="cart-success-wrapper">
        <div className="cart-success-text">Ваш заказ принят</div>
        <button className="cart-success-button" onClick={() => navigate("/")}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default CartSuccess;
