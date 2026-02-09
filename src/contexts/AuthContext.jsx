import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase/client";

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session saat app load
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (error) {
                console.error("Error checking session:", error);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        // Listen for auth changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Cleanup subscription
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value = {
        user,
        loading,
        signOut: async () => {
            await supabase.auth.signOut();
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
