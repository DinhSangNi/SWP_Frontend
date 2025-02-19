import { Button, Divider, Input } from "antd";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import CourseCartCard from "@/components/CourseCartCard";
import CourseCarousel from "@/components/CourseCarousel";

type Props = {};

const Cart = (props: Props) => {
    return (
        <>
            <div className="mx-24 mb-8">
                {/* HEADING */}
                <div>
                    <div className="w-full my-6">
                        <h1 className="font-bold text-4xl">Shopping Cart</h1>
                    </div>
                </div>
                {/* CONTENT */}
                <div className="flex justify-center gap-10">
                    {/* COURSE CARDS */}
                    <div className="basis-3/4">
                        <h1 className="my-2 font-bold">2 Courses in Cart</h1>
                        <div className="flex flex-col gap-2">
                            <CourseCartCard />
                            <CourseCartCard />
                        </div>
                    </div>
                    {/* PAYMENT BOX */}
                    <div className="basis-1/4">
                        {/* UPPER */}
                        <div>
                            <p className="font-bold text-[1.1rem]">Total:</p>
                            <h1 className="font-bold text-[2rem]">
                                <span className="underline">đ</span>498.000
                            </h1>
                            <Button
                                block
                                className="p-6 font-bold text-[1.1rem]"
                                color="purple"
                                variant="solid"
                            >
                                Proceed to Checkout{" "}
                                <ArrowRightIcon className="h-6 w-6" />
                            </Button>
                            <p className="mt-2 text-[0.8rem] text-gray-400">
                                Yon won't be charged yet
                            </p>
                        </div>
                        <Divider />
                        {/* LOWER */}
                        <div className="flex flex-col gap-3">
                            <p className="font-bold text-[1.1rem]">
                                Promotions
                            </p>
                            {/* PROMOTION TAGS */}
                            <div className="flex justify-between items-center p-2 border-2 border-dashed border-gray-200 rounded-sm">
                                <h2 className="basis-2/3 text-[0.8rem] text-gray-400">
                                    <span className="font-bold">
                                        KEEPLEARNING
                                    </span>{" "}
                                    is applied Udemy coupon
                                </h2>
                                <div className="">
                                    <Button
                                        className="p-1"
                                        color="purple"
                                        variant="text"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                            {/* PROMOTIONS INPUT */}
                            <div className="flex gap-2">
                                <Input
                                    className="py-1 focus-within:border-primary-purple hover:border-primary-purple"
                                    placeholder="Enter Coupon"
                                />
                                <Button
                                    className="font-bold"
                                    color="purple"
                                    variant="solid"
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COURSES CAROUSEL */}
                <div className="mt-20">
                    <CourseCarousel
                        heading={
                            <h1 className="font-bold text-[1.5rem]">
                                You might also like
                            </h1>
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default Cart;
