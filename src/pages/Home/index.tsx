import CourseCarousel from "@/components/CourseCarousel";
import { Button, Carousel, Form, Input } from "antd";
import Target from "./components/Target";
import Mission from "./components/Mission";
import Report from "./components/Report";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDropup } from "react-icons/io";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/services/courseService";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { submitQnA } from "@/services/q&aService";

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

    const navigate = useNavigate();

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

    const handleSubmitQnA = async (credentials: any) => {
        try {
            const response = await submitQnA({
                title: credentials.title,
                content: credentials.content,
            });
            if (response.status === 200 || response.status === 201) {
                toast.success("Submit successfully !");
            }
        } catch (error: any) {
            console.log("error: ", error);
            toast.error("Submit failed !");
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

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
                {/* Q&A */}
                <div className="w-mainContent mx-auto my-7 flex justify-between gap-10">
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold mb-3">Q&A</h1>
                        <p className="text-[1.2rem]">
                            Have any questions? Let us know.
                        </p>
                        <div className="my-7">
                            <Form layout="vertical" onFinish={handleSubmitQnA}>
                                <Form.Item
                                    label={<p className="text-xl">Title:</p>}
                                    name="title"
                                >
                                    <Input
                                        placeholder="Enter title"
                                        className="hover:border-purple-400 focus-within:border-purple-400 focus-within:shadow-none"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<p className="text-xl">Content:</p>}
                                    name="content"
                                >
                                    <Input
                                        placeholder="Enter content"
                                        className="hover:border-purple-400 focus-within:border-purple-400 focus-within:shadow-none"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        className="font-bold"
                                        variant="outlined"
                                        color="purple"
                                        htmlType="submit"
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Link
                                to="/Qna"
                                className="flex gap-1 transition-all duration-300 underline hover:text-purple-400"
                            >
                                <p className="underline">
                                    See other questions here
                                </p>
                                <span>
                                    <IoIosArrowRoundForward className="text-[1.5rem]" />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/7757/7757194.png"
                            alt=""
                        />
                    </div>
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
