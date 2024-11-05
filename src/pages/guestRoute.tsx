import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAppStore } from "../store";

const GuestRoute = ({ children }: PropsWithChildren) => {

  const {state : {
    user
  }} = useAppStore();

  if(user){
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
