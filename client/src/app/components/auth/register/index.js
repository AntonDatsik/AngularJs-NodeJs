import angular from 'angular';
import uirouter from 'angular-ui-router';

import RegisterController from './register.controller';
import AuthService from '../../../services/auth.service';

export default angular.module('app.auth.register', [uirouter])
  .controller('RegisterController', RegisterController)
  .service('authService', AuthService)
  .name;