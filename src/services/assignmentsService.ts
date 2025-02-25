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
        console.error("❌ Lỗi khi lấy danh sách người dùng:", error);
        throw error;
    }
};
