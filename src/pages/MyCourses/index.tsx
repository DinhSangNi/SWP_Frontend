import SpinnerLoading from "@/components/SpinnerLoading";
import CourseCard from "@/components/CourseCard";
import { getAllCourses, getMyCources } from "@/services/courseService";
import { Course } from "@/stores/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CourseCarousel from "@/components/CourseCarousel";
import { CourseType } from "../Home";

const MyCourses = () => {
    const [loading, setLoading] = useState(false);
    const [myCourses, setMyCourses] = useState<Course[]>([]);
    const [courses, setCourses] = useState<CourseType[] | null>(null);
    const navigate = useNavigate();

    const handleOnclick = (courseId: string, enrollmentStatus: string) => {
        navigate(`/myCourses/${courseId}`);
    };

    useEffect(() => {
        // Fetch my coures
        const fetchMyCourses = async () => {
            try {
                setLoading(true);
                const response = await getMyCources();
                if (response.status === 200) {
                    setMyCourses(response.data.$values);
                }
            } catch (error: any) {
                console.log("error: ", error);
                if (error.status === 401) {
                    toast.error("Your token expired! Please re-authenticate!", {
                        position: "top-center",
                    });
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        // Fetch all courses
        const fetchAllCourse = async () => {
            try {
                const response = await getAllCourses();
                if (response.status === 200) {
                    setCourses(response.data.$values);
                }
            } catch (error: any) {
                console.log("error: ", error);
            }
        };

        fetchMyCourses();
        fetchAllCourse();
    }, []);

    return (
        <>
            <div className="w-mainContent mx-auto mb-8">
                {/* HEADING */}
                <div className="text-4xl font-bold my-5">
                    <h1>My Courses</h1>
                </div>
                {/* CONTENTS */}
                {!loading ? (
                    <div>
                        {myCourses.map((course) => {
                            console.log("courseId: ", course.courseId);
                            return (
                                <CourseCard
                                    course={course}
                                    onClick={() =>
                                        handleOnclick(
                                            course.courseId,
                                            course.enrollmentStatus
                                        )
                                    }
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <SpinnerLoading />
                    </div>
                )}
                {/* COURSES CAROUSEL */}
                <div className="w-full mt-10">
                    <CourseCarousel
                        heading={
                            <h1 className="text-2xl font-bold">
                                You also might like
                            </h1>
                        }
                        items={courses}
                    />
                </div>
            </div>
        </>
    );
};

export default MyCourses;
