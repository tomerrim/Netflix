import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export const customFetch = async (url, method, data) => {
    try {
        if (method === "GET") {
            const response = await axios.get(`${baseUrl}/${url}`, { params: data });
            return response.data;
        }
        else if (method === "POST") {
            const response = await axios.post({
                method,
                url: `${baseUrl}/${url}`,
                data
            });
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            throw new Error(`ERROR: ${error.response.data}`);
        } else if (error.request) {
            throw new Error("No response received from the server");
        } else {
            throw new Error("Error occured during the request")
        } 
    }
}