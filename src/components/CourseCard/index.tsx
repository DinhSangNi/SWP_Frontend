import { Button, Card } from "antd";
// import { StarIcon } from "@heroicons/react/24/solid";
import { Course } from "@/stores/types";

type Props = {
    course?: Course;
    onClick?: () => void;
};

const CourseCard = ({ course, onClick }: Props) => {
    return (
        <>
            <Card hoverable className="mt-3" onClick={onClick}>
                <div className="w-full flex items-start md:gap-5">
                    {/* LEFT SIDE */}
                    <div className="basis-1/2 flex justify-start gap-4 md:gap-16">
                        {/* IMAGE */}
                        <div className="basis-2/5">
                            <img
                                className="w-full"
                                src="https://i.ytimg.com/vi/gp5H0Vw39yw/maxresdefault.jpg"
                                alt="Course Thumnail"
                            />
                        </div>
                        {/* SHORT INFORMATION */}
                        <div className="flex flex-col justify-between">
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
                            {/* REVIEW */}
                            {/* <div className="flex items-center mt-2 text-yellow-600">
                                <p className="mr-1 text-[0.9rem] text-yellow-700 font-bold">
                                    4.8
                                </p>
                                <div className="flex">
                                    <StarIcon className="h-3 w-3" />
                                    <StarIcon className="h-3 w-3" />
                                    <StarIcon className="h-3 w-3" />
                                    <StarIcon className="h-3 w-3" />
                                    <StarIcon className="h-3 w-3" />
                                </div>
                                <p className="ml-1 text-[0.7rem] text-black">
                                    (4,825 ratings)
                                </p>
                            </div> */}
                        </div>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="basis-1/2 flex justify-between pr-10">
                        {/* STATUS */}
                        <div className="basis-2/3 ">
                            <div
                                className={`${course!.enrollmentStatus === "Confirmed" ? "text-green-500 border-green-500" : "text-red-500 border-red-500"} w-1/3 mx-auto text-xl font-bold p-3 border-[1px]`}
                            >
                                <p className="md:text-[1rem] text-center">
                                    {course!.enrollmentStatus}
                                </p>
                            </div>
                        </div>
                        {/* ACTIONS */}
                        <div className="basis-1/3 flex flex-col justify-start items-start text-[1.4rem] text-right text-purple-600">
                            <Button
                                className="px-2 font-bold"
                                color="purple"
                                variant="text"
                            >
                                Remove
                            </Button>
                            {/* <Button
                                className="px-1"
                                color="purple"
                                variant="text"
                            >
                                Move to Wishlist
                            </Button> */}
                        </div>
                    </div>
                    {/* PRICE */}
                    {/* <div className="basis-1/6 font-bold text-[1rem] text-center text-purple-600">
                        <h1>
                            <span className="underline">đ</span>249.000
                        </h1>
                    </div> */}
                </div>
            </Card>
        </>
    );
};

export default CourseCard;
