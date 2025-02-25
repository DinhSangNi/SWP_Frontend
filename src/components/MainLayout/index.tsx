import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "../Footer";
import SpinnerLoading from "../SpinnerLoading";

const MainLayout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <>
            <div
            // className={
            //     loading
            //         ? `before:bg-white before:content-[''] before:w-full before:h-full before:absolute before:z-[100] before:opacity-80`
            //         : ""
            // }
            >
                {loading ? (
                    <div className="w-full h-screen">
                        <SpinnerLoading />
                    </div>
                ) : (
                    <>
                        <Header setLoading={setLoading} />
                        <main className="py-8 px-[5rem]">
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
