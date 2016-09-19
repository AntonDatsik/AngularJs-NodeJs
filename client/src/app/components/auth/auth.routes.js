routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      template: require('./login/login.template.html'),
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      authenticate: false
    })
    .state('register', {
    	url: '/register',
    	template: require('./register/register.template.html'),
    	controller: 'RegisterController',
    	controllerAs: 'registerCtrl',
      authenticate: false
    });
}