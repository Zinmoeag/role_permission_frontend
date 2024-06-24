import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AuthType {
    user : object,
    accessToken : string;
}

export interface AuthContextType {
    auth: AuthType | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthType | null>>;
}

const AuthContext = createContext<AuthContextType>({
    auth : null,
    setAuth : () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthType | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


