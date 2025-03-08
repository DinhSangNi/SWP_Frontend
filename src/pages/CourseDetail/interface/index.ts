export interface CourseResponse {
    courseId: string;
    courseName: string;
    createdBy: {
        fullName: string;
        role: string;
    };
    description: string;
    endDate: string;
    startDate: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
}
