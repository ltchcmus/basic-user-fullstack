import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entity/user';
import RegisterUserRequest from 'src/user/dtos/request/register-user.request.dto';
import LoginUserRequest from 'src/user/dtos/request/login-user.request.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import LoginUserResponse from 'src/user/dtos/response/login-user.request.dto';
import { AppException } from 'src/exception/app-exception';
import ErrorCode from 'src/exception/error-code';
import RegisterUserResponse from 'src/user/dtos/response/register-user.response.dto';
@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
		const newUser = this.userRepository.create({
			email: request.email,
			password: await bcrypt.hash(request.password, 10),
		});
		try {
			if (await this.userRepository.findOneBy({ email: request.email })) {
				throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
			}
			return new RegisterUserResponse(await this.userRepository.save(newUser));
		} catch {
			throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
		}
	}
	async loginUser(request: LoginUserRequest): Promise<LoginUserResponse> {
		const user = await this.userRepository.findOneBy({ email: request.email });
		if (!user) {
			throw new AppException(ErrorCode.LOGIN_FAILED);
		}
		if (!(await bcrypt.compare(request.password, user.password))) {
			throw new AppException(ErrorCode.LOGIN_FAILED);
		}
		if (user && (await bcrypt.compare(request.password, user.password))) {
			return new LoginUserResponse({
				userId: user.userId,
				email: user.email,
				createdAt: user.createdAt,
			});
		}
		throw new AppException(ErrorCode.LOGIN_FAILED);
	}
}
