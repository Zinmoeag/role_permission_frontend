
import { ReactNode, createContext, useContext, useReducer } from "react";
import { Store } from "./types";
import reducer from "./reducer";
import Themes from "../utils/Theme";

const AppStoreContext = createContext<null | {state : Store, dispatch : any}>(null);

export const InitailAppState = () : Store => {
    return {
        user : null,
        theme : Themes.defaultTheme,
        local : "en",
    }
};

const AppStoreProvider = ({children} : {children : ReactNode} ) => {
    const [state, dispatch] = useReducer(reducer, InitailAppState());

    return (
        <AppStoreContext.Provider value={{state, dispatch}}>
            {children}
        </AppStoreContext.Provider>
    )
}

export const useAppStore = () => useContext(AppStoreContext);

export default AppStoreProvider;