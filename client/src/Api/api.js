import axios from "axios";

let Base_URL = "localhost";
Base_URL = Base_URL.replace(/\/$/, "");

const Final_URL = "http://localhost:5000";
const instance = axios.create({
    baseURL : Final_URL
});


export default instance;