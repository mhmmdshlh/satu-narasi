import { HeroSection } from "../features/home/HeroSection"
import { AboutSection } from "../features/home/AboutSection"
import { useLocation } from "react-router-dom"
import { useEffect } from "react";

export const Home = () => {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        if (!hash) return;

        const el = document.querySelector(hash);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    return (
        <>
            <HeroSection />
            <AboutSection />
        </>
    )
}
