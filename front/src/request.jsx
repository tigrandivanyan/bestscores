import axios from "axios";


export const request = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL + "/api",
});

request.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("token");
        if (token) {
            config.headers["token"] = `${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

request.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        // Check if the error response is available
        console.log(error.status);
        if (error.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("premissions");
            window.location.reload();
        } else if (error.status === 400) {
            alert(error?.message)
        }
        // if (error.response) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: error.response.data || "An error occurred!",
        //     });
        // } else {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Network error. Please check your connection.",
        //     });
        // }
        // return Promise.reject(error);
        return new Promise(() => {});
    }
);