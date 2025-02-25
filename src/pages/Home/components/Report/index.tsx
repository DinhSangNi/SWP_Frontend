import { motion } from "framer-motion";
import { Image } from "antd";

const Report = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
            className="w-full mt-10"
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: {
                        opacity: 0,
                        y: -50,
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                className="w-full flex justify-between items-center"
            >
                <div className="text-center w-full">
                    <div className="text-[32px] font-bold w-full">
                        Top trends in the future of work
                    </div>
                    <div className="text-[18px] text-[#303141] w-full">
                        Generative AI (GenAI) and leadership are at the heart of
                        today's skills-based economy. Download the 2024 Global
                        Learning and Skills Trends Report to learn more.
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: {
                        opacity: 0,
                        y: 50,
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                className="w-full text-center mt-4"
            >
                <Image
                    width="100%"
                    src="https://cms-images.udemycdn.com/96883mtakkm8/1qvvR0FDKv9chruIpia6Sc/b2af22a0097e47de4e4354237e3f378c/Onsite_Desktop_GLSTR25.png"
                />
            </motion.div>
        </motion.div>
    );
};

export default Report;
