import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './events.routes';

import list from './list';
import view from './view';
import create from './create';

export default angular.module('app.secure.events', [ list, view, create ])
  .config(routing)
  .name;