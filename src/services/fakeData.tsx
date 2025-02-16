import { getAllUser } from "./userService";

export const teacherData = [
    {
        key: "1",
        id: "a1",
        fullname: "John Brown",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "2",
        id: "a2",
        fullname: "Jim Green",
        phoneNumber: "09xxxxxxxx",
        email: "johnbrown@gmail.com",
        status: "inActive",
    },
    {
        key: "3",
        id: "a3",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "4",
        id: "a4",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "5",
        id: "a5",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "6",
        id: "a6",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "7",
        id: "a7",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "8",
        id: "a8",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "9",
        id: "a9",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "10",
        id: "a10",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "1",
        id: "a1",
        fullname: "John Brown",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "2",
        id: "a2",
        fullname: "Jim Green",
        phoneNumber: "09xxxxxxxx",
        email: "johnbrown@gmail.com",
        status: "inActive",
    },
    {
        key: "3",
        id: "a3",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "4",
        id: "a4",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "5",
        id: "a5",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "6",
        id: "a6",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "7",
        id: "a7",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "8",
        id: "a8",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "9",
        id: "a9",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
    {
        key: "10",
        id: "a10",
        fullname: "Joe Black",
        email: "johnbrown@gmail.com",
        phoneNumber: "09xxxxxxxx",
        status: "active",
    },
];

const featchDataGetAllUser = async () => {
    try {
        const response = await getAllUser();
        console.log('Response from server:', response);
        // return response;
    } catch (error) {
        console.error('Error from server:', error.response?.data || error.message);
    }
}

export const coursesData = [
    {
        key: "1",
        courseId: "1",
        courseName: "TypeScript",
        description: "Basic Typescript",
        startDate: "2/15/2025",
        endDate: "3/1/2025",
        createdBy: "Joe Black",
    },
    {
        key: "2",
        courseId: "2",
        courseName: "TypeScript",
        description: "Basic Typescript",
        startDate: "2/15/2025",
        endDate: "3/1/2025",
        createdBy: "Joe Black",
    },
];

export const courseEnrollmentsData = [
    {
        enrollmentId: "1",
        courseId: "1",
        studentId: "1",
        enrollmentDate: "2/15/2025",
    },
    {
        enrollmentId: "2",
        courseId: "1",
        studentId: "2",
        enrollmentDate: "2/15/2025",
    },
];



export default {featchDataGetAllUser};