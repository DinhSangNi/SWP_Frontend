import API from '@/utils/axiosInstance';


const announcemmentsApi = {
    getAnnouncemmentsByIdCourse: async (courseId: string) => {
        return await API.get(`Announcements/course/${courseId}`)
    },

    createAnnouncemments: async (request: any) => {
        return await API.post(`Announcements/create-announcement`, request)
    },

    editAnnouncemments: async (announcementId: string, request: any) => {
        return await API.put(`Announcements/update/${announcementId}`, request)
    },

    deleteAnnouncemmentsByIdCourse: async (announcementId: string) => {
        return await API.delete(`Announcements/delete/${announcementId}`)
    },

    searchAnnouncemments: async (title: string) => {
        return await API.get(`/Announcements/search?title=${title}`)
    }
}

export default announcemmentsApi;