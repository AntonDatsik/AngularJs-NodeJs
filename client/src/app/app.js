import angular from 'angular';

import '../style/app.css';
import routing from './app.routes';

import auth from './components/auth';
import secure from './components/secure';

import uirouter from 'angular-ui-router';

import EventService from './services/event.service';
import UserService from './services/user.service';
import AuthService from './services/auth.service';
import ApiService from './services/api.service';

angular.module('app', [ uirouter, auth, secure ])
  .service('eventService', EventService)
  .service('userService', UserService)
  .service('authService', AuthService)
  .service('apiService', ApiService)
  .config(routing)
  .run(['$rootScope', '$state','authService', ($rootScope, $state, AuthService) => {
  	$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
  		return AuthService.isLoggedIn().then(isAuth => {
  			if (toState.authenticate && !isAuth) {
	  			$state.transitionTo('login');
	  			event.preventDefault();
	  		}
        if ((toState.url === '/login' || toState.url === '/register') && isAuth) {
          $state.transitionTo('secure.events.list');
          event.preventDefault();
        }
  		});
  	});
  }]);