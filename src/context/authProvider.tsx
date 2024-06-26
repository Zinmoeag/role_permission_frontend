import React, { createContext, useState, ReactNode, useContext } from 'react';
import { AuthUser } from '../type';

export interface AuthType<user> {
    user : user,
    accessToken : string;
}

export interface AuthContextType {
    auth: AuthType<AuthUser> | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthType<AuthUser> | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthType<AuthUser> | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


