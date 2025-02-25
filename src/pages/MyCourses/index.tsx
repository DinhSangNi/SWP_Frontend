import SpinnerLoading from "@/components/SpinnerLoading";
import CourseCard from "@/components/CourseCard";
import { getMyCources } from "@/services/courseService";
import { Course } from "@/stores/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const MyCourses = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const [myCourses, setMyCourses] = useState<Course[]>([]);
    const navigate = useNavigate();

    const handleOnclick = (courseId: string) => {
        navigate(`/myCourses/${courseId}`);
    };

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setLoading(true);
                const response = await getMyCources();
                if (response) {
                    setMyCourses(response.$values);
                }
            } catch (error) {
                console.log("error: ", error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch courses from db
        fetchMyCourses();
    }, []);

    return (
        <>
            <div className="w-mainContent mx-auto mb-8">
                {/* HEADING */}
                <div className="text-3xl font-bold my-5">
                    <h1>My Courses</h1>
                </div>
                {/* CONTENTS */}
                {!loading ? (
                    <div>
                        {myCourses.map((course) => {
                            return (
                                <CourseCard
                                    course={course}
                                    onClick={() => handleOnclick(course.$id)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <SpinnerLoading />
                    </div>
                )}
            </div>
        </>
    );
};

export default MyCourses;
