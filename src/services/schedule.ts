import API from '@/utils/axiosInstance';



interface ISchedule {
    courseID: number,
    teacherID: number,
    shceduleDate: string,
    startTime: string,
    endTime: string,
    room: string,
}

const scheduleApi = {

    getAllCourseActive: async () => {
        return await API.get("/Course/active-courses")
    },

    createSchedule: async (request : ISchedule) => {
        return await API.post("/Schedule/add-schedule", request)
    },

    updateSchedule: async (scheduleId: string ,request: ISchedule) => {
        return await API.put(`/Schedule/edit-schedule/${scheduleId}`, request)
    },

    detailSchedule: async (couredID: string) => {
        return await API.get(`/Course/get-schedule/${couredID}`)
    },
    
    filterSchedule: async (couredID: string, scheduleDate: any) => {
        return await API.get(`/Schedule/filter-schedule-by-date/${couredID}`, scheduleDate)
    },
    
}

export default scheduleApi;


// "scheduleDate": "2025-03-15",
// "startTime": "string",
// "endTime": "string",
// "room": "string"
// }