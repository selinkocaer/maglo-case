import axios from "axios";

export const api = axios.create({
    baseURL: "https://case.nodelabs.dev/api/",
});
