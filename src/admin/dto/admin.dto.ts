/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto{
    @IsString()
    @ApiProperty()
    firstName: string;
    @IsString()
    @ApiProperty()
    lastName: string;
    @IsEmail()
    @ApiProperty()
    email: string;
    @IsNumber()
    @ApiProperty()
    contact: number;
    @IsString()
    @ApiProperty()
    address: string;
    @IsString()
    @ApiProperty()
    password: string;
}

export class LoginAdminDto {
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsString()
    password: string;
}

export class LogoutAdminDto {
    @ApiProperty()
    @IsString()
    id: string;
}