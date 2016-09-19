export default class RegisterController {
	constructor($state, authService) {
		this.$state = $state;
		this.authService = authService;
		this.user = {};
	}

	register() {
		this.authService.register(this.user.name, this.user.password).then(result => {			
			this.$state.go('secure');	
		}).catch(error => {
			console.log(error);
		});
	}
}

RegisterController.$inject = ['$state', 'authService'];