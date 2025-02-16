import { Breadcrumb, ConfigProvider } from 'antd';

const Course = () => {

    return (
        <div>
            <div className="bg-[#1d1e27] py-8 h-[364px]">
                <div className='flex items-center justify-center'>
                    <div>
                        <div>
                            <ConfigProvider theme={{
                                components: {
                                    Breadcrumb: {
                                        itemColor: '#c0c4fc',
                                    }
                                }
                            }}>
                                <Breadcrumb
                                    separator=">"
                                    items={[
                                        {
                                            title: 'Home',
                                        },
                                        {
                                            title: 'Application Center',
                                        },
                                        {
                                            title: 'Application List',

                                        },
                                        {
                                            title: 'An Application',
                                        },
                                    ]}
                                className='font-bold'  />
                            </ConfigProvider>
                        </div>
                        
                    </div>

                    <div>
                        <div>
                            <iframe >
                               
                            </iframe>
                            <p className='text-white'> IMG</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course;