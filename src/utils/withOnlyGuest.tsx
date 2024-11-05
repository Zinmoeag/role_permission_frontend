import { Navigate } from "react-router-dom";
import { useAppStore } from "../store";
import { ComponentProps, JSXElementConstructor } from "react";
import { useCookies } from "react-cookie";

const withOnlyGuess = (WrappedComponent: JSXElementConstructor<any>) => {
  const OnlyGuessComponent = (props: ComponentProps<any>) => {

    const [cookies] = useCookies(["logged_in"]);
    const isLoggedIn = !!cookies.logged_in;

    const {
      state: { user },
    } = useAppStore() as any;

    if (isLoggedIn && !user?.verify) {
        return <Navigate to="/verify" replace />;
    } else if( isLoggedIn && user?.verify ) {
        return <Navigate to="/dashboard" replace />;
    } else {
        return <WrappedComponent {...props} />
    }
  };

  return OnlyGuessComponent;
};

export default withOnlyGuess;
