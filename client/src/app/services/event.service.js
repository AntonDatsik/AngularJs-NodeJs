export default class EventService {
	constructor(apiService) {
		this.apiService = apiService;
	}

	create(name, description) {
		var rootObj = this;
		return new Promise(function(resolve, reject) {
			rootObj.apiService.post('/events', { name: name, description: description }, true).then(response => {
				if (response.success) {
					resolve(response.event);
				} 
				else {
					reject(response.msg);
				}
			}).catch(error => {
				reject(error);
			});	
		}); 
	}

	get() {
		var rootObj = this;
		return new Promise(function(resolve, reject) {
			rootObj.apiService.get('/events', true).then(response => {
				if (response.success) {
					resolve(response.events);
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
			rootObj.apiService.get('/events/' + id, true).then(response => {
				if (response.success) {
					resolve(response.event);
				}
				else {
					reject(response.msg);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}

	addUserToEvent(eventId) {
		var rootObj = this;
		return new Promise(function(resolve, reject) {
			rootObj.apiService.get('/events/add_user/' + eventId, true).then(response => {
				if (response.success) {
					resolve(response.event);
				}
				else {
					reject(response.msg);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}

	removeUserFromEvent(eventId) {
		var rootObj = this;
		return new Promise(function(resolve, reject){
			rootObj.apiService.get('/events/remove_user/' + eventId, true).then(response => {
				if (response.success) {
					resolve(response.event);
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

EventService.$inject = ['apiService'];