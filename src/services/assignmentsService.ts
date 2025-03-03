import { API } from "./profileService";

export const getAssignmentByCourseId = async (courseId: string) => {
    try {
        const response = await API.get(
            `/Assignment/get-assignments/${courseId}`
        );
        console.log(
            `✅ Get assignments của course có id ${courseId} thành công`
        );
        return response.data;
    } catch (error) {
        console.error(
            "❌ Lỗi khi lấy danh sách assignments theo course id:",
            error
        );
        throw error;
    }
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
