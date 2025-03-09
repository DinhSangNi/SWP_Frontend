export type AuthUser = {
    id?: string;
    fullName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    role?: string; // Thêm type vào thông tin trả về
    status?: string;
};

export type TeacherType = {
    key?: string;
    $id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    status: string;
    role?: string;
};

export type Student = {
    key?: string;
    id: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    status: string;
};

export type Course = {
    $id: string;
    courseId: string;
    courseName: string;
    description: string;
    startDate: string;
    endDate: string;
    enrollmentStatus: string;
};

export type PaginationType = {
    currentPage: number;
    pageSize: number;
};
