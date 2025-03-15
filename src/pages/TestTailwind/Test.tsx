import { useNavigate } from "react-router-dom";

type Props = {};

const Test = (props: Props) => {
    const navigate = useNavigate();

    const handleGoToResult = () => {
        localStorage.setItem("allowSound", "true"); // Đánh dấu đã có tương tác
        navigate("/test-tailwind");
    };

    return <button onClick={handleGoToResult}>Đi tới kết quả</button>;
};

export default Test;
