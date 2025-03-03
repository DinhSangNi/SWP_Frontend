import { getAllCourses } from "@/services/courseService";
import { useEffect, useState } from "react";
import { CourseType } from "../Home";
import { formatDate } from "@/utils/dateUtils";
import { MdDateRange } from "react-icons/md";
import { ConfigProvider, Pagination, Select } from "antd";
import { PaginationType } from "@/stores/types";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "@/components/SpinnerLoading";

const AllCourses = () => {
    const [allCourses, setAllCourses] = useState<CourseType[] | null>(null);
    const [showedCourses, setShowedCourses] = useState<CourseType[] | null>(
        null
    );
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 5,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleShowCourses = () => {
        const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
        allCourses &&
            setShowedCourses(
                allCourses?.slice(startIndex, startIndex + pagination.pageSize)
            );
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
            pageSize: pageSize,
        }));
    };

    const handleCourseOnclick = (courseId: number) => {
        navigate(`/courses/${courseId}`);
    };

    const handleFilterCourses = (value: any) => {
        console.log("value: ", value);
        if (value === "oldest") {
            let newAllCourses: CourseType[] = [...allCourses!];
            console.log("newAllCourses", newAllCourses);

            setAllCourses(
                newAllCourses?.sort((a: CourseType, b: CourseType) => {
                    const date1 = new Date(a.startDate);
                    const date2 = new Date(b.startDate);
                    return date1.getTime() - date2.getTime();
                })
            );
        }

        if (value === "newest") {
            let newAllCourses: CourseType[] = [...allCourses!];
            console.log("newAllCourses", newAllCourses);

            setAllCourses(
                newAllCourses?.sort((a: CourseType, b: CourseType) => {
                    const date1 = new Date(a.startDate);
                    const date2 = new Date(b.startDate);
                    return -(date1.getTime() - date2.getTime());
                })
            );
        }

        // const date1 = new Date(allCourses[0].startDate);
        // const date2 = new Date(allCourses[1].startDate);
        // console.log("date1: ", date1.getTime());
        // console.log("date2: ", date2.getTime());
    };

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                setLoading(true);
                const response = await getAllCourses();
                if (response.status == 200) {
                    setAllCourses(
                        response.data.$values.sort(
                            (a: CourseType, b: CourseType) => {
                                const date1 = new Date(a.startDate);
                                const date2 = new Date(b.startDate);
                                return date2.getTime() - date1.getTime();
                            }
                        )
                    );
                }
            } catch (error) {
                console.log("error: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCourses();
    }, []);

    useEffect(() => {
        handleShowCourses();
    }, [allCourses, pagination]);

    console.log("all courses: ", allCourses);

    return (
        <>
            <div className="w-mainContent mx-auto">
                {/* Page Heading */}
                <div className="flex justify-between my-8">
                    <div className="text-4xl ">All Courses</div>

                    <ConfigProvider
                        theme={{
                            components: {
                                Select: {
                                    activeBorderColor: "#6d28d2",
                                    hoverBorderColor: "#6d28d2",
                                    activeOutlineColor: "",
                                },
                            },
                        }}
                    >
                        <Select
                            className="w-[6rem]"
                            defaultValue="newest"
                            title="Sort by "
                            options={[
                                { value: "newest", label: "Newest" },
                                { value: "oldest", label: "Oldest" },
                            ]}
                            onChange={(value) => handleFilterCourses(value)}
                        />
                    </ConfigProvider>
                </div>
                {/* Courses List */}
                {loading ? (
                    <div className="w-full mb-5">
                        <SpinnerLoading />
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-3 mb-5">
                        {showedCourses?.map((course: CourseType) => {
                            return (
                                <div
                                    onClick={() =>
                                        handleCourseOnclick(course!.courseId)
                                    }
                                    className="flex pb-5 border-b-2 border-gray-200 max-h-[200px] hover:opacity-70 transition-all duration-300 hover:border-primary-purple cursor-pointer"
                                >
                                    <div className="basis-1/4 max-h-[145px]">
                                        <img
                                            className="w-[260px] h-full"
                                            src="https://img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="basis-3/4 flex flex-col justify-between">
                                        <div>
                                            <h1 className="text-[1.2rem] font-bold">
                                                {course.courseName}
                                            </h1>
                                            <p className="text-[1rem]">
                                                {course.description}
                                            </p>
                                        </div>
                                        <p className="flex gap-2 items-center text-[0.8rem]">
                                            <span>
                                                <MdDateRange className="text-[1rem] text-black" />
                                            </span>
                                            {`${formatDate(course.startDate)} - ${formatDate(course.startDate)}`}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="w-full flex justify-end mb-5">
                    <Pagination
                        total={allCourses?.length}
                        current={pagination.currentPage}
                        pageSize={pagination.pageSize}
                        onChange={handlePageChange}
                        pageSizeOptions={["5", "10"]}
                        showSizeChanger
                    />
                </div>
            </div>
        </>
    );
};

export default AllCourses;
