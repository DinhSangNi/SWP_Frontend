import { Carousel } from "antd";

type Props = {};

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "400px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
};

const Home = (props: Props) => {
    return (
        <div className="w-full px-[4rem]">
            {/* INTRODUCTION CAROUSEL */}
            <Carousel arrows infinite autoplaySpeed={3000}>
                <div>
                    <div style={contentStyle} className="relative">
                        <img
                            src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
                            alt="example"
                            className="w-full relative"
                        />
                        <div className="absolute w-[17rem] md:w-[30rem] shadow-lg rounded-sm bg-white text-xl text-black top-[2rem] left-[2rem] md:top-[4rem] md:left-[4rem]">
                            <div className="p-2 md:p-[2rem] flex flex-col items-start">
                                <h2 className="text-[1rem] md:text-[2rem] font-bold md:mb-4">
                                    Learning that gets you
                                </h2>
                                <p className="text-[13px] md:text-[1.1rem] text-left">
                                    Skills for your present (and your future).
                                    Get started with us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={contentStyle} className="relative">
                        <img
                            src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
                            alt="example"
                            className="w-full"
                        />
                        <div className="absolute w-[30rem] shadow-lg rounded-sm bg-white text-xl text-black top-[4rem] left-[4rem]">
                            <div className="p-[2rem] flex flex-col items-start">
                                <h2 className="text-[2rem] font-bold mb-4">
                                    Learning that gets you
                                </h2>
                                <p className="text-[1.1rem] text-left">
                                    Skills for your present (and your future).
                                    Get started with us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={contentStyle} className="relative">
                        <img
                            src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
                            alt="example"
                            className="w-full"
                        />
                        <div className="absolute w-[30rem] shadow-lg rounded-sm bg-white text-xl text-black top-[4rem] left-[4rem]">
                            <div className="p-[2rem] flex flex-col items-start">
                                <h2 className="text-[2rem] font-bold mb-4">
                                    Learning that gets you
                                </h2>
                                <p className="text-[1.1rem] text-left">
                                    Skills for your present (and your future).
                                    Get started with us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>

            {/* COURSES SLIDER */}
            <div></div>
        </div>
    );
};

export default Home;
