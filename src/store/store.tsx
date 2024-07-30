
import { ReactNode, createContext, useContext, useReducer } from "react";
import { Store } from "./types";
import reducer from "./reducer";
import { useCookies } from "react-cookie";
import Themes from "../utils/Theme";

const AppStoreContext = createContext<null | {state : Store, dispatch : any}>(null);

export const InitailAppState = ({
    auth_access = null
}) : Store => {
    return {
        user : null,
        auth_access_token : auth_access,
        theme : Themes.dark,
        local : "en",
    }
};

const AppStoreProvider = ({children} : {children : ReactNode} ) => {
    const [cookies] : any = useCookies(['cookies']);
    const [state, dispatch] = useReducer(reducer, InitailAppState({
        auth_access : cookies?.auth_access || null
    }));

    return (
        <AppStoreContext.Provider value={{state, dispatch}}>
            {children}
        </AppStoreContext.Provider>
    )
}

export const useAppStore = () => useContext(AppStoreContext);

export default AppStoreProvider;