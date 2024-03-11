/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
        ) { }

    async getAll() {
        const users = await this.userModel.find()
        return users;
    }
    
    async registerUser(createUser: CreateUserDto) {
        const { email, password } = createUser
        const admin = await this.userModel.findOne({ email: email })
        if (admin) {
            throw new BadRequestException("admin already exist...")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        const newUser = {
            email: createUser.email,
            firstName: createUser.firstName,
            lastName: createUser.lastName,
            contact: createUser.contact,
            address: createUser.address,
            password: hashedPassword,
        }

        const newAdmin = await this.userModel.create(newUser)
        console.log(newAdmin)
        return newAdmin;
    }
    async loginUser(loginUser: LoginUserDto) {
        const { email, password } = loginUser
        const admin = await this.userModel.findOne({ email: email })
        if (!admin) {
            throw new BadRequestException("admin not found...")
        }

        const validPassword = await bcrypt.compare(password, admin.password)
        console.log(validPassword)

        if (!validPassword) {
            throw new BadRequestException("password is invalid...")
        }

        console.log("loggedIn admin ==>", admin)
        // const token = this.jwtService.sign({ id: admin._id }, );
        // console.log(token)
        return {
            statusCode: HttpStatus.OK,
            message: 'admin loggedin successfully...',
            admin, 
            // token: token
        };
    }
}
