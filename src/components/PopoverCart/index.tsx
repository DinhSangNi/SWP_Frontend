import { Popover } from "antd";
import { JSX, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const PopoverCart = ({ children }: Props) => {
    let coursesTagList: JSX.Element[] = [];

    for (let i = 0; i < 6; i++) {
        coursesTagList.push(
            <div className="flex items-start gap-2 w-full h-[5rem] pr-4 pb-3 mt-4 border-b-[1px] border-gray-300 transform transition duration-200 hover:shadow-md cursor-pointer">
                <div className="basis-1/3 max-h-[5rem] overflow-hidden">
                    <img
                        className="w-full"
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                </div>
                <div className="basis-2/3">
                    <h1 className="font-bold text-[0.85rem] leading-none">
                        React and Typescript: Build a Portfolio Project
                    </h1>
                    <p className="text-[0.7rem]">By Stephen Grider</p>
                    <h1 className="font-bold text-[0.9rem]">
                        <span className="underline">đ</span>249.000
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <Popover
                placement="topRight"
                content={
                    <div className="max-w-[25rem] max-h-[26rem] pb-2 flex flex-col items-center overflow-y-auto">
                        {coursesTagList.map((item) => item)}
                    </div>
                }
            >
                {children}
            </Popover>
        </>
    );
};

export default PopoverCart;
