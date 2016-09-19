routes.$inject = ['$stateProvider'];

import EventsListController from './list/list.controller';
import ViewEventController from './view/view.controller';

export default function routes($stateProvider) {
  $stateProvider
    .state('secure/events/list', {
      parent: 'secure',
      url: '/events/list',
      template: require('./list/list.template.html'),
      controller: 'EventsListController',
      controllerAs: 'ctrl',
      resolve: EventsListController.resolve,
      authenticate: true
    })
    .state('secure/event', {
      parent: 'secure',
      url: '/events/:id',
      template: require('./view/view.template.html'),
      controller: 'ViewEventController',
      controllerAs: 'ctrl',
      resolve: ViewEventController.resolve,
      authenticate: true
    })
    .state('secure/events/create', {
      parent: 'secure',
    	url: '/secure/events/create',
    	template: require('./create/create.template.html'),
    	controller: 'CreateEventController',
    	controllerAs: 'ctrl',
      authenticate: true
    });
}