/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto, LogoutUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
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
        const user = await this.userModel.findOne({ email: email })
        if (!user) {
            throw new BadRequestException("user not found...")
        }

        const validPassword = await bcrypt.compare(password, user.password)
        console.log(validPassword)

        if (!validPassword) {
            throw new BadRequestException("password is invalid...")
        }

        console.log("loggedIn admin ==>", User)
        const token = this.jwtService.sign({ id: user._id }, );


        user.accessToken = token;
        await this.userModel.updateOne({_id: user.id}, {$set:{accessToken: token}})
        console.log("user ==>", user)
        return {
            statusCode: HttpStatus.OK,
            message: 'User loggedin successfully...',
            user
        };
    }

    async logoutUser(logoutUser: LogoutUserDto){
        const user = await this.userModel.findOne({_id: logoutUser.id})
        console.log("user==>", user)

        if(!user){
            throw new BadRequestException("user not found..")
        }
        await this.userModel.updateOne({_id: logoutUser.id}, {$set:{accessToken: ""}})
        console.log("logout user ==>", user)
        return{
            statusCode: HttpStatus.OK,
            message: 'User logout successfully...',
        };
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            return null;
        }
    }

}
