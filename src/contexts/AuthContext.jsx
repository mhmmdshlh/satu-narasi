import { createContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase/client";

const AuthContext = createContext({});

export { AuthContext };
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                setProfileLoading(!!currentUser);
            } catch (error) {
                console.error("Error checking session:", error);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const newUser = session?.user ?? null;
            setUser(newUser);
            setProfileLoading(!!newUser);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!user) {
            setProfile(null);
            setProfileLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error("Error fetching profile:", error);
                    setProfile(null);
                } else {
                    setProfile(data);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setProfile(null);
            } finally {
                setProfileLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const value = {
        user,
        profile,
        loading,
        profileLoading,
        signOut: async () => {
            await supabase.auth.signOut();
            setUser(null);
            setProfile(null);
            setProfileLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
