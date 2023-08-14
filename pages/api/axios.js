import axios from 'axios';
const BASE_URL = 'http://gssp-backend-api.rxhealthbeta.com/api/v1';
//const BASE_URL = 'https://goldenpartnershipplatform.org/corp/api/';

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		//'Content-Type': 'multipart/form-data',
		'Access-Control-Allow-Origin': '*',
	},
});

/*
axiosPrivate.interceptors.request.use(
	async (req) => {
		let token = window.sessionStorage.getItem('userToken')
			? JSON.parse(window.sessionStorage.getItem('userToken'))
			: null;
		if (!token) {
			token = window.sessionStorage.getItem('userToken')
				? JSON.parse(window.sessionStorage.getItem('userToken'))
				: null;
		}
		req.headers.Authorization = `Bearer ${token}`;
		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);
*/
