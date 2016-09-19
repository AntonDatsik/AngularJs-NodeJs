export default class EventsListController {	
	constructor(events) {
		this.events = events;
	}
}

EventsListController.resolve = {
	events: function(eventService) {
		return eventService.get();
	}
}