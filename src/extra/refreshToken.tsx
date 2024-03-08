import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { addToken } from "../store/features/token/tokenSlice";
import { url } from "./axios";
let commons = {
  "Cache-Control": "no-cache, no-store, must-revalidate",

  "Content-Type": ["multipart/form-data", "application/json"],
};
export default function RefreshToken() {
  const refresh_token = useAppSelector((state) => state.token.refresh_token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function refresh() {
    let custom_headers = refresh_token
      ? {
          Authorization: String("Bearer " + refresh_token),
          common: commons,
        }
      : {
          Authorization: String(""),
          common: commons,
        };

    let Axios = axios.create({
      headers: custom_headers,
      baseURL: url,
    });
    // console.log("refreshing token");
    Axios.get(url + "/api/user/user/token/refresh") //qs.stringify(authData))
      .then((response) => {
        console.log("token refresh response", response);
        dispatch(addToken(response.data));
      })
      .catch((err) => console.log(err));
  }
  return refresh;
}
