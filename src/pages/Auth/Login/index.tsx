import userApi from "@/api/userApi";
import { LoginPayload } from "@/models/user";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export interface LoginPageProps {
}


export function LoginPage (props: LoginPageProps) {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const handleLogin = () => {
  //   // const newUser = {
  //   //   email,
  //   //   password
  //   // };

  //   // console.log(newUser);

  //  //const res = userApi.loginUser(newUser, dispatch, navigate);

  // };

  const handleLoginFormSubmit = async (formValues: LoginPayload) => {
    console.log('formValues: ', formValues)
    const res = userApi.loginUser(formValues, dispatch, navigate);
  }

  const initialValues: LoginPayload = {
    email: '',
    password: ''
  } as LoginPayload;

  return (
    <div>
      <h1 className="title">Login</h1>
        <LoginForm initialValues={initialValues} onSubmit={handleLoginFormSubmit}  />
    </div>
  );
}
