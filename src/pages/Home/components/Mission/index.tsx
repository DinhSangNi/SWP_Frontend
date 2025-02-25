import React from "react";
import { Card } from "antd";
import { SiGoogledocs } from "react-icons/si";
import { GoPeople } from "react-icons/go";
import { IoBarChartOutline } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
const dataMission = [
    {
        id: 1,
        title: "Products",
        content: "Explore key technology and innovation courses.",
        icon: <SiGoogledocs size={60} />,
    },
    {
        id: 2,
        title: "Human",
        content: "Explore the faculty and learning culture at FPT University",
        icon: <GoPeople size={60} />,
    },
    {
        id: 3,
        title: "Community Responsibility",
        content: "Explore inspiration and social contribution with us",
        icon: <IoBarChartOutline size={60} />,
    },
    {
        id: 4,
        title: "Cherish the Vietnamese Brain",
        content: "Join us on our journey to nurture the Vietnamese brain.",
        icon: <LuBrain size={60} />,
    },
];

const Mission = () => {
    return (
        <div className="mt-7">
            <div className="flex flex-col gap-y-2 my-2">
                <div className="text-[32px] font-bold">Mission</div>
                <div className="text-[#4d4d4d] text-[24px] w-[700px]">
                    Creating educational technology, developing elite human
                    resources from FPT University
                </div>
            </div>
            <div className="flex items-center justify-between">
                {dataMission.map((item) => (
                    <Card
                        style={{
                            width: 282,
                            height: 262,
                            border: "1px solid #003a8c",
                        }}
                        key={item.id}
                        className="flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-y-2">
                            <div className="text-[24px] font-semibold text-center text-[#003a8c]">
                                {item.title}
                            </div>
                            <div>{item.icon}</div>
                            <div className="text-[14px] font-semibold text-[#4d4d4d] text-center">
                                {item.content}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Mission;
