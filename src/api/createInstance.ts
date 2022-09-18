import { User } from "@/models/user";
import axios, { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

// const refreshToken = async () => {
//   try {
//     const res = await axios.post("refersh-token/", {
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };


const refreshToken = async (currentUser: User) => {
  try {

    const res = await axios.post("refersh-token/",       {
      headers: { Authorization: `Bearer ${currentUser?.refresh_token}` },
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
        const data = await refreshToken(user);
        const refreshUser = {
          ...user,
          refresh_token: data.refresh_token,
          access_token: data.access_token,
        };
        
        dispatch(stateSuccess(refreshUser));

          // let token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth'))?.token?.slice(1, -1)
          config.headers = {
              Authorization: "Bearer" + data.access_token
          }

       // config.headers["Authorization"] = `Bearer ${data.access_token}`;

        // axios.defaults.headers.common['Authorization']
      }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
