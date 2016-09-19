export default class UserService {
	constructor(apiService) {
		this.apiService = apiService;
	}

	get() {
		var rootObj = this;
		return new Promise(function(resolve, reject) {
			rootObj.apiService.get('/users', true).then(response => {
				if (response.success) {
					resolve(response.users);
				}
				else {
					reject(response.msg);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}

	getById(id) {
		var rootObj = this;
		return new Promise(function(resolve, reject) {
			rootObj.apiService.get('/users/' + id, true).then(response => {
				if (response.success) {
					resolve(response.user);
				}
				else {
					reject(response.msg);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}
}

UserService.$inject = ['apiService'];