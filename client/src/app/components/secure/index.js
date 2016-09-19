import angular from 'angular';
import uirouter from 'angular-ui-router';

import events from './events';

import routing from './secure.routes';

import SecureController from './secure.controller';

export default angular.module('app.secure', [ events ])
  .controller('SecureController', SecureController)
  .config(routing)
  .name;