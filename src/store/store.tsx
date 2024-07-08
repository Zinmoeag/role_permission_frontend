import { ReactNode, createContext, useContext, useReducer } from "react";
import { Store } from "./types";
import reducer from "./reducer";

const AppStoreContext = createContext<null | {state : Store, dispatch : any}>(null);

export const InitailAppState : Store= {
    user : undefined,
    auth_access_token : null,
};

const AppStoreProvider = ({children} : {children : ReactNode} ) => {
    const [state, dispatch] = useReducer(reducer, InitailAppState);

    return (
        <AppStoreContext.Provider value={{state, dispatch}}>
            {children}
        </AppStoreContext.Provider>
    )
}

export const useAppStore = () => useContext(AppStoreContext);

export default AppStoreProvider;