import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './auth.routes';

import login from './login';
import register from './register';

export default angular.module('app.auth', [ login, register ])
  .config(routing)
  .name;