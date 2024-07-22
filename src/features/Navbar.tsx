import { createContext, PropsWithChildren, useContext, memo } from "react";
import {z} from "zod"
import { AuthUser } from "../schema/AuthSchema";
import { Link } from "react-router-dom";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";
import DisplayAvatar from "../components/DisplayAvatar";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../context/LocalizationProvider";
import useAuthUser from "../hooks/useAuthUser";
import { setLogout, useAppStore } from "../store";
import { useMutation } from "@tanstack/react-query";
import { LogoutApi } from "../api";
import axiosClient from "../axios/axiosClient";

type propsWithState = PropsWithChildren & {
    authUser : z.infer<typeof AuthUser>
}

type NavBarContextType = {
    user : z.infer<typeof AuthUser>
    // theme : Themestypes,
    local : "en" | "my",
    changeLocal : () => void
}

const NavBarContext = createContext<NavBarContextType | null>(null);

//controll sub component are wrapped inside provider component
function useNavBarContext (){
    const context = useContext(NavBarContext);
    if(context === null){
        throw new AppError(StatusCode.Conflict, "no navbarcontext");
    }
    return context;
};

const Navbar = ({children, authUser} : propsWithState) => {
    const {
        local,
        changeLocal
    } = useLocalization();

    return (
        <NavBarContext.Provider value={{user : authUser, local, changeLocal }}>
            <div id="nav" className="px-[4rem] bg-skin-main h-[5rem] w-full flex items-center fixed top-0">
                <div className="flex justify-between items-center w-full">
                    {children}
                </div>
            </div>
        </NavBarContext.Provider>
    )
}

Navbar.Brand = () => {
    const {t} = useTranslation();
    return (
        <div id="brand">
            <h3 className="text-2xl uppercase font-bold text-white">{t("brand_name")}</h3>
        </div>
    )
}

const areEqual = (prevProps : any, nextProps : any) => {
    return prevProps.user === nextProps.user;
};

Navbar.ProfileBtn = memo(() => {
    const {user} = useNavBarContext() as NavBarContextType;
    const MemoDisplayAvatar = memo(DisplayAvatar);
    return (
        <div>
            <Link to="/Profile">
                <div className="flex gap-2 items-center justify-center">
                    <MemoDisplayAvatar 
                        hasAvatar={user?.avatar}
                        name={user?.name}
                        avatar={user?.avatar}
                    />
                    <h4 className="text-white text-sm">{user.name}</h4>
                </div>
            </Link>
        </div>
    )
}, areEqual)

Navbar.AuthBtn = () => {
    const prop = useNavBarContext() as NavBarContextType;
    const {t} = useTranslation();

    return (
        <div className="flex gap-2 text-white">
            <Link to="/sign_in">{t("login_text")}</Link>
            <div>|</div>
            <Link to="/sign_up">register </Link>
        </div>
    )
}

Navbar.LogoutBtn = () => {

    const {
        dispatch
    } = useAppStore() as any;

    const {
        mutate
    }= useMutation({
        mutationFn : () => {
            return axiosClient.post(LogoutApi());
        },
        onSuccess : () => {
            dispatch(setLogout());
        }
    })

    const handleLogout = () => {
        mutate()
    }

    return (
        <>
            <button 
            className="text-white"
            onClick={handleLogout}
            > Logout
            </button>
        </>
    )
}

Navbar.localToggler = () => {

    const props = useNavBarContext() as NavBarContextType;
    const handleToggler = () => {
        props.changeLocal();
    }

    return (
        <>
            <button
            className="bg-skin-secondary px-2 rounded-md text-sm"
            onClick={handleToggler}
            >{props.local}
            </button>
        </>
    )
}

export default Navbar;