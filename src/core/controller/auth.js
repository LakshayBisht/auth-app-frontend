import axios from 'axios';
import {setToken, getToken, removeToken} from 'core/utils/localStorage';

const url = process.env.REACT_APP_BASE_URL;

const register = async (payload) => {
	console.log(payload);
	try {
		const {
			data: {token},
		} = await axios.post(`${url}api/auth/register`, payload);
		console.log(token);
		setToken(token);
	} catch (error) {
		const errorMsg = error?.response?.data?.error ?? 'Something went wrong!!!';
		console.log(errorMsg);
		throw new Error(errorMsg);
	}
};

const login = async (payload) => {
	try {
		const {
			data: {token},
		} = await axios.post(`${url}api/auth/login`, payload);
		console.log(token);
		setToken(token);
	} catch (error) {
		const errorMsg = error?.response?.data?.error ?? 'Something went wrong!!!';
		console.log(errorMsg);
		throw new Error(errorMsg);
	}
};

const getUser = async () => {
	try {
		const token = getToken();
		const {data} = await axios.get(`${url}api/home`, {
			headers: {Authorization: `Bearer ${token}`},
		});
		console.log(data);
		return data.user;
	} catch (error) {
		const errorMsg = error?.response?.data?.error ?? 'Something went wrong!!!';
		console.log(errorMsg);
		logout();
		throw new Error(errorMsg);
	}
};

const logout = () => {
	removeToken();
};

export {register, login, getUser, logout};
