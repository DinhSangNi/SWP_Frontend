import { motion } from "framer-motion";

type Props = {
    className?: string;
};

const CustomSkeleton = ({ className }: Props) => {
    return (
        <>
            <motion.div
                className={`bg-gray-300 ${className} rounded-md overflow-hidden relative`}
                animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{
                    backgroundImage:
                        "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                    backgroundSize: "200% 100%",
                }}
            />
        </>
    );
};

export default CustomSkeleton;
