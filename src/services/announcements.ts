/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/utils/axiosInstance";

const announcemmentsApi = {
    getAnnouncemmentsByIdCourse: async (courseId: string) => {
        return await API.get(`/Announcements/course/${courseId}`);
    },
    getAnnouncemmentsAll: async () => {
        return await API.get(`/Announcements/announcements/all`);
    },

    getAnnouncemmentsByAnnouncementId: async (announcementId: string) => {
        return await API.get(
            `/Announcements/get-announcement-byId/${announcementId}`
        );
    },

    createAnnouncemments: async (request: any) => {
        return await API.post(`Announcements/create-announcement`, request);
    },

    editAnnouncemments: async (announcementId: string, request: any) => {
        return await API.put(
            `/Announcements/update/${announcementId}`,
            request
        );
    },

    deleteAnnouncemments: async (announcementId: string) => {
        return await API.delete(`Announcements/delete/${announcementId}`);
    },

    searchAnnouncemments: async (title: string) => {
        return await API.get(`/Announcements/search?title=${title}`);
    },
};

export default announcemmentsApi;
