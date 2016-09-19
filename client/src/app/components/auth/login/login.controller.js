export default class LoginController {
	constructor($state, authService) {
		this.authService = authService;
		this.user = {};
		this.$state = $state;
	}

	login() {
		this.authService.login(this.user.name, this.user.password).then(result => {
			this.$state.go('secure');					
		}).catch(error => {
			console.log(error);
		});
	}
}

LoginController.$inject = ['$state', 'authService'];