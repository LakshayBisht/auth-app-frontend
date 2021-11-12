const getToken = () => {
	const token = localStorage.getItem('USER_TOKEN');
	return token;
};

const setToken = (token) => {
	localStorage.setItem('USER_TOKEN', token);
};

const removeToken = () => {
	localStorage.removeItem('USER_TOKEN');
	// localStorage.setItem('USER_TOKEN', token);
};

export {getToken, setToken, removeToken};
