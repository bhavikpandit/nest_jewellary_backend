/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto, LoginUserDto, LogoutUserDto } from './dto/user.dto';


@ApiTags('auth')
@Controller('auth')
export class UsersController {
    constructor( private userService: UsersService){}

    @Get()
    async getAllUsers() {
        const users = await this.userService.getAll()
        return {
            statusCode: HttpStatus.OK,
            message: "all users get successfully",
            users: users,
        }
    }

    @Post('/register')
    async Register(@Body() body: CreateUserDto,) {
        const user = await this.userService.registerUser(body)
        return {
            statusCode: HttpStatus.OK,
            message: "user registered successfully",
            user: user,
        }
    }

    @Post('/login')
    async Login(@Body() body: LoginUserDto) {
        const user = await this.userService.loginUser(body)
        return user
    }
    @Post('/logout')
    async Logout(@Body() body: LogoutUserDto) {
        const user = await this.userService.logoutUser(body)
        return user
    }


}
