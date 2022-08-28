import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
  const userStore = useAppSelector((state: RootState) => state.auth);

  if (isAuth && !userStore.login.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
