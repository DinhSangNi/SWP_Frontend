import { Button, Carousel, ConfigProvider } from "antd";
import { Card, Rate } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { ReactNode, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import { motion } from "framer-motion";

type props = {
    heading: ReactNode;
};
const CourseCarousel = ({ heading }: props) => {
    const carouselRef = useRef<CarouselRef>(null);

    const handleNext = () => {
        carouselRef.current?.next();
    };

    const handlePrev = () => {
        carouselRef.current?.prev();
    };

    return (
        <div className="w-full mt-5">
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
                    {[...Array(12)].map((item, index) => (
                        <div
                            key={index}
                            className="px-1 transition-transform duration-300 hover:scale-105"
                        >
                            {" "}
                            {/* Thêm hiệu ứng hover */}
                            <Link to={`/course/detail/${index + 1}`}>
                                {" "}
                                {/* Thêm Link để chuyển hướng */}
                                <Card
                                    style={{ width: "100%" }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            className="object-cover w-full h-40"
                                        />
                                    }
                                    bodyStyle={{ padding: "16px" }}
                                    className="w-full h-[400px] shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col gap-y-2">
                                        <div className="text-[17px] font-bold text-start">
                                            React js for beginners
                                        </div>
                                        <p className="text-[12px] opacity-50 font-normal text-start">
                                            Developer
                                        </p>

                                        <div className="flex items-start  gap-x-1 text-[13px] font-medium">
                                            <p className="text-orange-600">
                                                4,8
                                            </p>
                                            <div>
                                                <ConfigProvider
                                                    theme={{
                                                        components: {
                                                            Rate: {
                                                                starSize: 12,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Rate
                                                        disabled
                                                        defaultValue={4}
                                                    />
                                                </ConfigProvider>
                                            </div>
                                            <p>(359)</p>
                                        </div>
                                        <div className="text-[15px] font-bold text-start">
                                            200.000đ
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </Carousel>

                <div className="flex items-center justify-center w-full mt-4 cursor-pointer">
                    <Button color="purple" variant="text">
                        See more
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default CourseCarousel;
