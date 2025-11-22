export default class LoginUserResponse {
	userId: string;
	email: string;
	createdAt?: Date;
	constructor({
		userId,
		email,
		createdAt,
	}: {
		userId: string;
		email: string;
		createdAt?: Date;
	}) {
		this.userId = userId;
		this.email = email;
		this.createdAt = createdAt;
	}
}
