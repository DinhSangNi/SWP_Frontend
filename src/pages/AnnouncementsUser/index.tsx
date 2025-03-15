import SpinnerLoading from "@/components/SpinnerLoading";
import announcemmentsApi from "@/services/announcements";
import { getMyCources } from "@/services/courseService";
import { handleWhenTokenExpire } from "@/utils/authUtils";
import { Input, Modal, Pagination } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BsQuestionCircle } from "react-icons/bs";
import dayjs from "dayjs";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import { PaginationType } from "@/stores/types";

const AnnouncementsUser = () => {
    const [myCourses, setMyCourses] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [searchedNotifications, setSearchedNotifications] = useState<any[]>(
        []
    );
    const [paginatedNotifications, setPaginatedNotifications] = useState<any[]>(
        []
    );
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [sortByIncrease, setSortByIncrease] = useState<boolean>(true);
    const [selectedNotify, setSelectedNotify] = useState<any>();
    const [notifyDetailModalVisible, setNotifyDetailModalVisible] =
        useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    // Animation
    const arrowRotateEffect = useAnimation();

    const navigate = useNavigate();

    const fetchMyCourses = async () => {
        try {
            const res = await getMyCources();
            if (res.status === 200) {
                setMyCourses(res.data.$values);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    const fetchNotificationsByCourseId = async (courseId: string) => {
        try {
            const res =
                await announcemmentsApi.getAnnouncemmentsByIdCourse(courseId);
            if (res.status === 200) {
                setNotifications(res.data.$values);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSortByDate = () => {
        if (notifications) {
            const sortedNotifications = notifications.sort((a: any, b: any) => {
                const date1 = new Date(a.createdAt);
                const date2 = new Date(b.createdAt);
                return !sortByIncrease
                    ? date1.getTime() - date2.getTime()
                    : date2.getTime() - date1.getTime();
            });
            setNotifications(sortedNotifications);
            setSortByIncrease(!sortByIncrease);
        }
    };

    const handleNotifyClick = async (announcementID: string) => {
        try {
            const response =
                await announcemmentsApi.getAnnouncemmentsByAnnouncementId(
                    announcementID
                );
            if (response.status === 200) {
                setSelectedNotify(response.data);
                setNotifyDetailModalVisible(true);
            }
        } catch (error: any) {
            console.log("error: ", error);
            if (error.status === 401) {
                handleWhenTokenExpire();
                navigate("/login");
            }
        }
    };

    const handlePaginatedQuestions = (notifications: any) => {
        const indexOfLastItem = pagination.currentPage * pagination.pageSize;
        const indexOfFirstItem = indexOfLastItem - pagination.pageSize;
        const currentItems = notifications.slice(
            indexOfFirstItem,
            indexOfLastItem
        );
        return currentItems;
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev: any) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    useEffect(() => {
        fetchMyCourses();
    }, []);

    useEffect(() => {
        if (myCourses.length > 0) {
            fetchNotificationsByCourseId(myCourses[0].courseId);
        }
    }, [myCourses]);

    useEffect(() => {
        if (query.length === 0) {
            setSearchedNotifications([]);
            return;
        }

        const handleShowSearchedQuestions = () => {
            const arr = notifications.filter((notify: any) => {
                return notify.title.includes(query);
            });

            setSearchedNotifications(arr);
        };

        const debounceLimit = setTimeout(handleShowSearchedQuestions, 300);

        return () => clearTimeout(debounceLimit);
    }, [query]);

    useEffect(() => {
        arrowRotateEffect.start(
            !sortByIncrease ? { rotate: 0 } : { rotate: 180 },
            {
                ease: "linear",
                duration: 0.3,
            }
        );

        return () => {
            arrowRotateEffect.stop();
        };
    }, [sortByIncrease, arrowRotateEffect]);

    useEffect(() => {
        if (notifications.length > 0) {
            const paginatedQuestions = handlePaginatedQuestions(notifications);
            setPaginatedNotifications(paginatedQuestions);
        }
    }, [notifications, pagination, sortByIncrease]);

    return (
        <>
            <div className="w-mainContent mx-auto">
                <div className="my-5 w-full">
                    <h1 className="text-3xl font-bold">Notifications</h1>
                </div>

                {/* Search box */}
                <div className="w-full flex items-center mb-10">
                    <div className="w-full flex items-center justify-start gap-4">
                        <Input
                            allowClear
                            className="w-1/3 rounded-3xl shadow-md hover:border-[#6d28d2] focus-within:border-[#6d28d2]"
                            prefix={<IoMdSearch className="text-[1.5rem]" />}
                            onChange={handleSearchChange}
                            value={query}
                            size="large"
                            placeholder="Search by title"
                        />
                    </div>
                    <div className="w-1/5 ">
                        {/* Sort */}
                        <button
                            className="w-full shadow-md rounded-sm flex items-center justify-center gap-1 bg-white text-center py-1 font-bold border-[1px] border-gray-200 transition-color duration-300 hover:text-purple-600 hover:border-purple-600 cursor-pointer"
                            onClick={handleSortByDate}
                        >
                            Sort by Dates{" "}
                            <motion.div
                                initial={{ rotate: 180 }}
                                animate={arrowRotateEffect}
                            >
                                <FaArrowDownLong className="text-[1rem]" />
                            </motion.div>
                        </button>
                    </div>
                </div>

                <div className="border-[1px] border-gray-300 shadow-md mb-5">
                    {loading ? (
                        <SpinnerLoading />
                    ) : (
                        (searchedNotifications.length === 0
                            ? paginatedNotifications
                            : searchedNotifications
                        ).map((notify: any, index: number) => {
                            return (
                                <div
                                    className={`flex items-start gap-3 px-3 py-1 bg-white ${index === notifications.length - 1 ? "" : "border-b-[1px] border-gray-300"} transition-all duration-200 hover:bg-purple-200 cursor-pointer`}
                                    onClick={() =>
                                        handleNotifyClick(notify.announcementID)
                                    }
                                >
                                    <div className="py-2">
                                        <BsQuestionCircle className="text-[2rem]" />
                                    </div>
                                    <div className="w-full">
                                        <h1 className="text-[1.1rem] font-bold">
                                            {notify.title}
                                        </h1>
                                        <p className="w-full text-[0.9rem] flex">
                                            <span className="w-full line-clamp-1">
                                                <p>{notify.content}</p>
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[0.9rem]">
                                            {dayjs(notify.createdAt).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="w-full flex justify-end mb-5">
                    <Pagination
                        total={notifications.length}
                        current={pagination.currentPage}
                        pageSize={pagination.pageSize}
                        showSizeChanger={true}
                        pageSizeOptions={["5", "10", "20"]}
                        onChange={handlePageChange}
                    />
                </div>
                {selectedNotify && (
                    <Modal
                        open={notifyDetailModalVisible}
                        onCancel={() => setNotifyDetailModalVisible(false)}
                        footer={null}
                    >
                        <div className="mb-2">
                            <h1 className="font-bold text-[1.1rem]">Title:</h1>
                            <p>{selectedNotify.title}</p>
                        </div>
                        <div className="mb-2">
                            <h1 className="font-bold text-[1.1rem]">
                                Content:
                            </h1>
                            <p>{selectedNotify.content}</p>
                        </div>
                        <div className="mb-2">
                            <h1 className="font-bold text-[1.1rem]">
                                Create at:
                            </h1>
                            <p>
                                {dayjs(selectedNotify.createdAt).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    );
};

export default AnnouncementsUser;
