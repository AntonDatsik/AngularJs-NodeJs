import angular from 'angular';
import uirouter from 'angular-ui-router';

import LoginController from './login.controller';
import AuthService from '../../../services/auth.service';

export default angular.module('app.auth.login', [uirouter])
  .controller('LoginController', LoginController)
  .service('authService', AuthService)
  .name;