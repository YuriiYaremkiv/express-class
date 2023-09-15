import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IUSersRepository } from './users.repository.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class UsersRepository implements IUSersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: { email, password, name },
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
