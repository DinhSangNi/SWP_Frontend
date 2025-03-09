import {
    AssignmentResponse,
    AssignmentSubmissions,
} from "@/pages/MyCourseDetail";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdAssignmentLate } from "react-icons/md";

type Props = {
    title: string;
    items: AssignmentResponse[];
    completedAssignment: AssignmentResponse[];
    onClick: (id: string) => void;
    setSelectedAssignment: (assignment: any) => void;
};

const AssignmentsMenu = ({
    title,
    items,
    completedAssignment,
    onClick,
    setSelectedAssignment,
}: Props) => {
    const [isCollapse, setIsCollapse] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("");

    const handleCollapse = () => {
        setIsCollapse(!isCollapse);
    };

    return (
        <>
            <div className="w-full">
                <div
                    className={`${isCollapse && "bg-gray-300"} hover:bg-gray-300 py-2 flex items-center gap-2 cursor-pointer`}
                    onClick={handleCollapse}
                >
                    <motion.div
                        whileInView={isCollapse ? { rotate: 180 } : ""}
                        transition={{ duration: 0.3 }}
                    >
                        <IoIosArrowDown />
                    </motion.div>
                    <div className="w-full flex items-center text-xl">
                        <h1 className="">{title}</h1>
                        <p>({items?.length})</p>
                    </div>
                </div>
                <AnimatePresence>
                    {isCollapse && (
                        <motion.div
                            className="overflow-hidden"
                            initial="hidden"
                            whileInView="visible"
                            exit={{ height: 0, opacity: 0 }}
                            viewport={{ once: true }}
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
                                    <div
                                        className={`${selected === item.assignmentId && "bg-purple-300"} flex items-center justify-between py-2 px-6 hover:bg-purple-300 cursor-pointer`}
                                        onClick={() => {
                                            setSelected(item.assignmentId);
                                            onClick(item.assignmentId);
                                            setSelectedAssignment(item);
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>
                                                <MdAssignmentLate className="text-red-700" />
                                            </span>{" "}
                                            {item.title}
                                            <p></p>{" "}
                                        </div>
                                        <span className="font-bold">
                                            {completedAssignment.includes(
                                                item as AssignmentResponse
                                            ) ? (
                                                <p className="text-green-700">
                                                    Done
                                                </p>
                                            ) : (
                                                <p className="text-red-700">
                                                    Not Yet
                                                </p>
                                            )}
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
