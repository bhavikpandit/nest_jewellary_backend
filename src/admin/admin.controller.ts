/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { CreateAdminDto, LoginAdminDto, LogoutAdminDto } from './dto/admin.dto';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor( private adminService: AdminService){}

    @Post('/register')
    async Register(@Body() body: CreateAdminDto,) {
        const user = await this.adminService.registerAdmin(body)
        return {
            statusCode: HttpStatus.OK,
            message: "admin registered successfully",
            user: user,
        }
    }

    @Post('/login')
    async Login(@Body() body: LoginAdminDto) {
        const user = await this.adminService.loginAdmin(body)
        return user
    }
    @Post('/logout')
    async Logout(@Body() body: LogoutAdminDto) {
        const user = await this.adminService.logoutAdmin(body)
        return user
    }


}
