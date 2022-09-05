// import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from 'src/redux/actions/authSlice';
// import axiosClient from './axiosClient';

// const userApi = {
//     registerUser: async (user, dispatch, navigate) => {
//         dispatch(registerStart());
//         try {
//         const user = await axiosClient.post("/customer/register", user);
      
//         dispatch(registerSuccess());
//         navigate("/login");
//         } catch (err) {
//         dispatch(registerFailed());
//         }
//     },

//     loginUser: async (user, dispatch, navigate) => {
//         dispatch(loginStart());
//         try {
//         const res = await axiosClient.post("/customer/login/", user);
//         dispatch(loginSuccess(res));
//       //  console.log("user2: ", res)
//         navigate("/dashboard");
//         } catch (err) {
//         dispatch(loginFailed());
//         }
//     }
// };

// export default userApi;

import { User, LoginResponse, LoginPayload, AccountDetailResponse, AccountDetailPayload } from '@/models/user';
import { getUsersFailed, getUsersSuccess, loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess } from '@/pages/Auth';
import { history } from '@/utils/history';
import axiosClient from './axiosClient';

const userApi = {
//   getAll(params: ListParams): Promise<ListResponse<Student>> {
//     const url = '/students';
//     return axiosClient.get(url, { params });
//   },

//   getById(id: string): Promise<Student> {
//     const url = `/students/${id}`;
//     return axiosClient.get(url);
//   },

//   add(data: Student): Promise<Student> {
//     const url = '/students';
//     return axiosClient.post(url, data);
//   },

//   update(data: Partial<Student>): Promise<Student> {
//     const url = `/students/${data.id}`;
//     return axiosClient.patch(url, data);
//   },

//   remove(id: string): Promise<any> {
//     const url = `/students/${id}`;
//     return axiosClient.delete(url);
//   },


    loginUser: async (user: LoginPayload, dispatch: Function, navigate: Function) => {
            dispatch(loginStart());
        try {
            const res: LoginResponse = await axiosClient.post("/customer/login/", user);
            dispatch(loginSuccess(res));
             console.log("user2: ", res)
            navigate("/dashboard");
        } catch (err) {
            dispatch(loginFailed());
        }
    },

    logOut: async (dispatch: Function, navigate: Function) => {
        dispatch(logOutStart());
        try {
          // await axiosJWT.post("/auth/logout", id, {
          //   headers: { token: `Bearer ${accessToken}` },
          // });

          dispatch(logOutSuccess());

         

          navigate("/login");
          console.log("logout success");
        } catch (err) {
          dispatch(logOutFailed());
        }
      },

      getAccountDetail: async ({id, dispatch, accessToken}: AccountDetailPayload) => {
        try {
          console.log("id la: ", id);
          console.log("accessToken la: ", accessToken);

          const res: AccountDetailResponse = await axiosClient.get(`/customer-detail/${id}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          dispatch(getUsersSuccess(res));
        } catch (err) {
          console.log(err);
          dispatch(getUsersFailed());
        }
      }
};

export default userApi;
