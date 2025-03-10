import {
    enrollCourse,
    getAllCourses,
    getCourseById,
} from "@/services/courseService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiSealWarningFill } from "react-icons/pi";
import { Button, ConfigProvider, Image, Skeleton, List } from "antd";
// import { IoCheckmarkOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { MdDateRange, MdLanguage } from "react-icons/md";
import { FaBullhorn } from "react-icons/fa";
import { toast } from "react-toastify";
import CourseCarousel from "@/components/CourseCarousel";
import { CourseType } from "../Home";
import CustomSkeleton from "@/components/CustomSkeleton";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { motion } from "motion/react";
import announcemmentsApi from "@/services/announcements";
import InfiniteScroll from "react-infinite-scroll-component";
import { Announcement, CourseResponse } from "./interface";

const CourseDetail = () => {
    const [course, setCourse] = useState<CourseResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [enrollLoading, setEnrollLoading] = useState<boolean>(false);
    const [couresCarouselLoading, setCourseCarouselLoading] =
        useState<boolean>(false);
    const [carouselLoading, setCarouselLoading] = useState(false);
    const [courses, setCourses] = useState<CourseType[] | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [showAnnouncements, setShowAnnouncements] = useState(false);
    const [visibleAnnouncements, setVisibleAnnouncements] = useState<
        Announcement[]
    >([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    // Số lượng thông báo cố định hiển thị mỗi lần
    const announcementsPerPage = 5;

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleEnrollCourse = async () => {
        try {
            setEnrollLoading(true);
            const response = await enrollCourse(id!);
            if (response.status === 200 || response.status === 201) {
                toast.success(
                    "Enroll Successfully! Please waiting for admin to confirm."
                );
            }
        } catch (error: any) {
            console.log("error: ", error);
            toast.error("Enroll failed!");
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        } finally {
            setEnrollLoading(false);
        }
    };

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                setLoading(true);
                const response = await getCourseById(id!);
                setCourse(response.data);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    toast.error("Your token expired! Please re-authenticate!");
                    navigate("/login");
                }
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllCourses = async () => {
            try {
                setCarouselLoading(true);
                const response = await getAllCourses();
                setCourses(response.data.$values);
            } catch (error) {
                console.error("Error fetching all courses:", error);
            } finally {
                setCarouselLoading(false);
            }
        };

        fetchCourseDetail();
        fetchAllCourses();
    }, [id, navigate]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response =
                    await announcemmentsApi.getAnnouncemmentsByIdCourse(id!);
                const allAnnouncements = response.data.$values;
                setAnnouncements(allAnnouncements);

                // Luôn hiển thị 5 thông báo đầu tiên
                setVisibleAnnouncements(
                    allAnnouncements.slice(0, announcementsPerPage)
                );

                // Chỉ hiển thị phần thông báo nếu có dữ liệu
                if (allAnnouncements.length > 0) {
                    setShowAnnouncements(true);
                }

                // Chỉ có hasMore khi có nhiều hơn 5 thông báo
                setHasMore(allAnnouncements.length > announcementsPerPage);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };
        fetchAnnouncements();
    }, [id]);

    const fetchMoreAnnouncements = () => {
        // Nếu không còn thông báo để hiển thị
        if (page * announcementsPerPage >= announcements.length) {
            setHasMore(false);
            return;
        }

        // Tăng số trang và cập nhật thông báo hiển thị
        setTimeout(() => {
            const nextPage = page + 1;
            setPage(nextPage);

            setVisibleAnnouncements(
                announcements.slice(0, nextPage * announcementsPerPage)
            );
        }, 500);
    };

    return (
        <>
            <motion.div
                className="w-mainContent mx-auto min-h-[500px] bg-gray-100 px-10 pb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between">
                    <div className="flex justify-center py-4 my-3 basis-2/5">
                        {loading ? (
                            <CustomSkeleton className="w-[410px] h-full" />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Image
                                    width={410}
                                    src="https://i.ytimg.com/vi/gp5H0Vw39yw/maxresdefault.jpg"
                                    alt="Course Thumbnail"
                                />
                                {showAnnouncements && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="mt-6 overflow-hidden rounded-lg shadow-lg"
                                    >
                                        <div className="flex items-center p-3 bg-gradient-to-r from-purple-600 to-blue-500">
                                            <FaBullhorn className="mr-2 text-xl text-white" />
                                            <h3 className="text-lg font-bold text-white">
                                                Thông báo khóa học
                                            </h3>
                                        </div>
                                        <div
                                            id="scrollableDiv"
                                            ref={scrollContainerRef}
                                            style={{
                                                height: 400,
                                                overflow: "auto",
                                                padding: "0",
                                                backgroundColor: "#f8f9fa",
                                            }}
                                            className="scroll-smooth"
                                        >
                                            <InfiniteScroll
                                                dataLength={
                                                    visibleAnnouncements.length
                                                }
                                                next={fetchMoreAnnouncements}
                                                hasMore={hasMore}
                                                loader={
                                                    <motion.div
                                                        className="py-3 text-center"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 1,
                                                            repeatType:
                                                                "reverse",
                                                        }}
                                                    >
                                                        <div className="inline-block w-6 h-6 border-4 border-purple-600 border-solid rounded-full animate-spin border-r-transparent"></div>
                                                        <p className="mt-2 text-purple-600">
                                                            Đang tải thêm...
                                                        </p>
                                                    </motion.div>
                                                }
                                                scrollableTarget="scrollableDiv"
                                                endMessage={
                                                    <motion.div
                                                        className="py-4 text-center text-gray-500"
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.5,
                                                        }}
                                                    >
                                                        <p>
                                                            🎉 Đã hiển thị tất
                                                            cả thông báo 🎉
                                                        </p>
                                                    </motion.div>
                                                }
                                            >
                                                <List
                                                    dataSource={
                                                        visibleAnnouncements
                                                    }
                                                    renderItem={(
                                                        item,
                                                        index
                                                    ) => (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    index * 0.1,
                                                                duration: 0.3,
                                                            }}
                                                            whileHover={{
                                                                scale: 1.01,
                                                                backgroundColor:
                                                                    "#f0f4ff",
                                                            }}
                                                        >
                                                            <List.Item
                                                                key={item.id}
                                                                className="transition-all duration-200 border-b hover:bg-gray-50"
                                                            >
                                                                <div className="w-full p-4">
                                                                    <div className="flex items-center text-lg font-bold text-blue-700">
                                                                        <motion.div
                                                                            className="w-2 h-2 mr-2 bg-blue-600 rounded-full"
                                                                            animate={{
                                                                                scale: [
                                                                                    1,
                                                                                    1.2,
                                                                                    1,
                                                                                ],
                                                                            }}
                                                                            transition={{
                                                                                duration: 2,
                                                                                repeat: Infinity,
                                                                            }}
                                                                        />
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </div>
                                                                    <motion.div
                                                                        className="pl-2 mt-2 ml-4 text-gray-700 border-l-2 border-gray-300"
                                                                        initial={{
                                                                            height: 0,
                                                                            opacity: 0,
                                                                        }}
                                                                        animate={{
                                                                            height: "auto",
                                                                            opacity: 1,
                                                                        }}
                                                                        transition={{
                                                                            delay:
                                                                                0.2 +
                                                                                index *
                                                                                    0.1,
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.content
                                                                        }
                                                                    </motion.div>
                                                                </div>
                                                            </List.Item>
                                                        </motion.div>
                                                    )}
                                                />
                                            </InfiniteScroll>
                                        </div>
                                        <div>
                                            <Button
                                                variant="solid"
                                                color="purple"
                                                loading={enrollLoading}
                                                className="px-5 py-3 font-bold rounded-sm"
                                                onClick={handleEnrollCourse}
                                            >
                                                Enroll
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                    <div className="text-black basis-3/5">
                        <div className="w-full py-4 px-28">
                            {loading ? (
                                <Skeleton
                                    className="w-1/3 h-full my-5"
                                    loading={loading}
                                    active
                                    paragraph={{ rows: 6 }}
                                />
                            ) : (
                                <>
                                    <h1 className="my-3 text-3xl font-bold">
                                        {course?.courseName}
                                    </h1>
                                    <p className="my-3 text-xl">
                                        {course?.description}
                                    </p>
                                    <p className="text-[1rem]">
                                        Created by{" "}
                                        <span className="font-bold text-purple-600 hover:underline">
                                            <Link to="">
                                                {course?.createdBy.fullName}
                                            </Link>
                                        </span>
                                    </p>
                                    <p className="text-[0.8rem] flex items-center gap-1">
                                        <MdDateRange className="text-[1rem] text-black" />
                                        From <span>{course?.startDate}</span> To{" "}
                                        <span>{course?.endDate}</span>
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <p className="text-[0.8rem] flex items-center gap-1">
                                            <PiSealWarningFill className="text-black text-[1rem]" />
                                            Last Updated {course?.startDate}
                                        </p>
                                        <p className="text-[0.8rem] flex items-center gap-1">
                                            <MdLanguage className="text-black text-[1rem]" />{" "}
                                            VietNamese
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <motion.div
                    className="w-full mt-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <CourseCarousel
                        heading={
                            <h1 className="text-2xl font-bold">
                                You also might like
                            </h1>
                        }
                        items={courses}
                        loading={carouselLoading}
                    />
                </motion.div>
            </motion.div>
        </>
    );
};

export default CourseDetail;
