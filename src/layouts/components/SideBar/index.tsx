import userApi from "@/api/userApi";
import { logOutSuccess } from "@/pages/Auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";

export interface SideBarProps {
}

export function SideBar (props: SideBarProps) {
  const currentUser = useAppSelector((state) => state.auth.login?.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = currentUser?.id;
  const accessToken = currentUser?.access_token;
 // let axiosJWT = axiosClient(currentUser,dispatch,logOutSuccess);

  const handleLogout = () =>{
  // userApi.logOut(dispatch,id,navigate, accessToken,axiosJWT);
  }
  return (
    <div>
        Hi {currentUser.last_name + currentUser.first_name}
        <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
    </div>
  );
}
