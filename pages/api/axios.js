import axios from 'axios';
//const BASE_URL = 'http://gssp-backend-api.test/api/v1';
const BASE_URL = 'https://gssp-backend-api.rxhealthbeta.com/api/v1';
const HUBTEL_URL = 'https://goldenpartnershipplatform.org/api/route';

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosHubtel = axios.create({
	baseURL: HUBTEL_URL,
	headers: {
		'Content-Type': 'application/json',
		//'Content-Type': 'multipart/form-data',
		'Access-Control-Allow-Origin': '*',
	},
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
