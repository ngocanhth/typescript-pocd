import userApi from '@/api/userApi';
import { AccountDetailPayload } from '@/models/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from "react";

export interface AccountDetailProps {
}

export function AccountDetail (props: AccountDetailProps) {
  const currentUser = useAppSelector((state) => state.auth.login?.currentUser);
  const currentUserDetail = useAppSelector((state) => state.user.users.usersDetail);
  const id: any = currentUser?.id;
  const dispatch = useAppDispatch();
  const accessToken: any = currentUser?.access_token;

  // console.log("id: ", id);
  // console.table([id, accessToken])
  const accountDetail = {
    id, dispatch, accessToken
  }

  console.log("accountDetail: ", accountDetail);
  
  // React.useEffect(() => {
  //   const userDetail = userApi.getAccountDetail(accountDetail);
  //   }
  // }, []);
  // useEffect(() => {
  //   const userDetail = userApi.getAccountDetail(accountDetail);
  //   console.log("userDetail: ", userDetail);
  // }, []);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const userDetail = await userApi.getAccountDetail(accountDetail);
      console.log("userDetail: ", userDetail);
    }
  
    // call the function

    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])



  return (
    <div>
      <h1>Account Detail</h1>
      <ul>
        <li>{currentUserDetail?.first_name}</li>
        <li>{currentUserDetail?.last_name}</li>
        <li>{currentUserDetail?.fullname}</li>
        <li>{currentUserDetail?.contact_email}</li>
        <li>{currentUserDetail?.username}</li>
        <li>{currentUserDetail?.account_name}</li>
        <li>{currentUserDetail?.customer_number}</li>
      </ul>
    </div>
  );
}
