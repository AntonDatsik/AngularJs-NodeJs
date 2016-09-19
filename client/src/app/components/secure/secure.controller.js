export default class SecureController {
	constructor(authService, $state) {
		this.authService = authService;
		this.$state = $state;
		// this.$state.go('secure/events/list');
	}

	logout() {
		this.authService.logout();
		this.$state.go('login');
	}
}