import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "../Footer";
import SpinnerLoading from "../SpinnerLoading";

const MainLayout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <>
            <div className="bg-gray-200">
                {loading ? (
                    <div className="w-full h-screen">
                        <SpinnerLoading />
                    </div>
                ) : (
                    <>
                        <Header setLoading={setLoading} />
                        <main>
                            <Outlet />
                        </main>
                        <Footer />
                    </>
                )}
            </div>
        </>
    );
};

export default MainLayout;
