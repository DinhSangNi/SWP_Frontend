import { Card } from "antd";
import { SiGoogledocs } from "react-icons/si";
import { GoPeople } from "react-icons/go";
import { IoBarChartOutline } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import { motion } from "framer-motion";

const dataMission = [
    {
        id: 1,
        title: "Sản phẩm",
        content: "Tìm hiểu các khóa học chủ lực kết hợp công nghệ và sáng tạo",
        icon: <SiGoogledocs size={60} />,
    },
    {
        id: 2,
        title: "Con người",
        content: "Khám phá giảng viên và văn hóa học tập tại Đại học FPT",
        icon: <GoPeople size={60} />,
    },
    {
        id: 3,
        title: "Trách nhiệm cộng đồng",
        content: "Khám phá cảm hứng và đóng góp xã hội cùng chúng tôi",
        icon: <IoBarChartOutline size={60} />,
    },
    {
        id: 4,
        title: "Nâng Niu Bộ Não Việt",
        content:
            "Tham gia cùng chúng tôi trong hành trình nâng niu bộ não Việt",
        icon: <LuBrain size={60} />,
    },
];

const Mission = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
                hidden: {
                    opacity: 0,
                },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.5,
                    },
                },
            }}
            className="mt-7"
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: {
                        opacity: 0,
                        x: -50,
                    },
                    visible: {
                        opacity: 1,
                        x: 0,
                    },
                }}
                className="text-[32px] font-bold mb-2"
            >
                Mission
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: {
                        opacity: 0,
                        x: -50,
                    },
                    visible: {
                        opacity: 1,
                        x: 0,
                    },
                }}
                className="text-[#4d4d4d] text-[1.1rem] w-[700px]"
            >
                Creating educational technology, developing elite human
                resources from FPT University
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: {
                        y: 50,
                        opacity: 0,
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                className="flex justify-center gap-5 mt-5"
            >
                {dataMission.map((item) => (
                    <Card
                        style={{
                            // width: 282,
                            height: 262,
                            border: "1px solid #003a8c",
                        }}
                        key={item.id}
                        className="flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-y-4">
                            <div className="text-[24px] font-semibold text-center text-[#003a8c]">
                                {item.title}
                            </div>
                            <div>{item.icon}</div>
                            <div className="text-[12px] font-semibold text-[#4d4d4d] text-center">
                                {item.content}
                            </div>
                        </div>
                    </Card>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Mission;
