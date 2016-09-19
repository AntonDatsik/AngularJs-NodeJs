export default class AuthService {
	constructor(apiService) {
		this.apiService = apiService;
		this.currentUser = null;
	}

	login(name, password) {
		var rootObj = this;
		return new Promise(function(resolve, reject) {
			rootObj.apiService.post('/signin', { name: name, password: password }, false).then(response => {
				if (response.success) {
					rootObj.currentUser = response.user;
					rootObj.apiService.setSessionKey(response.token);
					resolve(response);
				}
				else {
					reject(response.msg);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}

	register(name, password) {
		var rootObj = this;
		
		return rootObj.apiService.post('/signup', { name: name, password: password }, false).then(response => {
				if (response.success) {
					return rootObj.login(name, password);
				}
				else {
					return Promise.reject(response.msg);
				}
			}).catch(error => {
				return Promise.reject(error);
			});
	}

	isLoggedIn() {
		var rootObj = this;
		return new Promise(function(resolve, reject) {
			rootObj.apiService.get('/checkToken', true).then(response => {
				rootObj.currentUser = response.user;
				resolve(response.success);
			}).catch(error => {
				resolve(false);
			});
		});
	}

	logout() {
		this.currentUser = null;
		this.apiService.setSessionKey(null);
	}
}

AuthService.$inject = ['apiService'];