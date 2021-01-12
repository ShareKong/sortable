import http from '../common/axios.js'

// 获取页面列表
const getPageList = () => {
	let url = '/get_data';
	return http.get(url).then(res => {
		return res;
	})
}

// 设置页面信息
const setPageInfo = (data) => {
	let url = '/set_page';
	return http.post(url, data).then(res => {
		return res;
	})
}

// 设置页面主题
const setPageTheme = (data) => {
	let url = '/set_theme';
	return http.post(url, data).then(res => {
		return res;
	})
}

// 获取页面主题
const getPageTheme = () => {
	let url = '/get_theme';
	return http.get(url).then(res => {
		return res;
	})
}


export default {
	getPageList,
	setPageInfo,
	setPageTheme,
	getPageTheme,
}