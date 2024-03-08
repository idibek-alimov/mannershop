import React, { FormEventHandler, useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
import { url } from "../../../extra/axios";
import { useAppDispatch } from "../../../store/hooks";
import { addToken } from "../../../store/features/token/tokenSlice";
import { useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
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
    axios
      .get(url + "/api/v1/user/username/available/" + auth.username)
      .then((res) => {
        if (res.data) {
          axios
            .post(url + "/api/v1/user/register", {
              username: auth.username,
              password: auth.password,
            })
            .then((res) => {
              dispatch(addToken(res.data));
              navigate("/");
              setLoading(false);
            })
            .catch((res) => {
              console.log(res);
              setLoading(false);
            });
        } else {
          setMassage(
            "Имя пользователя " +
              auth.username +
              " уже сушествуетю . Выберите другую"
          );
          handleFocus(0);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") {
      setAuth({ ...auth, username: event.target.value });
      return;
    } else if (event.target.name === "password") {
      setAuth({ ...auth, password: event.target.value });
      return;
    } else if (event.target.name === "passwordConfirm") {
      setAuth({ ...auth, passwordConfirm: event.target.value });
      return;
    } else if (event.target.name === "phoneNumber") {
      setAuth({ ...auth, phoneNumber: event.target.value });
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
      index: 1,
      name: "phoneNumber",
      value: auth.phoneNumber,
      label: "",
      placeholder: "Номер телефона",
      errorMassage: "Введите правильный номер",
      onChange: onChangeHandle,
      required: true,
      pattern: "^[0-9]{9,16}$",
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
    {
      index: 3,
      name: "passwordConfirm",
      label: "",
      value: auth.passwordConfirm,
      placeholder: "Повторение пароля",
      errorMassage: "Должен совпасть с паролем",
      onChange: onChangeHandle,
      required: true,
      type: "password",
      pattern: auth.password,
    },
  ];
  useEffect(() => {
    setMassage("");
  }, [auth]);

  // const inputs: inputProp[] = ;
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
      <form
        className="authenticate-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitForm();
        }}
      >
        <div className="login-text">Регистрация</div>
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
              <span className="error-massage1">
                {item.name === "username" ? massage : ""}
              </span>
            </div>
          ))}
        </div>
        <button className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Authenticate;
