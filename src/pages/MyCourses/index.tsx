import CourseCard from "@/CourseCard";

type Props = {};

const MyCourses = (props: Props) => {
    return (
        <>
            <div>
                {/* HEADING */}
                <div className="text-2xl my-5">
                    <h1>My Courses</h1>
                </div>
                {/* CONTENTS */}
                <div>
                    <CourseCard />
                </div>
            </div>
        </>
    );
};

export default MyCourses;
