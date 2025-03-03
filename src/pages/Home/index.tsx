import CourseCarousel from "@/components/CourseCarousel";
import { Button, Carousel } from "antd";
import Target from "./components/Target";
import Mission from "./components/Mission";
import Report from "./components/Report";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDropup } from "react-icons/io";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/services/courseService";

export type CourseType = {
    $id: string;
    courseId: number;
    courseName: string;
    description: string;
    startDate: string;
    endDate: string;
};

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "400px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
};

const Home = () => {
    const [courses, setCourses] = useState<CourseType[] | null>(null);
    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const [carouselLoading, setCarouselLoading] = useState<boolean>(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const scrollPage = () => {
            if (window.scrollY > 300) {
                setIsVisibleButton(true);
            } else {
                setIsVisibleButton(false);
            }
        };

        window.addEventListener("scroll", scrollPage);

        return () => {
            window.removeEventListener("scroll", scrollPage);
        };
    }, []);

    useEffect(() => {
        // Fetch All Courses
        const fetchAllCourses = async () => {
            try {
                setCarouselLoading(true);
                const response = await getAllCourses();
                if (response.status === 200) {
                    setCourses(response.data.$values);
                }
            } catch (error) {
                console.log("error: ", error);
            } finally {
                setCarouselLoading(false);
            }
        };

        fetchAllCourses();
    }, []);

    return (
        <>
            <div className="w-full">
                {/* INTRODUCTION CAROUSEL */}
                <Carousel arrows infinite autoplay autoplaySpeed={3000}>
                    <div>
                        <div style={contentStyle} className="relative">
                            <img
                                src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
                                alt="example"
                                className="relative w-full"
                            />
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        x: -80,
                                    },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                    },
                                }}
                                className="absolute w-[17rem] md:w-[30rem] shadow-2xl rounded-sm bg-white text-xl text-black top-[3rem] left-[3rem] md:top-[5rem] md:left-[5rem]"
                            >
                                <div className="p-2 md:p-[2rem] flex flex-col items-start">
                                    <h2 className="text-[1rem] md:text-[2rem] font-bold md:mb-4">
                                        Learning that gets you
                                    </h2>
                                    <p className="text-[13px] md:text-[1.1rem] text-left">
                                        Skills for your present (and your
                                        future). Get started with us.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div>
                        <div style={contentStyle} className="relative">
                            <img
                                src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
                                alt="example"
                                className="relative w-full"
                            />
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        x: -80,
                                    },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                    },
                                }}
                                className="absolute w-[17rem] md:w-[30rem] shadow-2xl rounded-sm bg-white text-xl text-black top-[3rem] left-[3rem] md:top-[5rem] md:left-[5rem]"
                            >
                                <div className="p-2 md:p-[2rem] flex flex-col items-start">
                                    <h2 className="text-[1rem] md:text-[2rem] font-bold md:mb-4">
                                        Learning that gets you
                                    </h2>
                                    <p className="text-[13px] md:text-[1.1rem] text-left">
                                        Skills for your present (and your
                                        future). Get started with us.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div>
                        <div style={contentStyle} className="relative">
                            <img
                                src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
                                alt="example"
                                className="relative w-full"
                            />
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        x: -80,
                                    },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                    },
                                }}
                                className="absolute w-[17rem] md:w-[30rem] shadow-2xl rounded-sm bg-white text-xl text-black top-[3rem] left-[3rem] md:top-[5rem] md:left-[5rem]"
                            >
                                <div className="p-2 md:p-[2rem] flex flex-col items-start">
                                    <h2 className="text-[1rem] md:text-[2rem] font-bold md:mb-4">
                                        Learning that gets you
                                    </h2>
                                    <p className="text-[13px] md:text-[1.1rem] text-left">
                                        Skills for your present (and your
                                        future). Get started with us.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Carousel>

                {/* COURSES CAROUSEL */}
                <div className="w-mainContent mx-auto">
                    <CourseCarousel
                        heading={
                            <h1 className="text-[32px] font-bold">
                                Students Are Viewing
                            </h1>
                        }
                        items={courses}
                        loading={carouselLoading}
                    />
                </div>
                {/* Target  */}
                <div className="w-mainContent mx-auto">
                    <Target />
                </div>
                {/* Mission  */}
                <div className="w-mainContent mx-auto">
                    <Mission />
                </div>
                {/* Report  */}
                <div>
                    <Report />
                </div>
            </div>
            <AnimatePresence>
                {isVisibleButton && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "linear" }}
                        id="back-to-top"
                        className="fixed right-5 bottom-5"
                    >
                        <Button
                            color="purple"
                            variant="text"
                            className="px-1 py-7"
                            onClick={scrollToTop}
                        >
                            <IoIosArrowDropup className="text-purple-500 text-5xl" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Home;
