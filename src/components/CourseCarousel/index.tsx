import { Button, Carousel } from "antd";
import { Card } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { ReactNode, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link từ react-router-dom
import { motion } from "framer-motion";
import { formatDate } from "@/utils/dateUtils";
import { MdDateRange } from "react-icons/md";
import CustomSkeleton from "../CustomSkeleton";

type props = {
    heading: ReactNode;
    items?: any[] | null;
    loading?: boolean;
};
const CourseCarousel = ({ heading, items, loading }: props) => {
    const carouselRef = useRef<CarouselRef>(null);
    const navigate = useNavigate();

    const handleNext = () => {
        carouselRef.current?.next();
    };

    const handlePrev = () => {
        carouselRef.current?.prev();
    };

    return (
        <div className="w-full mt-5">
            {!loading ? (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    x: -50,
                                },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                },
                            }}
                        >
                            {heading}
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    x: 50,
                                },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                },
                            }}
                            className="flex items-center gap-x-2"
                        >
                            <Button
                                onClick={handlePrev}
                                className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                            >
                                &lt;
                            </Button>
                            <Button
                                onClick={handleNext}
                                className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                            >
                                &gt;
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 50,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                    >
                        <Carousel
                            ref={carouselRef}
                            infinite={true}
                            slidesToShow={4}
                            slidesToScroll={1}
                            dots={false}
                            className="carousel-container"
                        >
                            {items &&
                                items!.map((item) => (
                                    <div
                                        key={item.$id}
                                        className="px-2 transition-opacity duration-300 hover:opacity-70"
                                    >
                                        {" "}
                                        {/* Thêm hiệu ứng hover */}
                                        <Link to={`/courses/${item.courseId}`}>
                                            {" "}
                                            {/* Thêm Link để chuyển hướng */}
                                            <Card
                                                style={{ width: "100%" }}
                                                cover={
                                                    <img
                                                        src="https://i.ytimg.com/vi/gp5H0Vw39yw/maxresdefault.jpg"
                                                        alt="Course Thumnail"
                                                        className="object-cover w-full h-40"
                                                    />
                                                }
                                                bodyStyle={{ padding: "16px" }}
                                                className="w-full h-[400px] shadow-md hover:shadow-lg transition-shadow rounded-none"
                                            >
                                                {/* CONTENT */}
                                                <div className="flex flex-col gap-y-2 h-full">
                                                    <div className="text-[1.1rem] font-bold text-start line-clamp-2">
                                                        {item.courseName}
                                                    </div>
                                                    <p className="text-[0.9rem] opacity-50 font-normal text-start line-clamp-4">
                                                        {item.description}
                                                    </p>
                                                    <p className="flex gap-2 items-center text-[0.8rem]">
                                                        <span>
                                                            <MdDateRange className="text-[1rem] text-black" />
                                                        </span>
                                                        {`${formatDate(item.startDate)} -
                                                ${formatDate(item.startDate)}`}
                                                    </p>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                ))}
                        </Carousel>

                        <div className="flex items-center justify-center w-full mt-4 cursor-pointer">
                            <Button
                                className="font-bold"
                                color="purple"
                                variant="text"
                                onClick={() => navigate("/all-courses")}
                            >
                                See more
                            </Button>
                        </div>
                    </motion.div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <CustomSkeleton className="h-[2.5rem] w-[20rem]" />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <CustomSkeleton className="h-[2.5rem] w-[5rem]" />
                        </div>
                    </div>

                    <div>
                        <Carousel
                            slidesToShow={4}
                            dots={false}
                            className="carousel-container"
                        >
                            <div className="px-2">
                                {" "}
                                {/* Thêm hiệu ứng hover */}
                                <Link to="" className="cursor-default">
                                    {" "}
                                    {/* Thêm Link để chuyển hướng */}
                                    <Card
                                        style={{ width: "100%" }}
                                        cover={
                                            <CustomSkeleton className="w-full h-40" />
                                        }
                                        bodyStyle={{ padding: "16px" }}
                                        className="w-full h-[400px] shadow-md hover:shadow-lg transition-shadow rounded-none"
                                    >
                                        {/* CONTENT */}
                                        <div className="flex flex-col gap-y-2">
                                            <div className="text-[1.5rem] font-bold text-start">
                                                <CustomSkeleton className="h-[24px] w-[7rem]" />
                                            </div>
                                            <p className="text-[0.9rem] opacity-50 font-normal text-start">
                                                <CustomSkeleton className="h-[20px] w-[10rem]" />
                                            </p>
                                            <p className="flex gap-2 items-center text-[0.8rem]">
                                                <CustomSkeleton className="h-[20px] w-[10rem]" />
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                            <div className="px-2">
                                {" "}
                                {/* Thêm hiệu ứng hover */}
                                <Link to="" className="cursor-default">
                                    {" "}
                                    {/* Thêm Link để chuyển hướng */}
                                    <Card
                                        style={{ width: "100%" }}
                                        cover={
                                            <CustomSkeleton className="w-full h-40" />
                                        }
                                        bodyStyle={{ padding: "16px" }}
                                        className="w-full h-[400px] shadow-md hover:shadow-lg transition-shadow rounded-none"
                                    >
                                        {/* CONTENT */}
                                        <div className="flex flex-col gap-y-2">
                                            <div className="text-[1.5rem] font-bold text-start">
                                                <CustomSkeleton className="h-[24px] w-[7rem]" />
                                            </div>
                                            <p className="text-[0.9rem] opacity-50 font-normal text-start">
                                                <CustomSkeleton className="h-[20px] w-[10rem]" />
                                            </p>
                                            <p className="flex gap-2 items-center text-[0.8rem]">
                                                <CustomSkeleton className="h-[20px] w-[10rem]" />
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                            <div className="px-2">
                                {" "}
                                {/* Thêm hiệu ứng hover */}
                                <Link to="" className="cursor-default">
                                    {" "}
                                    {/* Thêm Link để chuyển hướng */}
                                    <Card
                                        style={{ width: "100%" }}
                                        cover={
                                            <CustomSkeleton className="w-full h-40" />
                                        }
                                        bodyStyle={{ padding: "16px" }}
                                        className="w-full h-[400px] shadow-md hover:shadow-lg transition-shadow rounded-none"
                                    >
                                        {/* CONTENT */}
                                        <div className="flex flex-col gap-y-2">
                                            <div className="text-[1.5rem] font-bold text-start">
                                                <CustomSkeleton className="h-[24px] w-[7rem]" />
                                            </div>
                                            <p className="text-[0.9rem] opacity-50 font-normal text-start">
                                                <CustomSkeleton className="h-[20px] w-[10rem]" />
                                            </p>
                                            <p className="flex gap-2 items-center text-[0.8rem]">
                                                <CustomSkeleton className="h-[20px] w-[10rem]" />
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                            <div className="px-2">
                                {" "}
                                {/* Thêm hiệu ứng hover */}
                                <Link to="" className="cursor-default">
                                    {" "}
                                    {/* Thêm Link để chuyển hướng */}
                                    <Card
                                        style={{ width: "100%" }}
                                        cover={
                                            <CustomSkeleton className="w-full h-40" />
                                        }
                                        bodyStyle={{ padding: "16px" }}
                                        className="w-full h-[400px] shadow-md hover:shadow-lg transition-shadow rounded-none"
                                    >
                                        {/* CONTENT */}
                                        <div className="flex flex-col gap-y-2">
                                            <div className="text-[1.5rem] font-bold text-start">
                                                <CustomSkeleton className="h-[24px] w-[7rem]" />
                                            </div>
                                            <p className="text-[0.9rem] opacity-50 font-normal text-start">
                                                <CustomSkeleton className="h-[20px] w-[10rem]" />
                                            </p>
                                            <p className="flex gap-2 items-center text-[0.8rem]">
                                                <CustomSkeleton className="h-[20px] w-[10rem]" />
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        </Carousel>

                        <div className="flex items-center justify-center w-full mt-4 cursor-pointer">
                            <CustomSkeleton className="h-[20px] w-[4rem]" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CourseCarousel;
