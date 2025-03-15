import { API } from "./profileService";

export const getAssignmentByCourseId = async (courseId: string | number) => {
    const response = await API.get(`/Assignment/get-assignments/${courseId}`);
    return response;
};

export const getAssignmentByAssignmentId = async (assignmentId: string) => {
    try {
        const response = await API.get(
            `/Assignment/get-assignment/${assignmentId}`
        );
        console.log(`✅ Get assignments có id ${assignmentId} thành công`);
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("❌ Lỗi khi lấy assignment theo assignment id:", error);
        throw error;
    }
};

export const submitAssignment = async (
    assignmentId: string,
    studentId: string,
    feedback: any
) => {
    try {
        const response = await API.post(
            `/Assignment/submit-assignment/${assignmentId}`,
            {
                studentId: studentId,
                feedback: feedback,
            }
        );
        if (response) {
            console.log(
                `✅ Submit assignments có id ${assignmentId} thành công`
            );
            return response;
        }
    } catch (error) {
        console.error("❌ Lỗi khi submit assignment theo id", error);
        throw error;
    }
};

export const createNewAssignment = async (values: any) => {
    const response = await API.post(`/Assignment/create-assignment`, values);
    return response;
};

export const editAssignment = async (assignmentId: number, values: any) => {
    const response = await API.put(
        `/Assignment/edit-assignment/${assignmentId}`,
        values
    );
    return response;
};

export const deleteAssignment = async (assignmentId: number) => {
    const response = await API.delete(
        `/Assignment/delete-assignment/${assignmentId}`
    );
    return response;
};

export const getAssignmentSubmission = async (
    assignmentId: number | string
) => {
    const response = await API.get(
        `/Assignment/get-submissions/${assignmentId}`
    );
    return response;
};

export const gradeSubmission = async (submissionId: number, values: any) => {
    const response = await API.put(
        `/Assignment/grade-assignment/${submissionId}`,
        values
    );
    return response;
};

export const editSubmission = async (submissionId: number, values: any) => {
    const response = await API.put(
        `/Assignment/edit-submission/${submissionId}`,
        values
    );
    return response;
};

export const getStudentsNotSubmitted = async (assignmentId: string) => {
    const response = await API.get(
        `/Assignment/students-missing-submissions/${assignmentId}`
    );
    return response;
};
