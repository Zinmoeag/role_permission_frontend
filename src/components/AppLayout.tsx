import { Outlet } from "react-router-dom";
import { useAppStore } from "../store";
import Navbar from "../features/Navbar";
import useAuthUser from "../hooks/useAuthUser";

const AppLayout = () => {
    // const {state : {
    //     user
    // }} = useAppStore() as any;

    const {
        user
    } = useAuthUser();

    return (
        <>
            <main className="bg-skin-secondary">
                <Navbar authUser={user}>
                    <Navbar.Brand />
                    <div className="flex gap-2">
                    <Navbar.localToggler />
                    {user ? (
                        <Navbar.ProfileBtn />
                    ) : (
                        <Navbar.AuthBtn />
                    )}  
                    </div>
                </Navbar>
                <div id="content" className="pt-[5rem] p-na[4rem]">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default AppLayout;