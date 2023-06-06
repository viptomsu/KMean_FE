import axios from "axios";

const service = axios.create({
	baseURL: "http://127.0.0.1:6868",
	headers: {
		"content-type": "application/json",
	},
});

export default service;
