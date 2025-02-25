import { searchCourse } from "@/services/courseService";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type course = {
    courseName: string;
    description: string;
    startDate: string;
    endDate: string;
};

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const decodedQuery = decodeURIComponent(query!);

    // const navigate = useNavigate();
    console.log("query params: ", decodedQuery);

    useEffect(() => {
        const fetchSearchCourses = async () => {
            try {
                const response = await searchCourse(encodeURIComponent(query!));
                if (response) {
                    setSearchResults(response.$values);
                }
            } catch (error) {
                console.log("error:", error);
            }
        };

        fetchSearchCourses();
    }, [decodedQuery]);

    return (
        <div className="w-mainContent mx-auto">
            <h1 className="text-3xl font-bold">
                {searchResults.length} results for {`"${query}"`}
            </h1>
            <div className="flex mt-5 gap-3">
                {searchResults.map((course: course) => {
                    return (
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    className="object-cover w-full h-40"
                                />
                            }
                            className="basis-1/5 h-[350px] shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
                        >
                            <div className="flex flex-col ">
                                <div className="text-[1.4rem] font-bold text-start">
                                    {course.courseName}
                                </div>
                                <p className="text-[1rem] opacity-80 font-normal text-start">
                                    {course.description}
                                </p>
                                <p className="text-[0.8rem]">
                                    From {course.startDate} to {course.endDate}
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Search;
