import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.create.dto';
import { LoginUserDto } from '../user/dto/user.login.dto';
import { AuthUser } from '../user/user.decorator';

import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() signUpDto: CreateUserDto): Promise<User> {
        return this.authService.register(signUpDto);
    }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    me(@AuthUser() user: User): User {
        return user;
    }
}