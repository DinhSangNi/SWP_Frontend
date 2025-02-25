import CourseCarousel from "@/components/CourseCarousel";
import { Carousel } from "antd";
import Target from "./components/Target";
import Mission from "./components/Mission";
import Report from "./components/Report";
import { motion } from "framer-motion";
type Props = {};

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "400px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
};

const Home = (props: Props) => {
    return (
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
                                    Skills for your present (and your future).
                                    Get started with us.
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
                                    Skills for your present (and your future).
                                    Get started with us.
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
                                    Skills for your present (and your future).
                                    Get started with us.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Carousel>

            {/* COURSES SLIDER */}
            <div className="w-mainContent mx-auto">
                <CourseCarousel
                    heading={
                        <h1 className="text-[32px] font-bold">
                            Students Are Viewing
                        </h1>
                    }
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
    );
};

export default Home;
