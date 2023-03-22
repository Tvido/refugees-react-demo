import axios from 'axios';
import { url } from '../constants/main';

// Sign in / up
export const sign = ({ urlPoint, props }, readed) => {	
	axios
		.post(url + urlPoint, props)
		.then(res => {			
			readed({
				isSuccess: true,
				data: res.data
			});
		})
		.catch(err => {
			console.log('sign False', err);
			
			readed({
				isSuccess: false,
				data: err
			});
		});
};

// Get method HOOK
export const instance = axios.create({
	baseURL: url
});

export const getVacancies = ({ urlPoint, token }, readed) => {
	axios
		.get(url + urlPoint)
			.then(res => {
				readed({
					isSuccess: true,
					data: res.data
				});
			})
			.catch(err => {
				readed({
					isSuccess: false,
					data: err
				});
			});
};

// Get method
export const get = ({ urlPoint, token }, readed) => {
	axios
		.get(url + urlPoint, {
			headers: {
				Authorization: 'Bearer ' + token
			}
			})
			.then(res => {
				readed({
					isSuccess: true,
					data: res.data
				});
			})
			.catch(err => {
				readed({
					isSuccess: false,
					data: err
				});
			});
};

// Post method
export const post = ({ urlPoint, props, token }, readed) => {
	// console.log(urlPoint, props, token);
	
	axios
		.post(url + urlPoint, props, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
		.then(res => {
			readed({
				isSuccess: true,
				data: null
			});
		})
		.catch(err => {
			readed({
				isSuccess: false,
				data: err
			});
		});
};

// Pur method. Update
export const put = ({ urlPoint, props, token }, readed) => {	
	axios
		.post(url + urlPoint, props, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
		.then(res => {
			readed({
				isSuccess: true,
				data: null
			});
		})
		.catch(err => {
			readed({
				isSuccess: false,
				data: err
			});
		});
};

// Delete method
export const deleteMethod = ({ urlPoint, token }, readed) => {
	// console.log(url + urlPoint, token);	
	
	axios
		.delete(url + urlPoint, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
		.then(res => {
			readed({
				isSuccess: true,
				data: null
			});
		})
		.catch(err => {
			readed({
				isSuccess: false,
				data: err
			});
		});
};