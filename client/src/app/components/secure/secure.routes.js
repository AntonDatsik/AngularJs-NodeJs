routes.$inject = ['$stateProvider'];

import SecureController from './secure.controller';

export default function routes($stateProvider) {
  $stateProvider
    .state('secure', {
      url: '/secure',
      template: require('./secure.template.html'),
      controller: 'SecureController',
      controllerAs: 'ctrl',
      authenticate: true,
      redirectTo: 'secure/events/list'
      // abstract: true
    });
}