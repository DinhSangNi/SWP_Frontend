import React from "react";
import { Image } from "antd";

const Report = () => {
    return (
        <div className="flex mt-10">
            <div className="w-[40%] flex justify-between items-center">
                <div>
                    <div className="w-[331px] h-[160px] text-[32px] font-bold">
                        Top trends in the future of work
                    </div>
                    <div className="text-[18px]text-[#303141 ">
                        Generative AI (GenAI) and leadership are at the heart of
                        today's skills-based economy. Download the 2024 Global
                        Learning and Skills Trends Report to learn more.
                    </div>
                </div>
            </div>
            <div className="w-[60%]">
                <Image src="https://cms-images.udemycdn.com/96883mtakkm8/1qvvR0FDKv9chruIpia6Sc/b2af22a0097e47de4e4354237e3f378c/Onsite_Desktop_GLSTR25.png" />
            </div>
        </div>
    );
};

export default Report;
