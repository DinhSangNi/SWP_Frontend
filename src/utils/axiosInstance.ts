import axios from "axios";

const API = axios.create({
    baseURL: "https://coursesystem.azurewebsites.net",
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

export default API;
