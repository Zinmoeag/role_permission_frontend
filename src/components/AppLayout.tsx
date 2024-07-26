import { Outlet } from "react-router-dom";
import { useAppStore } from "../store";
import Navbar from "../features/Navbar";
import Sidebar from "./layout/sidebar";
import { useState } from "react";

const AppLayout = () => {
    const {state : {
        user
    }} = useAppStore() as any;

    const [isSideBarOn, setIsSideBarOn] = useState(true);

    return (
        <>
            <div className="bg-skin-secondary">
                <Sidebar 
                isSideBarOn = {isSideBarOn}
                />
                <div className={`${isSideBarOn ? "ms-sideBar" : "ps-0"}`}>
                    <div className={`fixed ${isSideBarOn ? "left-sideBar" : "left-0"} right-0 h-layoutHeight`}>
                        <Navbar 
                        authUser={user}
                        >
                            <Navbar.Brand />
                            <div className="flex gap-2">
                            <Navbar.localToggler />
                            {user ? (
                                <>
                                    <Navbar.ProfileBtn />
                                    <Navbar.LogoutBtn />
                                </>
                            ) : (
                                <Navbar.AuthBtn />
                            )}  
                            </div>
                        </Navbar>
                    </div>
                    <div className="mx-4 h-full">
                        <div className="h-[30rem]">hhe</div>
                        {/* <Navbar.localToggler /> */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppLayout;