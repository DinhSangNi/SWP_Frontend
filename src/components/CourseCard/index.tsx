import { Button, Card } from "antd";
// import { StarIcon } from "@heroicons/react/24/solid";
import { Course } from "@/stores/types";

type Props = {
    course?: Course;
    onClickDetail?: () => void;
};

const CourseCard = ({ course, onClickDetail }: Props) => {
    return (
        <>
            <Card
                className="mt-3 transition-colors duration-300 hover:border-purple-500"
                onClick={onClickDetail}
            >
                <div className="w-full flex items-start justify-between md:gap-5">
                    {/* LEFT SIDE */}
                    <div className="basis-2/3 flex justify-start gap-4 md:gap-16">
                        {/* IMAGE */}
                        <div className="basis-2/5">
                            <img
                                className="w-full"
                                src="https://i.ytimg.com/vi/gp5H0Vw39yw/maxresdefault.jpg"
                                alt="Course Thumnail"
                            />
                        </div>
                        {/* SHORT INFORMATION */}
                        <div className="basis-3/5 flex flex-col justify-between">
                            <div>
                                {/* COURSE NAME */}
                                <h1 className="font-bold text-[1.3rem]">
                                    {course!.courseName}
                                </h1>
                                {/* DESCRIPTION */}
                                <p className="text-[0.8rem]">
                                    {course!.description}
                                </p>
                            </div>
                            {/* DATE */}
                            <div>
                                <p className="text-[0.8rem]">
                                    From{" "}
                                    <span className="font-bold">
                                        {course!.startDate}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-bold">
                                        {course!.endDate}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="w-1/4 flex justify-between gap-3">
                        {/* STATUS */}
                        <div className="w-3/5">
                            {course?.enrollmentStatus && (
                                <div
                                    className={`${course!.enrollmentStatus === "Confirmed" ? "text-green-500 border-green-500" : "text-red-500 border-red-500"} w-2/3 mx-auto text-xl font-bold py-3 border-[1px]`}
                                >
                                    <p className="md:text-[1rem] text-center">
                                        {course!.enrollmentStatus}
                                    </p>
                                </div>
                            )}
                        </div>
                        {/* ACTIONS */}
                        <div className="w-2/5 flex flex-col justify-start items-start text-[1.4rem] text-right text-purple-600">
                            {/* <Button
                                className="px-2 font-bold"
                                color="purple"
                                variant="text"
                            >
                                Remove
                            </Button> */}
                            <Button
                                className="px-2 font-bold"
                                color="purple"
                                variant="text"
                                onClick={onClickDetail}
                            >
                                Detail
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default CourseCard;
