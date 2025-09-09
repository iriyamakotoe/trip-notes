import axios from "axios";

// XSRF-TOKEN をクッキーから取り出す関数
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

// リクエストごとにCSRFトークンをヘッダーに付与する
api.interceptors.request.use((config) => {
	const token = getCookie("XSRF-TOKEN");
	if (token) {
		config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
	}
	return config;
});

export default api;
