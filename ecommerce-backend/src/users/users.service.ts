import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    try {
      let users = await this.databaseService.user.findMany();
      if (users.length === 0) {
        throw new NotFoundException('No users found');
      }
      users = users.map((user) => {
        delete user.password;
        return user;
      });
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve users');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not retrieve the user');
    }
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    try {
      const user = await this.databaseService.user.update({
        where: { id },
        data: updateUserDto,
      });

      delete user.password;

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Could not update user');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return await this.databaseService.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not delete the user');
    }
  }
}
