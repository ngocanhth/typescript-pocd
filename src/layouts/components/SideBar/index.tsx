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
  const id: any = currentUser?.id;

  console.log("id: ", id);
  
  const accessToken = currentUser?.access_token;
 // let axiosJWT = axiosClient(currentUser,dispatch,logOutSuccess);

  const handleLogout = () =>{
   userApi.logOut(dispatch,navigate);
  }
  return (
    <div className='sidebar'>
        <nav className="navbar-container">
              <Link to="/" className="navbar-home"> Home </Link>
              {currentUser? (
                <>
                <p className="navbar-user">Hi, <span> {currentUser.last_name + currentUser.first_name} </span> </p>
                <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
                </>
              ) : (    
                <>
              <Link to="/login" className="navbar-login"> Login </Link>
              <Link to="/register" className="navbar-register"> Register</Link>
              </>
            )}
        </nav>
    </div>
  );
}
