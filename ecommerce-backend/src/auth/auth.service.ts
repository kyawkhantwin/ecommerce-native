import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createLoginDto: CreateLoginDto) {
    const { emailOrUsername, password } = createLoginDto;
    const user = (await this.databaseService.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    })) ;

    if (!user) {
      throw new NotFoundException("User or email doesn't exist");
    }

    const checkedPassword = await bcrypt.compare(password, user.password);

    if (!checkedPassword) {
      throw new UnauthorizedException('Password wrong');
    }

    // Generate JWT token
    const payload: any = { userId: user.id, isAdmin: user.isAdmin };
    delete user.password;

    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async signup(createSignUpDto: Prisma.UserCreateInput) {
    const { email, password } = createSignUpDto;
    const emailExist = await this.databaseService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (emailExist) {
      throw new ConflictException('Email already exist');
    }

    const hashSalt = 10;
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    const user = await this.databaseService.user.create({
      data: { ...createSignUpDto, password: hashedPassword },
    });

    delete user.password
    return user;
  }
}
