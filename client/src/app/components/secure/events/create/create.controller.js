export default class CreateEventController {
	constructor($state, $scope, eventService) {
        this.eventService = eventService;
        this.$state = $state;
        this.$scope = $scope;
        this.event = {};
    }

    createEvent() {
        this.eventService.create(this.event.name, this.event.description).then(result => {
            this.$state.go('secure/events/list');
        }).catch(error => {
            console.log(error);
        });
    }
}