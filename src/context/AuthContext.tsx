import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("maglo_auth");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed.user);
        }
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        localStorage.setItem("maglo_auth", JSON.stringify({ user: userData, token }));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("maglo_auth");
    };

    return <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
