export default class ViewEventController {
	constructor(event, users, $scope, eventService, authService) {
		this.$scope = $scope;
		this.event = event;
		this.users = users;
		this.eventService = eventService;
		this.authService = authService;
		this.setPartisipantsIds();
	}

	setPartisipantsIds() {
		this.participantsIds = new Set(this.event.participants.map(part => part._id));
	}

	addUserToEvent() {
		this.eventService.addUserToEvent(this.event._id).then(event => {
			this.event.participants.push(this.authService.currentUser);
			this.setPartisipantsIds();
			this.$scope.$apply();
		}).catch(error => {
			console.log(error);
		});
	}

	removeUserFromEvent() {
		this.eventService.removeUserFromEvent(this.event._id).then(event => {
			this.event = event;
			this.setPartisipantsIds();
			this.$scope.$apply();
		}).catch(error => {
			console.log(error);
		});
	}
}

ViewEventController.resolve = {
	event: ['$stateParams', 'eventService', function($stateParams, eventService) {
		return eventService.getById($stateParams.id);
	}],
	users: ['userService', function(userService) {
		return userService.get();
	}]
}

// ViewEventController.inject = ['eventService', 'authService'];