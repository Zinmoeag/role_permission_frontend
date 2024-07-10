import { Outlet } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAppStore } from "../store";

const AppLayout = () => {
    const isFetching = useIsFetching();
    const {state} = useAppStore() as any;

    return (
        <>
            <div>Layout</div>
            <div>{isFetching ? "fetching..." : ""}</div>
            <Link to="/pokemon">pokemon </Link>
            <Link to="/">home </Link>
            {
                state.user ?
                (
                    <>
                        <Link to="/dashboard">dashboard </Link>
                    </>
                ) : (
                    <>
                        <Link to="/sign_in">login </Link>
                        <Link to="/sign_up">register </Link>
                    </>
                )
            }

            <hr></hr>
            <Outlet />
        </>
    )
}

export default AppLayout;