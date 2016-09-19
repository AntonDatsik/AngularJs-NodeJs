import angular from 'angular';
import uirouter from 'angular-ui-router';

import CreateEventController from './create.controller';

export default angular.module('app.secure.events.create', [uirouter])
  .controller('CreateEventController', CreateEventController)
  .name;