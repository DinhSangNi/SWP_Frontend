
import React from 'react';
import { Image } from 'antd';

const Report = () => {

    return (
        <div className='flex mt-10'>
            <div className='w-[40%] flex justify-between items-center'>
                <div>
                    <div className='w-[331px] h-[160px] text-[32px] font-bold'>  Những xu hướng hàng đầu trong tương lai của việc làm</div>
                    <div className='text-[18px]text-[#303141 '>
                        AI tạo sinh (GenAI) và khả năng lãnh đạo là cốt lõi của nền kinh tế dựa trên kỹ năng ngày nay. Hãy tải Báo cáo Xu hướng kỹ năng và học tập toàn cầu năm 2024 để tìm hiểu thêm.
                    </div>
                </div>
            </div>
            <div className='w-[60%]'>
                <Image src='https://cms-images.udemycdn.com/96883mtakkm8/1qvvR0FDKv9chruIpia6Sc/b2af22a0097e47de4e4354237e3f378c/Onsite_Desktop_GLSTR25.png' />
            </div>
        </div>
    )
}

export default Report;