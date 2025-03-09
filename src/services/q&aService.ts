import { API } from "./profileService";

export const submitQnA = async (values: any) => {
    const response = await API.post(`QnA/submit`, values);
    return response;
};

export const viewAllQnA = async () => {
    const response = await API.get(`QnA/view`);
    return response;
};

export const viewAllQnAById = async (questionId: number | string) => {
    const response = await API.get(`QnA/view/${questionId}`);
    return response;
};

export const answerAllQnAById = async (values: any) => {
    const response = await API.post(`QnA/answer`, values);
    return response;
};

export const commentAAnswer = async (values: any) => {
    const response = await API.post(`QnA/comment`, values);
    return response;
};
