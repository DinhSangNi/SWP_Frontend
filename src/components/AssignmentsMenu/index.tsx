import { assignmentsResponse } from "@/pages/CourseDetail";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdAssignmentLate } from "react-icons/md";

type Props = {
    title: string;
    items: assignmentsResponse[];
};

const AssignmentsMenu = ({ title, items }: Props) => {
    const [isCollapse, setIsCollapse] = useState<boolean>(false);

    const handleCollapse = () => {
        setIsCollapse(!isCollapse);
    };
    return (
        <>
            <div className="w-full">
                <div
                    className={`${isCollapse && "bg-gray-700"} hover:bg-gray-700 py-2 flex items-center gap-2 cursor-pointer`}
                    onClick={handleCollapse}
                >
                    <motion.div
                        whileInView={isCollapse ? { rotate: 180 } : ""}
                        transition={{ duration: 0.3 }}
                    >
                        <IoIosArrowDown />
                    </motion.div>
                    <h1 className="text-xl">{title}</h1>
                </div>
                <AnimatePresence>
                    {isCollapse && (
                        <motion.div
                            className="overflow-hidden"
                            initial="hidden"
                            whileInView="visible"
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            variants={{
                                hidden: { height: 0, opacity: 0 },
                                visible: {
                                    height: "auto",
                                    opacity: 1,
                                },
                                exit: { height: 0, opacity: 0 },
                            }}
                        >
                            {items.map((item) => {
                                return (
                                    <div className="flex items-center justify-between py-2 px-6 hover:bg-purple-800 cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <span>
                                                <MdAssignmentLate className="text-red-700" />
                                            </span>{" "}
                                            {item.title}
                                            <p></p>{" "}
                                        </div>
                                        <span>
                                            <p className="text-red-700">
                                                Not Yet
                                            </p>
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default AssignmentsMenu;
