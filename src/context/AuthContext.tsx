import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextValue = {
    user: User | null;
    isLoading: boolean;
    signIn: (user: User) => void;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("maglo_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("maglo_user");
            }
        }
        setIsLoading(false);
    }, []);

    const signIn = (u: User) => {
        setUser(u);
        localStorage.setItem("maglo_user", JSON.stringify(u));
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("maglo_user");
    };

    return <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}
