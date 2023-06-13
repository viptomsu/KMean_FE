import axios from "axios";

const service = axios.create({
	baseURL: "http://localhost:6868",
	headers: {
		"content-type": "application/json",
	},
});

export default service;
