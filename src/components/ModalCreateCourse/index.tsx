import { useState, useEffect } from "react";
import {
    Button,
    Flex,
    Modal,
    Form,
    Input,
    DatePicker,
    Checkbox,
    Tooltip,
} from "antd";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";
import {
    createCourse,
    editCourse,
    getCourseById,
} from "@/services/courseService";
import dayjs from "dayjs";

type Props = {
    courseId?: string;
    type: string;
    reload: () => void;
};

const { RangePicker } = DatePicker;

const ModalCreateCourse = ({ reload, type, courseId }: Props) => {
    const [openResponsive, setOpenResponsive] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [form] = Form.useForm();

    useEffect(() => {
        if (type === "edit" && courseId) {
            const fetchCourse = async () => {
                try {
                    const courseData = await getCourseById(courseId);
                    form.setFieldsValue({
                        courseName: courseData.data.courseName,
                        description: courseData.data.description,
                        dates: [
                            courseData.data.startDate
                                ? dayjs(courseData.data.startDate)
                                : null,
                            courseData.data.endDate
                                ? dayjs(courseData.data.endDate)
                                : null,
                        ],
                    });
                } catch (error) {
                    console.error("Error fetching course data:", error);
                    toast.error("Failed to load course details.");
                }
            };
            fetchCourse();
        }
    }, [type, courseId, form]);

    const onFinish = async (values: any) => {
        try {
            const courseData = {
                courseName: values.courseName,
                description: values.description,
                startDate: values.dates[0].format("YYYY-MM-DD"),
                endDate: values.dates[1].format("YYYY-MM-DD"),
            };

            if (type === "create") {
                const response = await createCourse(courseData);
                if (response) {
                    toast.success("Course created successfully!");
                    form.setFieldsValue({
                        courseName: "",
                        description: "",
                        dates: [],
                    });
                }
            } else if (type === "edit" && courseId) {
                const response = await editCourse(courseId, courseData);
                if (response) {
                    toast.success("Course updated successfully!");
                }
            }
            setOpenResponsive(false);
            reload();
        } catch (error) {
            console.error("Error processing course:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <Flex vertical gap="middle" align="flex-start">
                <Tooltip title="Create">
                    <Button
                        type="primary"
                        onClick={() => setOpenResponsive(true)}
                    >
                        <CiCirclePlus size={30} />
                    </Button>
                </Tooltip>
                <Modal
                    title={type === "create" ? "Create Course" : "Edit Course"}
                    centered
                    open={openResponsive}
                    onCancel={() => setOpenResponsive(false)}
                    width={{
                        xs: "90%",
                        sm: "80%",
                        md: "70%",
                        lg: "60%",
                        xl: "50%",
                        xxl: "40%",
                    }}
                    footer={null}
                >
                    <Checkbox
                        checked={componentDisabled}
                        onChange={(e) => setComponentDisabled(e.target.checked)}
                    >
                        Form disabled
                    </Checkbox>
                    <Form
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            label="Name"
                            name="courseName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the course name!",
                                },
                            ]}
                        >
                            <Input disabled={componentDisabled} />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the description!",
                                },
                            ]}
                        >
                            <Input disabled={componentDisabled} />
                        </Form.Item>
                        <Form.Item
                            label="Dates"
                            name="dates"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select the start and end dates!",
                                },
                            ]}
                        >
                            <RangePicker disabled={componentDisabled} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={componentDisabled}
                            >
                                {type === "create" ? "Create" : "Update"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Flex>
        </div>
    );
};

export default ModalCreateCourse;
