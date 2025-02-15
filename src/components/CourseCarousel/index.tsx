import { Button, Carousel, ConfigProvider } from 'antd';
import { Card, Rate } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { useRef } from 'react';

const CourseCarousel = () => {
    const carouselRef = useRef<CarouselRef>(null);

    const handleNext = () => {
        carouselRef.current?.next();
    };

    const handlePrev = () => {
        carouselRef.current?.prev();
    };

    return (
        <div className='w-full mt-5'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-[32px] font-bold'>Học viên đang xem</h1>
                <div className='flex items-center gap-x-2'>
                    <Button onClick={handlePrev} className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full'>
                        &lt;
                    </Button>
                    <Button onClick={handleNext} className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full'>
                        &gt;
                    </Button>
                </div>
            </div>

            <Carousel
                ref={carouselRef}
                infinite={true}
                slidesToShow={4}
                slidesToScroll={1}
                dots={false}
                className='carousel-container'
            >
                {[...Array(12)].map((item, index) => (
                    <div key={index} className='px-2'> {/* Thêm padding giữa các card */}
                        <Card
                            style={{ width: '100%' }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    className='object-cover w-full h-40' // Đảm bảo hình ảnh có tỷ lệ phù hợp
                                />
                            }
                            bodyStyle={{ padding: '16px' }}
                            className='w-full h-[400px] shadow-md hover:shadow-lg transition-shadow' // Thêm hiệu ứng shadow
                        >
                            <div className='flex flex-col gap-y-2'>
                                <div className='text-[17px] font-bold text-start'>
                                    React js for beginners
                                </div>
                                <p className='text-[12px] opacity-50 font-normal text-start'>Developer</p>

                                <div className='flex items-start  gap-x-1 text-[13px] font-medium'>
                                    <p className='text-orange-600'>4,8</p>
                                    <div>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Rate: {
                                                        starSize: 12,
                                                    },
                                                },
                                            }}
                                        >
                                            <Rate disabled defaultValue={4} />
                                        </ConfigProvider>
                                    </div>
                                    <p>(359)</p>
                                </div>
                                <div className='text-[15px] font-bold text-start'>
                                    200.000đ
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </Carousel>

            <div className='flex items-center justify-center w-full mt-4 cursor-pointer'>Xem thêm</div>
        </div>
    );
};

export default CourseCarousel;