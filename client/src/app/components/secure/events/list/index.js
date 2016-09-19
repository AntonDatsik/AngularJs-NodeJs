import angular from 'angular';
import uirouter from 'angular-ui-router';

import EventsListController from './list.controller';

export default angular.module('app.secure.events.list', [uirouter])
  .controller('EventsListController', EventsListController)
  .name;