import { Button, Space, Table, Tag } from "antd";
import { PaginationType } from "@/stores/types";
import { useState } from "react";
import axiosInstance from "@/configs/axiosInstance";
import {
    courseEnrollmentsData,
    coursesData,
    teacherData,
} from "@/services/fakeData";

type Props = {
    type: string;
};

const AdminContent = ({ type }: Props) => {
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        pageSize: 10,
    });

    // handle Api call to get user
    // const fetchData = async () => {
    //     try {
    //         const response = await axiosInstance(
    //             `/User/${role}/?page=${pagination.currentPage}&limit=${pagination.pageSize}`
    //         );
    //         setUser(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // handle pagination
    const handlePageChange = (page: any, pageSize: any) => {
        setPagination((prev) => {
            return {
                ...prev,
                currentPage: page,
                pageSize: pageSize,
            };
        });
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <div className="w-full overflow-y-scroll">
            <div className="w-full">
                <div className="text-3xl py-10 font-bold">
                    <h1>{type} Management</h1>
                </div>
            </div>
            <Table
                columns={
                    type === "CoursesEnrollments"
                        ? [
                              {
                                  title: "EnrollmentID",
                                  dataIndex: "enrollmentId",
                                  key: "enrollmentId",
                              },
                              {
                                  title: "CourseID",
                                  dataIndex: "courseId",
                                  key: "courseId",
                              },
                              {
                                  title: "StudentID",
                                  dataIndex: "studentId",
                                  key: "studentId",
                              },
                              {
                                  title: "EnrollmentDate",
                                  dataIndex: "enrollmentDate",
                                  key: "enrollmentDate",
                              },
                              {
                                  title: "Action",
                                  key: "action",
                                  render: () => (
                                      <Space size="middle">
                                          <Button
                                              variant="solid"
                                              color="orange"
                                          >
                                              Detail
                                          </Button>
                                          <Button
                                              variant="solid"
                                              color="danger"
                                          >
                                              Delete
                                          </Button>
                                      </Space>
                                  ),
                              },
                          ]
                        : type === "Courses"
                          ? [
                                {
                                    title: "CourseID",
                                    dataIndex: "courseId",
                                    key: "courseId",
                                },
                                {
                                    title: "CourseName",
                                    dataIndex: "courseName",
                                    key: "courseName",
                                },
                                {
                                    title: "Description",
                                    dataIndex: "description",
                                    key: "description",
                                },
                                {
                                    title: "StartDate",
                                    dataIndex: "startDate",
                                    key: "startDate",
                                },
                                {
                                    title: "EndDate",
                                    dataIndex: "endDate",
                                    key: "endDate",
                                },
                                {
                                    title: "CreatedBy",
                                    dataIndex: "createdBy",
                                    key: "createdBy",
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: () => (
                                        <Space size="middle">
                                            <Button
                                                variant="solid"
                                                color="orange"
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                variant="solid"
                                                color="danger"
                                            >
                                                Delete
                                            </Button>
                                        </Space>
                                    ),
                                },
                            ]
                          : [
                                {
                                    title: "ID",
                                    dataIndex: "id",
                                    key: "id",
                                },
                                {
                                    title: "Fullname",
                                    dataIndex: "fullname",
                                    key: "fullname",
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                    key: "email",
                                },
                                {
                                    title: "Phone Number",
                                    dataIndex: "phoneNumber",
                                    key: "phoneNumber",
                                },
                                {
                                    title: "Status",
                                    key: "status",
                                    dataIndex: "status",
                                    render: (status) => (
                                        <>
                                            <Tag
                                                color={
                                                    status === "inActive"
                                                        ? "red"
                                                        : "green"
                                                }
                                            >
                                                {status}
                                            </Tag>
                                        </>
                                    ),
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: () => (
                                        <Space size="middle">
                                            <Button
                                                variant="solid"
                                                color="orange"
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                variant="solid"
                                                color="danger"
                                            >
                                                Delete
                                            </Button>
                                        </Space>
                                    ),
                                },
                            ]
                }
                dataSource={
                    type === "Courses"
                        ? coursesData
                        : type === "CoursesEnrollments"
                          ? courseEnrollmentsData
                          : teacherData
                }
                className="w-full"
                pagination={{
                    current: pagination.currentPage,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    onChange: (page, pageSize) =>
                        handlePageChange(page, pageSize),
                }}
            />
        </div>
    );
};

export default AdminContent;
