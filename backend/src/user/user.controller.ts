import HttpResponse from 'src/http-response';
import { Body, Controller, Post } from '@nestjs/common';
import RegisterUserRequest from 'src/user/dtos/request/register-user.request.dto';
import { UserService } from 'src/user/user.service';
import RegisterUserResponse from 'src/user/dtos/response/register-user.response.dto';
import LoginUserResponse from 'src/user/dtos/response/login-user.request.dto';
import LoginUserRequest from 'src/user/dtos/request/login-user.request.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register')
	async registerUser(
		@Body() request: RegisterUserRequest,
	): Promise<HttpResponse<RegisterUserResponse>> {
		return new HttpResponse<RegisterUserResponse>(
			200,
			'User registered successfully',
			await this.userService.registerUser(request),
		);
	}

	@Post('login')
	async loginUser(
		@Body() request: LoginUserRequest,
	): Promise<HttpResponse<LoginUserResponse>> {
		return new HttpResponse<LoginUserResponse>(
			200,
			'User logged in successfully',
			await this.userService.loginUser(request),
		);
	}
}
