import axios from "axios";

const BASE_URL = `http://localhost:5000/api/auth`;

export default axios.create({
    baseURL: BASE_URL
});