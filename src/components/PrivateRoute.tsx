import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
   
    return <Navigate to="/login" replace />;
  }


  return <>{children}</>;
};

export default PrivateRoute;
