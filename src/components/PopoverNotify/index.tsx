import { Popover } from "antd";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const PopoverNotify = ({ children }: Props) => {
    const content = (
        <div className="w-[300px] h-full">
            <div className="flex w-full">
                <h1 className="basis-1/2 text-xl font-bold">Notifications</h1>
            </div>
            <div className="mt-4 text-center">
                <p>No notifications.</p>
            </div>
        </div>
    );
    return (
        <Popover placement="bottomRight" content={content} arrow={false}>
            {children}
        </Popover>
    );
};

export default PopoverNotify;
