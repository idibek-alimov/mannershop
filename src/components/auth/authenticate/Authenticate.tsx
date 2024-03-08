import React, { FormEventHandler, useEffect, useState } from "react";
import "./Authenticate.css";
import axios from "axios";
import { url } from "../../../extra/axios";
import { useAppDispatch } from "../../../store/hooks";
import { addToken } from "../../../store/features/token/tokenSlice";
import { useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import CircleM from "../../../extra/circlem/CircleM";
interface AuthenticationProp {
  username: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
}
const emptyUser: AuthenticationProp = {
  username: "",
  password: "",
  passwordConfirm: "",
  phoneNumber: "",
};

interface inputProp {
  index: number;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  errorMassage: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  pattern?: string;
  type: string;
}

const Authenticate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [auth, setAuth] = useState<AuthenticationProp>(emptyUser);
  const [massage, setMassage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitForm = () => {
    setLoading(true);
    setMassage("");
    axios
      .post(url + "/api/v1/user/authenticate", {
        username: auth.username,
        password: auth.password,
      })
      .then((res) => {
        dispatch(addToken(res.data));
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setMassage("Неправильный логин или пороль");
        }
        setLoading(false);
      });
  };

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") {
      setAuth({ ...auth, username: event.target.value });
      return;
    } else if (event.target.name === "password") {
      setAuth({ ...auth, password: event.target.value });
      return;
    }
  };
  let inputs: inputProp[] = [
    {
      index: 0,
      name: "username",
      value: auth.username,
      label: "",
      placeholder: "Имя пользователя",
      errorMassage: "Должен содержать болше 8 букв/цифр",
      onChange: onChangeHandle,
      required: true,
      pattern: "^[A-Za-z0-9]{6,16}$",
      type: "string",
    },

    {
      index: 2,
      name: "password",
      label: "",
      value: auth.password,
      placeholder: "Пароль",
      errorMassage: "Должен содержать болше 8 букв/цифр",
      pattern: "^[A-Za-z0-9]{8,16}$",
      onChange: onChangeHandle,
      required: true,
      type: "password",
    },
  ];

  const [focused, setFocused] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const handleFocus = (index: number) => {
    let plc = focused;
    plc[index] = true;
    setFocused(plc);
  };
  return (
    <div className="authenticate-box">
      {loading ? <CircleM /> : ""}
      <form
        className="authenticate-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitForm();
        }}
      >
        <div className="login-text">Войти</div>
        <span className="error-massage1">{massage}</span>
        <div className="input-items-wrapper">
          {inputs.map((item) => (
            <div className="input-item-box">
              <label className="input-item-label">{item.label}</label>

              <input
                key={item.index}
                className="input-item-input"
                {...item}
                onBlur={() => handleFocus(item.index)}
                onFocus={() => {
                  item.name === "passwordConfirm" && handleFocus(item.index);
                }}
                data-focused={focused[item.index].toString()}
              />
              <span className="error-massage">{item.errorMassage}</span>
            </div>
          ))}
        </div>
        <button className="submit-button">Submit</button>
        <span
          className="redirect-to-register"
          onClick={() => navigate("/register")}
        >
          Зарегистрироваться
        </span>
      </form>
    </div>
  );
};

export default Authenticate;
