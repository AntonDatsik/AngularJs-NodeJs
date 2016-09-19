import angular from 'angular';
import uirouter from 'angular-ui-router';

import ViewEventController from './view.controller';

export default angular.module('app.secure.events.view', [uirouter])
  .controller('ViewEventController', ViewEventController)
  .name;