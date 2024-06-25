import React, { createContext, useState, ReactNode, useContext } from 'react';
import { AuthUser } from '../type';
import {z} from "zod"

interface AuthType<user> {
    user : user,
    accessToken : string;
}

export interface AuthContextType {
    auth: AuthType<AuthUser> | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthType<AuthUser> | null>>;
}

const AuthContext = createContext<AuthContextType>({
    auth : null,
    setAuth : () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthType<AuthUser> | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


