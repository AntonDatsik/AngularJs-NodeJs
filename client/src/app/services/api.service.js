export default class ApiService {
	constructor($http) {
		this.$http = $http;
		this.apiUrl = 'http://localhost:3000/api';
	}

	post(url, data, isAuth) {
		url = this.createFullUrl(url);
		var params = {
			method: 'POST', 
			url: url, 
			data: data
		};

		if (isAuth) {
			var sessionToken = this.getSessionKey();
			params.headers = { 'Authorization': sessionToken };
		}

		var rootObj = this;

		return new Promise(function(resolve, reject) {
			rootObj.$http(params).then(response => {
				resolve(response.data);
			}).catch(error => {
				reject(error);
			});
		});
	}

	get(url, isAuth) {
		url = this.createFullUrl(url);

		var params = {
			method: 'GET',
			url: url
		};

		if (isAuth) {
			var sessionToken = this.getSessionKey();
			params.headers = { 'Authorization' : sessionToken };
		}
		var rootObj = this;
		return new Promise(function(resolve, reject) {
			rootObj.$http(params).then(response => {
				resolve(response.data);
			}).catch(error => {
				reject(error);
			});
		});
	}

	getSessionKey() {
		return localStorage.getItem('sessionToken');
	}

	setSessionKey(token) {
		localStorage.setItem('sessionToken', token);
	}

	createFullUrl(url) {
		return this.apiUrl + url;
	}
}