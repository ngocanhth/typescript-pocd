import { User } from "@/models/user";
import axios, { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post("/v1/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user: User, dispatch: Function, stateSuccess: Function) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config:  AxiosRequestConfig<any>) => {
      let date = new Date();
      const decodedToken: any = jwt_decode(user?.access_token);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
