import axios from "axios";

import { store } from "../store/store";
import { useAppSelector } from "../store/hooks";
import { error } from "console";
import RefreshToken from "./refreshToken";
//export const url = "https://maryam-backend2.onrender.com";
// export const url = "http://localhost:8080";
export const head = String(
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbWluYSIsInJvbGVzIjpbXSwiaXNzIjoiL2xvZ2luIiwiZXhwIjoxNjcwNjgzOTk1fQ.URcGxuGtFCYt3fFKslvqawWMLL-Nr3jve99SH8uxaOg"
);
// const ActivateToken = () => {
//   let state = store.getState();
//   let token = state.token;
//   const access_token = token.access_token;
//   const refresh_token = token.refresh_token;

//   let custom_headers = access_token
//     ? { Authorization: String("Bearer " + access_token) }
//     : { Authorization: String("") };

//   return axios.create({
//     headers: custom_headers,
//     baseURL: "http://localhost:8080/api/product",
//   });
// };
let commons = {
  // "Cache-Control": "no-cache, no-store, must-revalidate",      /////<<<<<-------
  //"Content-Type": ["multipart/form-data", "application/json"], /////<<<<<-------
  // Accept: "application/json",
};
//export default ActivateToken();
//export const url = "https://marya
//export const url = "http://localhost:8080";
export const url = "https://mannerapi.onrender.com";
//export const url = "https://maryam-backend2.onrender.com";
//export const url = "http://89.223.123.4:8080";
export default function Axios() {
  const access_token = useAppSelector((state) => state.token.access_token);
  const refresh = RefreshToken();
  let custom_headers = access_token
    ? {
        Authorization: String("Bearer " + access_token),
        //common: commons,
      }
    : {
        Authorization: String(""),
        //common: commons,
      };
  const instance = axios.create({
    headers: custom_headers,
    baseURL: url,
  });
  instance.interceptors.request.use(
    (config) => {
      if (access_token && config.headers) {
        config.headers["Authorization"] = String("Bearer " + access_token);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/api/v1/user/authenticate" && err.response) {
        // Access Token was expired
        if (
          (err.response.status === 401 ||
            err.response.status === 402 ||
            err.response.status === 403) &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;
          // console.log(1);
          try {
            // console.log(2);
            refresh();
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
  return instance;
}

// import axios from "axios";

// import { store } from "../store/store";
// import { useAppSelector } from "../store/hooks";
// //export const url = "https://maryam-backend2.onrender.com";
// // export const url = "http://localhost:8080";
// export const head = String(
//   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbWluYSIsInJvbGVzIjpbXSwiaXNzIjoiL2xvZ2luIiwiZXhwIjoxNjcwNjgzOTk1fQ.URcGxuGtFCYt3fFKslvqawWMLL-Nr3jve99SH8uxaOg"
// );
// const ActivateToken = () => {
//   let state = store.getState();
//   let token = state.token;
//   const access_token = token.access_token;
//   const refresh_token = token.refresh_token;

//   let custom_headers = access_token
//     ? { Authorization: String("Bearer " + access_token) }
//     : { Authorization: String("") };

//   return axios.create({
//     headers: custom_headers,
//     baseURL: "http://localhost:8080/api/product",
//   });
// };
// let commons = {
//   "Cache-Control": "no-cache, no-store, must-revalidate",

//   "Content-Type": ["multipart/form-data", "application/json"],
//   // Accept: "application/json",
// };
// //export default ActivateToken();
// //export const url = "https://maryam-backend2.onrender.com";
// export const url = "http://localhost:8080";
// //export const url = "https://maryam-backend2.onrender.com";
// export default function Axios() {
//   const access_token = useAppSelector((state) => state.token.access_token);
//   let custom_headers = access_token
//     ? {
//         Authorization: String("Bearer " + access_token),
//         common: commons,
//       }
//     : {
//         Authorization: String(""),
//         common: commons,
//       };
//   return axios.create({
//     headers: custom_headers,
//     baseURL: url,
//   });
// }
