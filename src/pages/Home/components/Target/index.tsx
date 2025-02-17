import { Card, Image } from "antd";



const Target = () => {

    return (
        <div className="mt-5">
            <div className='text-[32px] font-bold'>Chương trình học tập hướng tới mục tiêu của bạn</div>

            <div className="flex items-center gap-x-8">
                <Card className="w-1/2">
                    <div className="flex items-center gap-x-2">
                        <div className="w-[20%] flex items-center justify-center">
                            <Image height={80} src='https://cms-images.udemycdn.com/96883mtakkm8/7kN9RBFSMFNHzsGWsElMPi/dde73f8d1c47e046f035274e78410590/hands-on-practice.png' />
                        </div>
                        <div className="w-[80%] flex justify-center items-center">
                            <div className="flex flex-col items-start gap-y-2">
                                <div className="text-[18px] font-bold">Đào tạo thực hành</div>
                                <div>
                                    Nâng cao kỹ năng một cách hiệu quả với các bài tập coding, bài kiểm tra thực hành, trắc nghiệm và workspace được hỗ trợ bởi AI.
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="w-1/2">
                    <div className="flex items-center gap-x-2">
                        <div className="w-[20%] flex items-center justify-center">
                            <Image height={80} src="https://cms-images.udemycdn.com/96883mtakkm8/2Xh9YHJustDwCEjn5IlO25/93e9b15c6e74876db0dec63466fcc5a0/certificate.png" />

                        </div>
                        <div className="w-[80%] flex justify-center items-center">
                            <div className="flex flex-col items-start gap-y-2">
                                <div className="text-[17px] font-bold">Luyện thi chứng chỉ</div>
                                <div>
                                    Luyện thi các chứng chỉ được công nhận trong ngành bằng cách giải quyết các thách thức thực tế và giành được huy hiệu trong quá trình thực hiện.
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex items-center justify-center">
                <Image width={700} height={700} src="https://cms-images.udemycdn.com/96883mtakkm8/4kbyXne3Slx9Sfz4nTBqdf/8ac2b75db1a118f15e2fb5dfe2bb4567/desktop-hands-on-learning-2x.png" />
                <Image width={700} height={700} src="https://cms-images.udemycdn.com/96883mtakkm8/385IhnON960Wvz50ooWIN3/d4e6738c97769258d387b3d609edaad4/desktop-customizable-2x.png"/>
            </div>

        </div>
    )
}

export default Target;