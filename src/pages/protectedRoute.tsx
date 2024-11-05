import { Roles } from "../type";
import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAuthUser } from "../context/authUserProvider";
import { CircularProgress } from "@mui/material";
import { useAppStore } from "../store";

const ProtectedRoute = ({
  allowedRoles,
  children,
}: PropsWithChildren<{
  allowedRoles: Roles[];
}>) => {
  const {
    state: { user },
  } = useAppStore() as any;

  if (!user) {
    return <Navigate to="/sign_in" replace />;
  }

  if (user && !allowedRoles.includes(user.role_name)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
