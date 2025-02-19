import { Avatar, Button, Card, Col, Row } from "antd";
import { StarIcon } from "@heroicons/react/24/solid";

type Props = {};

const CourseCartCard = (props: Props) => {
    return (
        // <img
        //                     alt="example"
        //                     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //                 />
        <>
            <Card hoverable>
                <div className="w-full flex items-start gap-4">
                    {/* IMAGE */}
                    <div className="basis-1/6">
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    </div>
                    {/* SHORT INFORMATION */}
                    <div className="basis-3/6">
                        <h1 className="font-bold text-[1rem]">
                            React and Typescript: Build a Portfolio Project
                        </h1>
                        <p className="text-[0.8rem]">By Stephen Grider</p>
                        {/* REVIEW */}
                        <div className="flex items-center mt-2 text-yellow-600">
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
                        </div>
                    </div>
                    <div className="basis-1/6 text-[0.9125rem] text-right text-purple-600">
                        <Button className="px-1" color="purple" variant="text">
                            Remove
                        </Button>
                        <Button className="px-1" color="purple" variant="text">
                            Move to Wishlist
                        </Button>
                    </div>
                    {/* PRICE */}
                    <div className="basis-1/6 font-bold text-[1rem] text-center text-purple-600">
                        <h1>
                            <span className="underline">đ</span>249.000
                        </h1>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default CourseCartCard;
