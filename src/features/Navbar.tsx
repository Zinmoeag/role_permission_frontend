import { createContext, PropsWithChildren, useContext, memo } from "react";
import {z} from "zod"
import { AuthUser } from "../schema/AuthSchema";
import { Link } from "react-router-dom";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";
import DisplayAvatar from "../components/DisplayAvatar";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../context/LocalizationProvider";
import { setLogout, useAppStore } from "../store";
import { useMutation } from "@tanstack/react-query";
import { LogoutApi } from "../api";
import axiosClient from "../axios/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import queryClient from "../service/QueryClient";
import Avatar from '@mui/material/Avatar';

type propsWithState = PropsWithChildren & {
    authUser : z.infer<typeof AuthUser>,
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
            <div id="nav" className={`px-4 bg-skin-main text-slate-800 max-h-layoutHeight h-full flex items-center shadow-md`}>
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
            <h3 className="text-lg uppercase font-bold">{t("brand_name")}</h3>
        </div>
    )
}

const areEqual = (prevProps : any, nextProps : any) => {
    return prevProps.user === nextProps.user;
};

Navbar.ProfileBtn = memo(() => {
    const {user} = useNavBarContext() as NavBarContextType;

    console.log(user.avatar)
    return (
        <div>
            <Link to="/Profile">
                <div className="flex gap-2 items-center justify-center">
                    <Avatar alt={user.name} src='https://lh3.googleusercontent.com/a/ACg8ocInheEqIP1afC-BQ8qW0TlANZY6toslYYx2ELfvSNICS-g45xE=s96-c' />
                </div>
            </Link>
        </div>
    )
}, areEqual)

Navbar.AuthBtn = () => {
    const prop = useNavBarContext() as NavBarContextType;
    const {t} = useTranslation();

    return (
        <div className="flex gap-2  ">
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

            queryClient.refetchQueries({
                queryKey : ["authUser"]
            })
        }
    })

    const handleLogout = () => {
        mutate()
    }

    return (
        <>
            <button 
            className=" "
            onClick={handleLogout}
            > Logout
            </button>
        </>
    )
}


Navbar.sideBarToggler = ({onClick} : {onClick : () => any}) => {
    // onClick();
    return (
        <>
            <button
            onClick={onClick}
            >
                <FontAwesomeIcon icon={faBars} />
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