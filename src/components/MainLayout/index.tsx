import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "../Footer";

const MainLayout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <>
            <div
                className={
                    loading
                        ? `before:bg-white before:content-[''] before:w-full before:h-full before:absolute before:z-[100] before:opacity-80`
                        : ""
                }
            >
                <Header setLoading={setLoading} />
                <main className="p-4">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default MainLayout;
