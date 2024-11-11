import { Outlet } from "react-router-dom";
import { useAppStore } from "../store";
import Navbar from "../features/Navbar";
import Sidebar from "./layout/sidebar";
import { useState } from "react";
import NavigatorBar from "./layout/NavigatorBar";
import { Box } from "@mui/material";

const AppLayout = () => {
  const {
    state: { user },
  } = useAppStore();
  const [isSideBarOn, setIsSideBarOn] = useState(true);

  return (
    <>
      <div className="bg-main-main">
        <Sidebar isSideBarOn={isSideBarOn} />
        <div
          className={`${
            isSideBarOn ? "ms-sideBar" : "ms-0"
          } duration-500 bg-skin-main min-h-screen`}
        >
          <div
            className={`fixed ${
              isSideBarOn ? "left-sideBar" : "left-0"
            } top-0 right-0 h-layoutHeight z-10`}
          >
            <Navbar authUser={user}>
              <Navbar.sideBarToggler
                onClick={() => setIsSideBarOn((prev) => !prev)}
              />
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
          <div className="px-6 pt-layoutHeight">
            <NavigatorBar />
            <Box sx={{ mt: 2 }}>
              <Outlet />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
